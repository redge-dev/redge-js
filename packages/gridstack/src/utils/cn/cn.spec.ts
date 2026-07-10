import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('keeps string arguments', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
    expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('filters out falsy values', () => {
    expect(cn('foo', null, undefined, false, '', 'bar')).toBe('foo bar');
  });

  it('supports numeric arguments', () => {
    // 0 is falsy, so it gets filtered out
    expect(cn('foo', 0, 'bar', 123)).toBe('foo bar 123');
  });

  it('supports objects with boolean values', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar');
    expect(cn({ foo: true, bar: true })).toBe('foo bar');
  });

  it('supports nested arrays', () => {
    expect(cn(['foo', ['bar', { baz: true, qux: false }]])).toBe('foo bar baz');
  });

  it('supports custom toString methods', () => {
    const customObj = {
      toString: () => 'custom-class',
    };
    expect(cn('foo', customObj)).toBe('foo custom-class');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });
});
