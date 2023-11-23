export enum priority {
  deferred = 1,
  throttled,
  immediate,
}

export const priorityString: Map<priority, string> = new Map();

priorityString.set(priority.deferred, "deferred");
priorityString.set(priority.throttled, "throttle");
priorityString.set(priority.immediate, "event");
