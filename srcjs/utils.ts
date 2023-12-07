import { Error } from "./errors";
import { messages, types } from "./errors";
import { priority, priorityString } from "./priority";

export type namespace = string;

export interface wsMsg {
  id: string;
  message: any;
  ns?: namespace;
  priority?: priority;
}

export interface errorMsg {
  ns: namespace;
  id: string;
  type: Error;
  feedback: boolean;
}

export const error = (params: errorMsg): void => {
  const msg: wsMsg = {
    ns: params.ns,
    id: "error",
    message: {
      type: types.get(params.type) || "unknown error",
      message: messages.get(params.type) || "unknown error",
    },
    priority: priority.immediate,
  };

  console.error(`${msg.message.message}`);
  showError(params);
  send(msg);
};

export const send = (params: wsMsg): void => {
  let id = params.id;
  if (params.ns) id = `${params.ns}-${id}`;

  const priority = priorityString.get(params.priority) || "deferred";

  Shiny.setInputValue(id, params.message, { priority: priority });
};

export const showError = (err: errorMsg): void => {
  if (!err.feedback) return;

  const $toast = $(`#${err.ns}-toast`);
  $toast
    .find(".toast-body")
    .text(upperCaseFirstLetter(messages.get(err.type)) || "Unknown error");
  $toast.show();

  setTimeout(() => {
    $toast.hide();
  }, 4500);
};

const upperCaseFirstLetter = (str: string): string => {
  const b: string = str.substring(0, 4).normalize();
  return b[0].toUpperCase() + b.substring(1) + str.substring(4);
};

export const getNamespace = (id: string): namespace => {
  const nsArr: Array<string> = id?.split("-");
  return nsArr?.slice(0, nsArr.length - 1).join("-");
};

export const popovers = (): void => {
  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]',
  );
  [...popoverTriggerList].map(
    (popoverTriggerEl) => new window.bootstrap.Popover(popoverTriggerEl),
  );
};
