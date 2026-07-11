import { useEffect } from 'react';
import type { GridStackItemConfiguration } from '../components/item/types';
import { useGridStack } from './use-grid-stack';

export const useRegisterItemToGrid = (id: string, configuration: GridStackItemConfiguration) => {
  const grid = useGridStack();

  useEffect(() => {
    const item = grid.items.get(id);

    const isItemEqual =
      item?.configuration.x === configuration.x &&
      item.configuration.y === configuration.y &&
      item.configuration.width === configuration.width &&
      item.configuration.height === configuration.height;

    if (isItemEqual) return;

    grid.registerItemToGrid(id, configuration);
  }, [id, grid, configuration]);
};
