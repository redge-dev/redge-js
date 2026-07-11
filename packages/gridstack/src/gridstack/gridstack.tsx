import type { Merge } from '@redge/types';
import { useCallback, useMemo, useState, type ComponentProps } from 'react';
import { cn, measure, mergeRefs, toPx } from '../utils';
import {
  GridStackContext,
  type TGridStackContextMethods,
  type TGridStackContextState,
} from './context';
import type { GridStackConfiguration } from './types';

import { estimateItemSize } from '../components/item/utils/estimate-item-size';
import { useResizeObserver } from '../hooks';
import { CoordinatesProvider } from '../plugins';
import '../styles/index.scss';
import { calculateGridComponentsDimensions } from '../utils/calculate-grid-components-dimensions/calculate-grid-components-dimensions';

export type GridStackProps = Merge<GridStackConfiguration, ComponentProps<'div'>>;

export const GridStack = ({
  ref,
  width,
  height,
  children,
  className,
  ...props
}: GridStackProps) => {
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [context, setContext] = useState<TGridStackContextState>(() => {
    const configuration = { width, height };
    return {
      configuration,
      items: new Map(),
      dimension: calculateGridComponentsDimensions(measure(element), configuration),
    };
  });

  const registerItemToGrid = useCallback<TGridStackContextMethods['registerItemToGrid']>(
    (id, configuration) => {
      setContext((previousContext) => {
        previousContext.items.set(
          id,
          estimateItemSize(configuration, previousContext.dimension.cell.width),
        );
        return {
          ...previousContext,
        };
      });
    },
    [],
  );

  // Recalculate dimensions on element resize
  useResizeObserver(
    element,
    useCallback(() => {
      setContext((previousContext) => {
        const nextDimension = calculateGridComponentsDimensions(
          measure(element),
          previousContext.configuration,
        );

        const nextItems = new Map();
        previousContext.items.forEach((item, id) => {
          nextItems.set(id, estimateItemSize(item.configuration, nextDimension.cell.width));
        });

        return {
          ...previousContext,
          items: nextItems,
          dimension: nextDimension,
        };
      });
    }, [element]),
  );

  return (
    <GridStackContext
      value={useMemo(
        () => ({
          ...context,
          registerItemToGrid,
        }),
        [context, registerItemToGrid],
      )}
    >
      <CoordinatesProvider>
        <div
          ref={mergeRefs(ref, setElement)}
          className={cn('gridstack__root', className)}
          {...props}
        >
          <div
            style={{
              position: 'relative',
              width: toPx(context.dimension.grid.width),
              height: toPx(context.dimension.grid.height),
            }}
          >
            {children}
          </div>
        </div>
      </CoordinatesProvider>
    </GridStackContext>
  );
};
