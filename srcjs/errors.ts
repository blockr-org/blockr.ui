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

export const types: Map<Error, string> = new Map();

types.set(Error.noStack, "no-stack");
types.set(Error.noBlockIndex, "no-block-index");
types.set(Error.stackAlreadyHasDataBlock, "stack-already-has-data-block");
types.set(Error.stackAlreadyHasPlotBlock, "stack-already-has-plot-block");
