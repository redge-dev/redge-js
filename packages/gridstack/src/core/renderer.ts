import type { GridStackUtils } from './utils';

export type PaintProperties = {
  width: number;
  height: number;
  classNames: string[];
  attributes: Record<string, string | number>;
};

export interface IGridstackRenderer {
  /**
   * Register Gridstack to a HTML Element.
   */
  register: () => any;
  createNode: () => HTMLElement;
  paint: (element: HTMLElement, properties: PaintProperties) => void;
}

export type GridStackRenderer = (params: { utils: GridStackUtils }) => IGridstackRenderer;

export const createDOMRenderer: GridStackRenderer = ({ utils }) => {
  let root: HTMLElement | null = null;
  let grid: HTMLElement | null = null;

  const size = 0;

  const createNode: IGridstackRenderer['createNode'] = () => {
    if (!grid) grid = window.document.createElement('div');
    return grid;
  };

  const paint: IGridstackRenderer['paint'] = (
    element,
    { width, height, classNames, attributes },
  ) => {
    element.style.setProperty('width', utils.fromNumberToPx(width));
    element.style.setProperty('height', utils.fromNumberToPx(height));

    element.classList.add(...classNames);

    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value.toString());
    });
  };

  const register: IGridstackRenderer['register'] = () => ({
    ref: (element: HTMLElement | null) => {
      if (!element) return;
      root = element;

      const onSizeChange = () => {
        if (!root) return;
        const { contentWidth } = utils.measure(root);
      };

      return () => {
        root = null;
      };
    },
  });

  return {
    paint,
    register,
    createNode,
  };
};
