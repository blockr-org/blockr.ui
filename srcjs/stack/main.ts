import { errorMsg, send, error } from "../utils";
import { priority } from "../priority";
import { Error } from "../errors";

let valid = false;
let target = "";
const handleAddStack = (params: any) => {
  valid = false;
  const draggables: JQuery = $(document)
    .find(`#${params.ns}-addWrapper`)
    .find(".add-stack");

  draggables.each((_: number, draggable: any) => {
    const ns = params.ns;

    const stackTarget = $(draggable)
      .closest(".add-stack-wrapper")
      .data("target");

    $(draggable).on("dragstart", (e: any) => {
      e.originalEvent.dataTransfer.setData("text/plain", e.target?.id);
    });

    $(draggable).on("dragover", (e: any) => {
      valid = false;
      e.preventDefault();
    });

    $(draggable).on("dragenter", (e: any) => {
      send({
        id: "started",
        ns: ns,
        message: {
          type: "stack",
        },
        priority: priority.immediate,
      });
      e.preventDefault();
    });

    $(draggable).on("dragend", () => {
      if (valid) {
        send({
          id: "dropped",
          ns: ns,
          message: {
            type: "stack",
            target: target,
          },
          priority: priority.immediate,
        });
        valid = false;
        return;
      }

      const err: errorMsg = {
        id: "error",
        ns: ns,
        type: Error.noStackArea,
        feedback: params.feedback,
      };

      error(err);
    });

    $(stackTarget).off("dragover dragenter drop dragdrop");
    $(stackTarget).on("dragover", (e: any) => {
      e.preventDefault();
    });

    $(stackTarget).on("dragenter", (e: any) => {
      e.preventDefault();
    });

    $(stackTarget).on("drop dragdrop", (e: any) => {
      valid = true;
      target = $(e.target).closest(stackTarget).attr("id");
    });
  });
};

$(() => {
  Shiny.addCustomMessageHandler("add-stack-init", (msg: any) => {
    setTimeout(() => {
      handleAddStack(msg);
    }, msg.delay);
  });
});
