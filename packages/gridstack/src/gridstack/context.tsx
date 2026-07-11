import { createContext } from 'react';
import type { GridStackItemConfiguration } from '../components/item/types';
import type { Dimension, ViewportPosition } from '../types';
import type { GridStackConfiguration } from './types';

export type TGridStackContextState = {
  configuration: GridStackConfiguration;
  dimension: {
    grid: Dimension;
    cell: Dimension;
  };
  items: Map<
    string,
    {
      dimension: Dimension;
      position: ViewportPosition;
      configuration: GridStackItemConfiguration;
    }
  >;
};

export type TGridStackContextMethods = {
  registerItemToGrid: (id: string, configuration: GridStackItemConfiguration) => void;
};

export type TGridStackContext = TGridStackContextState & TGridStackContextMethods;

export const GridStackContext = createContext<TGridStackContext | undefined>(undefined);
