export enum Error {
  noStack = 1,
  noBlockIndex,
  stackAlreadyHasDataBlock,
  stackAlreadyHasPlotBlock,
}

export const messages: Map<Error, string> = new Map();

messages.set(Error.noStack, "must drag blocks within a stack");
messages.set(Error.noBlockIndex, "could not find block index");
messages.set(
  Error.stackAlreadyHasDataBlock,
  "this stack already includes a data block",
);
messages.set(
  Error.stackAlreadyHasPlotBlock,
  "this stack already includes a plot block",
);
