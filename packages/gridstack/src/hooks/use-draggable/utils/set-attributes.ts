export const setAttributes = (element: HTMLElement) => ({
  gridCoordinates: function (x: number, y: number) {
    element.setAttribute('gridstack-x', x.toString());
    element.setAttribute('gridstack-y', y.toString());
    return this;
  },
});
