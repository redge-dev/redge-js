import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { measure, toPx } from '../../utils';
import { useGridCoordinates } from '../use-grid-coordinates';
import { useGridStack } from '../use-grid-stack';
import { useItem } from '../use-item';
import { setAttributes } from './utils/set-attributes';

const registry = new Set<HTMLElement>();

export const useDraggable = (id: string) => {
  const currentDraggingElement = useRef<HTMLElement | null>(null);
  const currentClonedElement = useRef<HTMLElement | null>(null);
  const originalGrabbedCoordinates = useRef<{
    x: number;
    y: number;
  } | null>(null);

  const item = useItem(id);
  const { element } = useGridStack();
  const { snapViewportCoordinatesToGridCoordinates } = useGridCoordinates();

  const ref = useCallback((element: HTMLElement | null) => {
    if (!element) return () => void 0;

    registry.add(element);
    element.setAttribute('aria-roledescription', 'draggable');
    element.setAttribute('aria-pressed', 'false');
    element.setAttribute('aria-grabbed', 'false');

    return () => {
      registry.delete(element);
      element.removeAttribute('aria-roledescription');
    };
  }, []);

  const createClone = useCallback(() => {
    if (!currentDraggingElement.current) return null;
    const clone = currentDraggingElement.current.cloneNode(false) as HTMLElement;
    clone.classList.add('gridstack__item--cloned');
    return clone;
  }, []);

  const beginDrag = useCallback(
    (event: MouseEvent) => {
      currentDraggingElement.current = event.target as HTMLElement | null;
      currentClonedElement.current = createClone();
      if (
        !item ||
        !currentDraggingElement.current ||
        !registry.has(currentDraggingElement.current) ||
        !currentClonedElement.current
      )
        return;

      const { width, height } = measure(currentDraggingElement.current);
      const { x, y, top, left } = currentDraggingElement.current.getBoundingClientRect();

      const transformOriginX = (Math.max(0, event.clientX - x) / width) * 100;
      const transformOriginY = (Math.max(0, event.clientX - y) / height) * 100;

      originalGrabbedCoordinates.current = {
        x: event.clientX,
        y: event.clientY,
      };

      currentDraggingElement.current.setAttribute('aria-pressed', 'true');
      setAttributes(currentDraggingElement.current).gridCoordinates(
        item.configuration.x,
        item.configuration.y,
      );
      currentDraggingElement.current.style.setProperty('--gridstack-draggable-width', toPx(width));
      currentDraggingElement.current.style.setProperty(
        '--gridstack-draggable-height',
        toPx(height),
      );
      currentDraggingElement.current.style.setProperty('--gridstack-draggable-top', toPx(top));
      currentDraggingElement.current.style.setProperty('--gridstack-draggable-left', toPx(left));
      currentDraggingElement.current.style.setProperty('--gridstack-draggable-translate', '0 0 0');
      currentDraggingElement.current.style.setProperty(
        '--gridstack-draggable-transform-origin',
        `${transformOriginX}% ${transformOriginY}%`,
      );
      element?.appendChild(currentClonedElement.current);
      currentDraggingElement.current.setAttribute('aria-grabbed', 'true');
    },
    [createClone, element, item],
  );

  const stopDrag = useCallback((event: MouseEvent) => {
    if (!currentDraggingElement.current) return;

    currentDraggingElement.current.setAttribute('aria-pressed', 'false');
    currentDraggingElement.current.setAttribute('aria-grabbed', 'false');

    currentDraggingElement.current.style.removeProperty('--gridstack-draggable-width');
    currentDraggingElement.current.style.removeProperty('--gridstack-draggable-height');
    currentDraggingElement.current.style.removeProperty('--gridstack-draggable-top');
    currentDraggingElement.current.style.removeProperty('--gridstack-draggable-left');
    currentDraggingElement.current.style.removeProperty('--gridstack-draggable-translate');
    currentDraggingElement.current.style.removeProperty('--gridstack-draggable-transform-origin');

    currentClonedElement.current?.remove();
    originalGrabbedCoordinates.current = null;
    currentDraggingElement.current = null;
    currentClonedElement.current = null;
  }, []);

  const drag = useCallback(
    (event: MouseEvent) => {
      if (!currentDraggingElement.current || !currentClonedElement.current) return;

      if (!originalGrabbedCoordinates.current) return;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      const closestGridCoordinates = snapViewportCoordinatesToGridCoordinates(mouseX, mouseY, 1, 1);

      const moveX = mouseX - originalGrabbedCoordinates.current.x;
      const moveY = mouseY - originalGrabbedCoordinates.current.y;

      currentClonedElement.current.setAttribute(
        'gridstack-x',
        closestGridCoordinates.grid.x.toString(),
      );
      currentClonedElement.current.setAttribute(
        'gridstack-y',
        closestGridCoordinates.grid.y.toString(),
      );

      currentClonedElement.current.style.setProperty(
        'top',
        toPx(closestGridCoordinates.viewport.top),
      );
      currentClonedElement.current.style.setProperty(
        'left',
        toPx(closestGridCoordinates.viewport.left),
      );
      currentDraggingElement.current.style.setProperty(
        '--gridstack-draggable-translate',
        `${toPx(moveX)} ${toPx(moveY)} 0`,
      );
    },
    [snapViewportCoordinatesToGridCoordinates],
  );

  useLayoutEffect(() => {
    window.document.addEventListener('mousedown', beginDrag, { capture: true });
    window.document.addEventListener('mousemove', drag, { capture: true });
    window.document.addEventListener('mouseup', stopDrag, { capture: true });
    return () => {
      window.document.removeEventListener('mousedown', beginDrag, { capture: true });
      window.document.removeEventListener('mousemove', drag, { capture: true });
      window.document.removeEventListener('mouseup', stopDrag, { capture: true });
    };
  }, [beginDrag, drag, stopDrag]);

  return useMemo(
    () => ({
      ref,
    }),
    [ref],
  );
};
