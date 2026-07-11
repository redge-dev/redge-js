import { useEffect, useRef } from 'react';

export const useResizeObserver = (
  element: HTMLElement | null,
  callback: ResizeObserverCallback,
) => {
  const callbackRef = useRef<ResizeObserverCallback>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver((entries, observerInstance) => {
      callbackRef.current(entries, observerInstance);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [element]);
};
