import { createContext, useCallback, type PropsWithChildren } from 'react';
import { useGridStack } from '../../hooks';
import type { ViewportPosition } from '../../types';
import { minmax } from '../../utils';

export type TCoordinatesContext = {
  fromGridCoordinatesToViewportCoordinates: (x: number, y: number) => ViewportPosition;
  fromViewportCoordinatesToNearestGridCoordinates: (
    top: number,
    left: number,
  ) => { y: number; x: number };
};

export const CoordinatesContext = createContext<TCoordinatesContext | undefined>(undefined);

export const CoordinatesProvider = ({ children }: PropsWithChildren) => {
  const { dimension, configuration } = useGridStack();

  const fromGridCoordinatesToViewportCoordinates = useCallback<
    TCoordinatesContext['fromGridCoordinatesToViewportCoordinates']
  >(
    (x, y) => ({
      top: minmax(0, y, configuration.height - 1) * dimension.cell.width,
      left: minmax(0, x, configuration.width - 1) * dimension.cell.width,
    }),
    [configuration.height, configuration.width, dimension.cell.width],
  );

  const fromViewportCoordinatesToNearestGridCoordinates = useCallback<
    TCoordinatesContext['fromViewportCoordinatesToNearestGridCoordinates']
  >((top, left) => {}, []);

  return (
    <CoordinatesContext
      value={{
        fromGridCoordinatesToViewportCoordinates,
        fromViewportCoordinatesToNearestGridCoordinates,
      }}
    >
      {children}
    </CoordinatesContext>
  );
};
