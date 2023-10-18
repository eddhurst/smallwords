import words from '../wordlists/approved.txt';

const checkWordExists = (word) => {
  let tree = words;
  for (let i = 0; i < word.length; i++) {
    if (Array.isArray(tree)) {
      return !!tree.includes(word[i]);
    }

    tree = tree[word[i]];

    if (!tree) {
      return false;
    }
  }
}

const generateWord = () => {
  let tree = words;
  let branch;
  let word = [];

  for (let i = 0; i < 5; i++) {
    if (Array.isArray(tree)) {
      branch = tree;
    } else {
      branch = Object.keys(tree)
    }

    const randomLetter = Math.floor(Math.random() * branch.length);
    word.push(branch[randomLetter]);

    tree = tree[branch[randomLetter]];
  }

  return word.join('');
}

const generateNWords = (count) => {
  const words = []
  for (let i = 0; i < count; i++) {
    words.push(generateWord())
  }
  return words;
}

export { checkWordExists, generateWord, generateNWords };
