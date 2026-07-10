import { createContext } from 'react';
import type { Dimension } from '../types';
import type { GridStackConfiguration } from './types';

export type TGridStackContext = {
  configuration: GridStackConfiguration;
  dimension: {
    grid: Dimension;
    cell: Dimension;
  };
};

export const GridStackContext = createContext<TGridStackContext | undefined>(undefined);
