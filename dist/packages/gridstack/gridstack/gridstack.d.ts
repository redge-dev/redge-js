import { Merge } from '@redge/types';
import { ComponentProps } from 'react';
import { GridStackConfiguration } from './types';
export type GridStackProps = Merge<GridStackConfiguration, ComponentProps<'div'>>;
export declare const GridStack: ({ width, height, className, ...props }: GridStackProps) => import("react").JSX.Element;
//# sourceMappingURL=gridstack.d.ts.map