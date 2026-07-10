import type { Merge } from '@redge/types';
import { useMemo, useState, type ComponentProps, type CSSProperties } from 'react';
import { cn, measure, mergeRefs } from '../utils';
import { GridStackContext } from './context';
import type { GridStackConfiguration } from './types';

import '../styles/index.scss';
import { calculateGridComponentsDimensions } from '../utils/calculate-grid-components-dimensions/calculate-grid-components-dimensions';
import { toPx } from '../utils/to-px/to-px';

export type GridStackProps = Merge<GridStackConfiguration, ComponentProps<'div'>>;

export const GridStack = ({ ref, width, height, className, ...props }: GridStackProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  const context = useMemo(() => {
    const configuration = { width, height };

    return {
      configuration,
      dimension: calculateGridComponentsDimensions(measure(element), configuration),
    };
  }, [element, height, width]);

  return (
    <GridStackContext value={context}>
      <div
        ref={mergeRefs(ref, setElement)}
        className={cn('gridstack__root', className)}
        style={
          {
            '--gridstack-grid-width': toPx(context.dimension.grid.width),
            '--gridstack-grid-height': toPx(context.dimension.grid.height),
          } as CSSProperties
        }
        {...props}
      />
    </GridStackContext>
  );
};
