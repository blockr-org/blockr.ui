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
}

export function error(params: errorMsg): void {
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
  send(msg);
}

export function send(params: wsMsg): void {
  let id = params.id;
  if (params.ns) id = `${params.ns}-${id}`;

  const priority = priorityString.get(params.priority) || "deferred";

  Shiny.setInputValue(id, params.message, { priority: priority });
}
