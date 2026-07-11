import type { GridStackItemConfiguration } from '../types';

export const estimateItemSize = (configuration: GridStackItemConfiguration, cellSize: number) => {
  return {
    configuration,
    position: {
      top: 0,
      left: 0,
    },
    dimension: {
      width: configuration.width * cellSize,
      height: configuration.height * cellSize,
    },
  };
};
