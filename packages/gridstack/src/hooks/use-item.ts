import { useGridStack } from './use-grid-stack';

export const useItem = (id: string) => useGridStack().items.get(id);
