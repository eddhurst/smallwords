import words from './src/approved.min.js';

// TODO: update to reflect dictionary structure
export const getWord = () => {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

const logWord = () => {
  const word = getWord();
  console.info(word);
  return word;
}

export default logWord;

console.info(words);