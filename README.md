# Small Words

A small package to generate small words. Specifically, 5 letter words.

## generateWord

```js
import { generateWord } from 'smallwords';

const word = generateWord(); // 'ABATE'
```

## generateNWords

```js
import { generateNWords } from 'smallwords';

const words = generateNWords(5); // ['EQUAL', 'GHOST', 'CYCLE', 'HOTEL', 'REIGN']
```

## checkWordExists

```js
import { checkWordExists } from 'smallwords';

const exists = checkWordExists('KNOWN'); // true
```

For questions, feedback or suggestions, please open an issue in the [GitHub repo](https://github.com/eddhurst/smallwords);

## Thanks

Words compiled from multiple sources, but mostly the [RIDYHEW dictionary](https://codehappy.net/wordlist.htm).

### Note
This package only includes a subset of 5-letter words, however the repository contains a word list of many thousands of words that have not yet been parsed. For my purposes I wanted to make sure that the words were appropriate, and so I have manually checked each word (which, as you'd expect, takes time).

If you would like to use the full list for other purposes, please feel free to do so.

If you would like to see more words in the approved list, please feel free to submit a PR having parsed them yourself.
