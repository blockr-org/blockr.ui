import "sortable";
import { namespace, error, send, errorMsg, popovers } from "../utils";
import { Error } from "../errors";
import { priority } from "../priority";
import { handleSearch } from "./search";

declare const Sortable: any;

$(() => {
  Shiny.addCustomMessageHandler("block-list-init", (msg) => {
    $(`#${msg.id} .block-list-wrapper`).each((_, parent) => {
      new Sortable(parent, sortableOptions(msg.ns, msg.feedback));
    });
    handleSearch(msg);
    popovers();
  });
});

const sortableOptions = (ns: namespace, feedback: boolean) => {
  return {
    draggable: ".add-block",
    onEnd: (event: any) => {
      const target: HTMLElement = event.originalEvent.srcElement;
      const $stack = $(target).closest(".stack");

      const err: errorMsg = {
        id: "error",
        ns: ns,
        type: Error.noStack,
        feedback: feedback,
      };

      // it's not dropped in a stack
      if (!$stack.length) {
        error(err);
        return;
      }

      const blockType: string = $(event.item).data("type");

      // we get all block types in the stack
      // to check whether the block to add is compatible
      // this may change in the future if rules for block
      // positions are shared by {blockr}
      const blockTypes: Array<string> = [];
      $(target)
        .closest(".stack")
        .find("[data-block-type]")
        .each((_, el) => {
          const vals = $(el).data("block-type").split(",");
          blockTypes.push(...vals);
        });

      // get stackId
      const stackId: string = $stack.attr("id").split("-")[1];

      // get block id
      const blockId: string = $(target).closest(".block").data("value");

      // get index where the user wants to insert the block
      let blockIndex: number;
      $stack.find(".block").each((index, el) => {
        if ($(el).data("value") == blockId) {
          blockIndex = index + 1;
        }
      });

      if (!blockIndex) {
        err.type = Error.noBlockIndex;
        error(err);
        return;
      }

      // check whether stack already has a data block
      if (
        blockTypes.includes("dataset_block") &&
        blockType == "dataset_block"
      ) {
        err.type = Error.stackAlreadyHasDataBlock;
        error(err);
        return;
      }

      // check whether stack already has a plot block
      if (blockTypes.includes("plot_block") && blockType == "plot_block") {
        err.type = Error.stackAlreadyHasPlotBlock;
        error(err);
        return;
      }

      send({
        id: "block",
        ns: ns,
        message: {
          stackId: stackId,
          blockId: blockId,
          blockIndex: blockIndex,
          type: blockType,
        },
        priority: priority.immediate,
      });
    },
  };
};
