import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { mergeRefs } from './merge-refs';

describe('mergeRefs utility', () => {
  it('assigns the node to ref objects', () => {
    const ref1 = createRef<HTMLDivElement>();
    const ref2 = createRef<HTMLDivElement>();
    const merged = mergeRefs(ref1, ref2);

    const dummyElement = {} as HTMLDivElement;
    merged(dummyElement);

    expect(ref1.current).toBe(dummyElement);
    expect(ref2.current).toBe(dummyElement);
  });

  it('calls callback refs', () => {
    const callback1 = vi.fn();
    const callback2 = vi.fn();
    const merged = mergeRefs(callback1, callback2);

    const dummyElement = {} as HTMLDivElement;
    merged(dummyElement);

    expect(callback1).toHaveBeenCalledWith(dummyElement);
    expect(callback2).toHaveBeenCalledWith(dummyElement);
  });

  it('ignores null or undefined refs safely', () => {
    const ref = createRef<HTMLDivElement>();
    const merged = mergeRefs(ref, null, undefined);

    const dummyElement = {} as HTMLDivElement;
    expect(() => merged(dummyElement)).not.toThrow();
    expect(ref.current).toBe(dummyElement);
  });

  it('handles cleanups for React 19 callback refs returning cleanup functions', () => {
    const cleanup1 = vi.fn();
    const cleanup2 = vi.fn();
    const callback1 = vi.fn().mockReturnValue(cleanup1);
    const callback2 = vi.fn().mockReturnValue(cleanup2);

    const merged = mergeRefs(callback1, callback2);

    const dummyElement = {} as HTMLDivElement;
    const returnedCleanup = merged(dummyElement);

    expect(callback1).toHaveBeenCalledWith(dummyElement);
    expect(callback2).toHaveBeenCalledWith(dummyElement);
    expect(typeof returnedCleanup).toBe('function');

    // Trigger unmount cleanup
    returnedCleanup?.();

    expect(cleanup1).toHaveBeenCalledTimes(1);
    expect(cleanup2).toHaveBeenCalledTimes(1);
  });

  it('triggers cleanup callback for non-cleanup callback refs and ref objects', () => {
    const refObject = createRef<HTMLDivElement>();
    const callbackWithoutCleanup = vi.fn();

    const merged = mergeRefs(refObject, callbackWithoutCleanup);

    const dummyElement = {} as HTMLDivElement;
    const returnedCleanup = merged(dummyElement);

    expect(refObject.current).toBe(dummyElement);
    expect(callbackWithoutCleanup).toHaveBeenCalledWith(dummyElement);

    // Trigger cleanup
    returnedCleanup?.();

    // The callback should be called with null, and the ref object should be set to null
    expect(refObject.current).toBeNull();
    expect(callbackWithoutCleanup).toHaveBeenLastCalledWith(null);
  });
});
