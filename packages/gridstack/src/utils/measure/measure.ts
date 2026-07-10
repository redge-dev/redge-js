import type { Dimension } from '../../types';
import { pxToNumber } from '../px-to-number/px-to-number';

export const measure = (element?: HTMLElement | null): Dimension => {
  if (!element) return { width: 0, height: 0 };

  const { width, height, borderTopWidth, borderLeftWidth, borderRightWidth, borderBottomWidth } =
    window.getComputedStyle(element);

  return {
    width: pxToNumber(width) - pxToNumber(borderLeftWidth) - pxToNumber(borderRightWidth),
    height: pxToNumber(height) - pxToNumber(borderTopWidth) - pxToNumber(borderBottomWidth),
  };
};
