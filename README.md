# Small Words

Super small script gives words (chars = fives). Store trees - keeps sizes lower. Check valid. Great speed.

### Details

This package stores a (parsed) dictionary tree of 5 letter words and will return one, or several random words, as either a string, or an array of strings respectively.

All words are stored, and returned in upper case.

Functions available for use:

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

### Note
The published package only includes a subset of 5-letter words, however the repository contains a word list of many thousands of words that have not yet been parsed. Many of the words are literally valid, but are hyper obscure and would end a casual friendship over a game of Scrabble.

The wordlists I have used here have removed proper nouns, brand names, acronyms, etc. but additionally for my purposes I wanted to make sure that the words were appropriate, and so I have manually checked each word (which, as you'd expect, takes time).

If you would like to use the full list for other purposes, please feel free to grab it on Github and do so.

## Contribute

If you would like to see more words in the approved list, please submit a PR having parsed them yourself and we can add them in.

For questions, feedback or suggestions, please open an issue in the [GitHub repo](https://github.com/eddhurst/smallwords);

## Thanks

Words compiled from multiple sources and parsed to leave only those with 5 letters. Mostly the [RIDYHEW dictionary](https://codehappy.net/wordlist.htm).