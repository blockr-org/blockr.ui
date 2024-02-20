import { error, send, errorMsg, getNamespace } from "../utils";
import { Error } from "../errors";
import { priority } from "../priority";

let ns = "";
let index = 0;
let type = "";
let valid = false;

const getBlockPosition = (el: HTMLElement) => {
  const $block = $(el).closest(".block");
  const id = $block.data("value");

  let position = 0;
  $block
    .closest(".stack")
    .find(".block")
    .each((index: number, block: HTMLElement): void => {
      if ($(block).data("value") != id) return;

      position = index + 1;
    });

  return position;
};

export const sortStack = () => {
  $(".stack").off("dragover dragenter drop dragdrop");
  $(".stack").on("dragover", (e: any) => {
    e.preventDefault();
  });

  $(".stack").on("dragenter", (e: any) => {
    e.preventDefault();
  });

  $(".stack").on("drop dragdrop", (e: any) => {
    valid = true;
    if (index < 0) return;
    send({
      id: "dropped",
      ns: ns,
      message: {
        type: type,
        index: index,
        position: getBlockPosition(e.target),
        target: $(e.target).closest(".stack").attr("id"),
      },
      priority: priority.immediate,
    });
    index = -1;
  });
};

export const sortableAll = (params: any) => {
  $(`#${params.id} .block-list-wrapper`).each((_, parent) => {
    sortable(parent, params);
  });
};

const sortable = (parent: HTMLElement, params: any) => {
  sortStack();

  $(parent)
    .find(".add-block")
    .each((_, el) => {
      if ($(el).hasClass("sorted")) return;
      $(el).addClass("sorted");

      $(el).on("dragstart", (e: any) => {
        type = $(e.target).data("type");
        index = $(e.target).data("index");
        ns = getNamespace($(e.target).closest(".blockr-registry").attr("id"));
        e.originalEvent.dataTransfer.setData("text/plain", e.target?.id);
      });

      $(el).on("dragover", (e: any) => {
        valid = false;
        e.preventDefault();
      });

      $(el).on("dragenter", (e: any) => {
        send({
          id: "started",
          ns: params.ns,
          message: {
            type: type,
            index: index,
          },
          priority: priority.immediate,
        });
        e.preventDefault();
      });

      $(el).on("dragend", () => {
        if (valid) return;

        const err: errorMsg = {
          id: "error",
          ns: params.ns,
          type: Error.noStack,
          feedback: params.feedback,
        };

        error(err);
      });
    });
};
