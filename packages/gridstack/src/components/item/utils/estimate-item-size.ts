import { minmax } from '../../../utils';
import type { GridStackItemConfiguration } from '../types';

export const estimateItemSize = (configuration: GridStackItemConfiguration, cellSize: number) => {
  return {
    configuration,
    dimension: {
      width: configuration.width * cellSize,
      height: configuration.height * cellSize,
    },
    position: {
      top: minmax(0, configuration.y, configuration.height - 1) * cellSize,
      left: minmax(0, configuration.x, configuration.width - 1) * cellSize,
    },
  };
};
