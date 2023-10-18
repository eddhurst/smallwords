import { expect, describe, it } from 'vitest';
import { checkWordExists, generateNWords, generateWord } from '../dist/index';

describe('checkWordExists', () => {
  it('should validate a word is in the dictionary', () => {
    expect(checkWordExists("ABATE")).toBe(true);
  });

  it('should validate a word is not the dictionary', () => {
    expect(checkWordExists("AAAAA")).toBe(false);
  });
});

describe('generate function', () => {
  describe('generateWord', () => {
    it('should generate a word', () => {
      const word = generateWord();
      expect(word.length).toBe(5);
      expect(checkWordExists(word)).toBe(true);
    });
  });

  describe('generateNWords', () => {
    it('should generate N random words', () => {
      const words = generateNWords(5);
      expect(words.length).toBe(5);
      words.forEach(word => {
        expect(checkWordExists(word)).toBe(true);
      });
    });
  });
});
