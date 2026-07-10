import type { GridStackConfiguration } from '../../gridstack/types';
import type { Dimension } from '../../types';

export const calculateGridComponentsDimensions = (
  dimension: Dimension,
  configuration: GridStackConfiguration,
) => {
  const cellSize = dimension.width / configuration.width;

  return {
    cell: {
      width: cellSize,
      height: cellSize,
    } satisfies Dimension,
    grid: {
      width: configuration.width * cellSize,
      height: configuration.height * cellSize,
    } satisfies Dimension,
  };
};
