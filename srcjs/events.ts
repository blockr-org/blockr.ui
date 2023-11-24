export interface blockEvent {
  name: string;
  data: any;
}

export const fireEvent = (
  event: blockEvent,
  el?: HTMLElement | Document,
): void => {
  if (!el) el = document;

  const evt: CustomEvent = new CustomEvent(`blockr:${event.name}`, {
    detail: event.data,
  });
  el.dispatchEvent(evt);
};
