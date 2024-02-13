export const tooltipOff = (el: HTMLElement) => {
  const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(el);
  tooltip.hide();
};
