export const tooltipOff = (el: HTMLElement) => {
  const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(el);
  tooltip.hide();
};

export const tooltipOn = () => {
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]',
  );
  [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl),
  );
};
