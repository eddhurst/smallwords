import fs from 'fs';
import * as readline from 'node:readline/promises';  // This uses the promise-based APIs
import { stdin as input, stdout as output } from 'node:process';
import words from '../wordlists/words.txt'
import approvedList from '../wordlists/approved.txt';
import maybeList from '../wordlists/maybe.txt';
import ignoredList from '../wordlists/rejected.txt';
import { generateWord, checkWordExists } from './index.js';

let verified = new Set();
let rejected = new Set();
let maybe = new Set();

const close = () => {
  const rejectedOutput = Array.from(rejected);
  const maybeOutput = Array.from(maybe);
  const verifiedOutput = Array.from(verified);

  console.info(`\n===== Rejected Words to be filtered from list (${rejectedOutput.length}) =====\n`)
  console.info(rejectedOutput);

  console.info(`\n===== Words that need further consideration (${maybeOutput.length}) =====\n`)
  console.info(maybeOutput);

  console.info(`\n===== Approved Words to be added to list (${verifiedOutput.length}) =====\n`)
  console.info(verifiedOutput);

  if (verifiedOutput.length > 0) {
    fs.appendFileSync('./wordlists/approved.txt', `${verifiedOutput.join('\n')}\n`);
  }

  if (maybeOutput.length > 0) {
    fs.appendFileSync('./wordlists/maybe.txt', `${maybeOutput.join('\n')}\n`);
  }

  if (rejectedOutput.length > 0) {
    fs.appendFileSync('./wordlists/rejected.txt', `${rejectedOutput.join('\n')}\n`);
  }

  process.exit();
}

const confirmWord = (word) => {
  verified.add(word);
  console.info(`${word} added to verified list`);
}

const verify = async (answer, potential, previous) => {
  const answerUpper = answer.toUpperCase();

  if (answerUpper.length > 5) {
    console.info("Suggested word is too long");
  }

  if (answerUpper.length > 1 && answerUpper.length < 5) {
    console.info("Suggested word is too short");
  }

  // If suggested word is similar to a word you know exists, add it to the list manually
  if (answerUpper.length === 5) {
      if (
        !checkWordExists(answerUpper, approvedList)
        && !verified.has(answerUpper)
        && !maybe.has(answerUpper)
      ) {
      confirmWord(answerUpper);
    } else {
      console.info(answerUpper, 'has already been processed as approved / maybe')
    }

    const rl = readline.createInterface({ input, output });
    const undoAnswer = await rl.question(`Is ${potential} a valid word? (s-skip)/a-accept/w-whoops/d-dunno/x-exit `);
    rl.close();
    await verify(undoAnswer, potential, previous);
  }

  switch (answerUpper.toUpperCase()) {
    case 'W': // WHOOPS - Go back and confirm previous word, then recheck current word
      confirmWord(previous);
      const rl = readline.createInterface({ input, output });
      const undoAnswer = await rl.question(`Is ${potential} a valid word? (s-skip)/a-accept/w-whoops/d-dunno/x-exit `);
      rl.close();
      await verify(undoAnswer, potential, previous)
      break;
    case 'A': // ACCEPT - Confirm current answer
      confirmWord(potential);
      break;
    case 'D': // DUNNO - Requires a spell check, or a verification, but still process it somewhere useful.
      console.info(potential, 'needs further consideration')
      maybe.add(potential);
      break;
    case 'X': // EXIT - Kill script
      close();
    case 'S': // SKIP - Reject word, add to reject list and move on.
    default:
      rejected.add(potential);
      break;
  }
}

const getPotentialWord = (attempt) => {
  if (attempt > 10) {
    console.info("failed 10 times to find unprocessed word");
    close();
  }

  const potential = generateWord(words);

  if (
    !checkWordExists(potential, approvedList)
    && !checkWordExists(potential, maybeList)
    && !checkWordExists(potential, ignoredList)
    && !verified.has(potential)
    && !maybe.has(potential)
    && !rejected.has(potential)
  ) {
    return potential
  }

  return getPotentialWord(attempt + 1);
}

const validate = async (previous) => {
  const rl = readline.createInterface({ input, output });
  const potential = getPotentialWord(1);

  const answer = await rl.question(`Is ${potential} a valid word? (s-skip)/a-accept/w-whoops/d-dunno/x-exit `);
  rl.close();
  await verify(answer, potential, previous);
  validate(potential);
}

validate();
