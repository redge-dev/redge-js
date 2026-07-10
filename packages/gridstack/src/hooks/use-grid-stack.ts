import { useContext } from 'react';
import { GridStackContext } from '../gridstack/context';

export const useGridStack = () => {
  const ctx = useContext(GridStackContext);

  if (!ctx) throw new Error('useGridStack must be used within GridStackContext');

  return ctx;
};
