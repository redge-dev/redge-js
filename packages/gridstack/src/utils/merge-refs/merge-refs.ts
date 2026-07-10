import type { Ref, RefCallback } from 'react';

export const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> => {
  return (value: T | null) => {
    const cleanups: (() => void)[] = [];

    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        const cleanup = ref(value);
        if (typeof cleanup === 'function') {
          cleanups.push(cleanup);
        } else {
          cleanups.push(() => {
            ref(null);
          });
        }
      } else if (ref != null && typeof ref === 'object') {
        (ref as any).current = value;
        cleanups.push(() => {
          (ref as any).current = null;
        });
      }
    });

    if (cleanups.length > 0) {
      return () => {
        cleanups.forEach((cleanup) => {
          try {
            cleanup();
          } catch (e) {
            console.error(e);
          }
        });
      };
    }
  };
};
