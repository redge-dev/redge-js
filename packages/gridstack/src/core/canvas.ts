import { createDOMRenderer, type GridStackRenderer } from './renderer';
import { createUtils, type CreateUtilsParams } from './utils';

export type CanvasConfiguration = {
  /**
   * Number of rows in the Grid.
   * @default 12
   */
  rows: number;
  /**
   * Size of the gutter, in `px`.
   * @default 8
   */
  gutter: number;
  /**
   * Number of columns in the Grid.
   * @default 12
   */
  columns: number;
};

export type CreateCanvasParams = {
  renderer?: GridStackRenderer;
} & CreateUtilsParams;

export const createCanvas = ({
  container,
  configuration,
  renderer: createRenderer = createDOMRenderer,
}: CreateCanvasParams) => {
  const utils = createUtils({ container, configuration });
  const renderer = createRenderer({ utils });

  return {
    utils,
  };
};
