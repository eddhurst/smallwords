import { expect, describe, it, beforeAll, afterAll, vi } from 'vitest';
import { getWord } from '../index';

let originalRandom;

describe('getWord', () => {
  const mockRandom = vi.fn();

  beforeAll(() => {
    originalRandom = Math.random;
    Math.random = mockRandom;
  })
  
  afterAll(() => {
    Math.random = originalRandom
  })

  it('should return expected words', () => {
    mockRandom.mockImplementation(() => 0.0001);
    expect(getWord()).toBe("ABATE")
    
    mockRandom.mockImplementation(() => 0.2);
    expect(getWord()).toBe("CRIME")

    mockRandom.mockImplementation(() => 0.9999);
    expect(getWord()).toBe("YOUTH")

    expect(mockRandom).toBeCalledTimes(3);
  })
})