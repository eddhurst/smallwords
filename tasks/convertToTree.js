import fs from 'fs';

const convertToInt = (char) => char.charCodeAt() - 65;

const addToTree = (word, branch) => {
  const char = word[0];
  
  if (Array.isArray(branch[char])) {
    branch[char] = [ ...branch[char], convertToInt(word[1]) ];
    return branch;
  }

  if (!branch[char]) {
    branch[char] = word.length >= 3 ? {} : [convertToInt(word[1])]
  }

  if (word.length > 2) {
    addToTree(word.substring(1), branch[char]);
  }

  return branch;
}

const convertToTree = (wordlist) => {
  console.log("Converting to Tree structure");

  const result = {};

  wordlist.forEach((word) => {
    addToTree(word, result)
  })

  return result;
}

const exportAsString = (tree) => {
  return `export default ${JSON.stringify(tree).replaceAll('"', '')};`
}

const allWords = fs.readFileSync('./src/words.txt', 'utf-8');
const allTree = convertToTree(allWords.split('\n'));
const all = exportAsString(allTree);
fs.writeFileSync('./src/words.min.js', all);

const approvedWords = fs.readFileSync('./src/approved.txt', 'utf-8');
const approvedTree = convertToTree(approvedWords.split('\n'));
const approved = exportAsString(approvedTree);
fs.writeFileSync('./src/approved.min.js', approved);