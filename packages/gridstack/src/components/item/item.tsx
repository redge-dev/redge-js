import type { Merge } from '@redge/types';
import { useId, type ComponentProps } from 'react';
import { useRegisterItemToGrid } from '../../hooks';
import type { GridStackItemConfiguration } from './types';

export type ItemProps = Merge<ComponentProps<'div'>, GridStackItemConfiguration>;

export const Item = ({ x, y, width, height }: ItemProps) => {
  const id = `gs-item-${useId()}`;

  useRegisterItemToGrid(id, {
    x,
    y,
    width,
    height,
  });

  return <div id={id} />;
};
