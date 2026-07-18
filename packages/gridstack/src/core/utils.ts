import type { CanvasConfiguration } from './canvas';

export type CreateUtilsParams = {
  configuration?: Partial<CanvasConfiguration>;
  container?: {
    /**
     * @default 500
     */
    width: number;
    /**
     * @default 500
     */
    height: number;
  };
};

export type GridStackUtils = ReturnType<typeof createUtils>;

export const createUtils = ({
  configuration = { rows: 12, columns: 12 },
  container: { width: containerWidth } = { width: 500, height: 500 },
}: CreateUtilsParams = {}) => {
  const utils = {
    fromNumberToPx: (px: number) => `${isNaN(px) ? 0 : px}px`,
    fromPxToNumber: (px: string) => parseFloat(px.replaceAll('px', '')),
    fromPositionToGridCoordinates: (top: number, left: number) => void 0,
    defaultTo: <T>(value: T | undefined, fallback: T): T =>
      typeof value === 'undefined' ? fallback : value,
    getCellSize: () =>
      containerWidth / utils.defaultTo(configuration.columns, 12) -
      Math.max(0, utils.defaultTo(configuration.columns, 12) - 1) *
        utils.defaultTo(configuration.gutter, 8),
    fromGridCoordinatesToPosition: (row: number, column: number) => {
      const cellSize = utils.getCellSize();
      return {
        top:
          Math.max(0, row - 1) * cellSize +
          Math.max(0, row - 1) * utils.defaultTo(configuration.gutter, 8),
        left:
          Math.max(0, column - 1) * cellSize +
          Math.max(0, column - 1) * utils.defaultTo(configuration.gutter, 8),
      };
    },
    measure: (element: HTMLElement) => {
      const {
        width,
        height,
        paddingTop,
        paddingLeft,
        paddingRight,
        paddingBottom,
        borderTopWidth,
        borderLeftWidth,
        borderRightWidth,
        borderBottomWidth,
      } = window.getComputedStyle(element);

      return {
        contentWidth:
          utils.fromPxToNumber(width) -
          utils.fromPxToNumber(borderLeftWidth) -
          utils.fromPxToNumber(borderRightWidth) -
          utils.fromPxToNumber(paddingLeft) -
          utils.fromPxToNumber(paddingRight),
        contentHeight:
          utils.fromPxToNumber(height) -
          utils.fromPxToNumber(borderTopWidth) -
          utils.fromPxToNumber(borderBottomWidth) -
          utils.fromPxToNumber(paddingBottom) -
          utils.fromPxToNumber(paddingTop),
      };
    },
  };

  return utils;
};
