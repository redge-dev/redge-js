import type { GridStackUtils } from './utils';

export type PaintProperties = {
  width: number;
  height: number;
  classNames: string[];
  attributes: Record<string, string | number>;
};

export interface IGridstackRenderer {
  createNode: () => HTMLElement;
  paint: (element: HTMLElement, properties: PaintProperties) => void;
}

export type GridStackRenderer = (params: { utils: GridStackUtils }) => IGridstackRenderer;

export const createDOMRenderer: GridStackRenderer = ({ utils }) => ({
  createNode: () => window.document.createElement('div'),
  paint: (element, { width, height, classNames, attributes }) => {
    element.style.setProperty('width', utils.fromNumberToPx(width));
    element.style.setProperty('height', utils.fromNumberToPx(height));

    element.classList.add(...classNames);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value.toString());
    });
  },
});
