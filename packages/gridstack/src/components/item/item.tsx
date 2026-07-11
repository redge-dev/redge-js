import type { Merge } from '@redge/types';
import { useId, type ComponentProps } from 'react';
import { useDraggable, useItem, useRegisterItemToGrid } from '../../hooks';
import { cn, mergeRefs } from '../../utils';
import type { GridStackItemConfiguration } from './types';

export type ItemProps = Merge<ComponentProps<'div'>, GridStackItemConfiguration>;

export const Item = ({ x, y, ref, width, style, height, className, ...props }: ItemProps) => {
  const id = `gs-item-${useId()}`;
  const item = useItem(id);
  const { ref: dragRef } = useDraggable();

  useRegisterItemToGrid(id, {
    x,
    y,
    width,
    height,
  });

  if (!item) return null;

  return (
    <div
      id={id}
      style={{
        top: item.position.top,
        left: item.position.left,
        width: item.dimension.width,
        height: item.dimension.height,
        ...style,
      }}
      ref={mergeRefs(dragRef, ref)}
      className={cn('gridstack__item', className)}
      {...props}
    />
  );
};
