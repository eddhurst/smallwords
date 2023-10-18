import esbuild from 'esbuild';
import fs from "fs";

const addToTree = (word, branch) => {
  if (word.length <= 1) {
    return branch;
  }

  const char = word[0];
  if (!branch[char]) {
    branch[char] = {}
  }

  if (word.length === 2) {
    if (!Array.isArray(branch[char])) {
      branch[char] = [];
    }

    branch[char].push(word[1]);
    return branch
  }

  return addToTree(word.substring(1), branch[char]);
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
  return `let A='A',B='B',C='C',D='D',E='E',F='F',G='G',H='H',I='I',J='J',K='K',L='L',M='M',N='N',O='O',P='P',Q='Q',R='R',S='S',T='T',U='U',V='V',W='W',X='X',Y='Y',Z='Z';
  export default ${JSON.stringify(tree).replaceAll('"', '')};`
}

const wordsLoader = {
  name: 'words-loader',
  setup(build) {
    build.onLoad({ filter: /.txt$/ }, async (args) => {
      const allWords = fs.readFileSync(args.path, 'utf-8');
      const allTree = convertToTree(allWords.split('\n'));
      const all = exportAsString(allTree);

      return {
        contents: all,
        loader: 'js',
      };
    })}
}


esbuild.build({
  entryPoints: ['index.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  format: 'esm',
  plugins: [wordsLoader]
});