import { createCanvas } from '@redge/gridstack';
import { useRef } from 'react';

export const GridStack = () => {
  const canvas = useRef(createCanvas());

  return (
    <div
      className="min-w-full border-box border rounded-lg"
      {...canvas.current.renderer.register()}
    />
  );
};
