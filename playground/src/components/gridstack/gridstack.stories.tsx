import type { Meta, StoryObj } from '@storybook/react';
import { GridStack } from './gridstack';

const meta = {
  title: 'GridStack',
  component: GridStack,
} satisfies Meta<typeof GridStack>;

export default meta;

type Story = StoryObj<typeof GridStack>;

export const Default = {} satisfies Story;
