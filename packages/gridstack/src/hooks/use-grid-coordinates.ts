import { useCallback, useMemo } from 'react';
import { minmax } from '../utils';
import { useGridStack } from './use-grid-stack';

export const useGridCoordinates = () => {
  const { dimension, configuration } = useGridStack();

  const fromGridCoordinatesToViewportCoordinates = useCallback(
    (x: number, y: number) => ({
      top: minmax(0, y, configuration.height - 1) * dimension.cell.width,
      left: minmax(0, x, configuration.width - 1) * dimension.cell.width,
    }),
    [configuration.height, configuration.width, dimension.cell.width],
  );

  const snapViewportCoordinatesToGridCoordinates = useCallback(
    (x: number, y: number, width: number, height: number) => {
      const stepX = dimension.cell.width;
      const stepY = dimension.cell.height;

      const closestX = minmax(
        0,
        Math.floor((x - dimension.cell.width / 2) / stepX),
        configuration.width - 1,
      );
      const closestY = minmax(
        0,
        Math.floor((y - dimension.cell.height / 2) / stepY),
        configuration.height - 1,
      );

      return {
        grid: {
          x: closestX,
          y: closestY,
        },
        viewport: fromGridCoordinatesToViewportCoordinates(closestX, closestY),
      };
    },
    [
      configuration.height,
      configuration.width,
      dimension.cell.height,
      dimension.cell.width,
      fromGridCoordinatesToViewportCoordinates,
    ],
  );

  return useMemo(
    () => ({
      fromGridCoordinatesToViewportCoordinates,
      snapViewportCoordinatesToGridCoordinates,
    }),
    [fromGridCoordinatesToViewportCoordinates, snapViewportCoordinatesToGridCoordinates],
  );
};
