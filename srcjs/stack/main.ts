import { errorMsg, send, error } from "../utils";
import { priority } from "../priority";
import { Error } from "../errors";

const handleAddStack = (params: any) => {
  const draggables: JQuery = $(document)
    .find(`#${params.ns}-addWrapper`)
    .find(".add-stack");

  draggables.each((_: number, draggable: any) => {
    const ns = params.ns;

    const stackTarget = $(draggable)
      .closest(".add-stack-wrapper")
      .data("target");

    let valid = false;
    let type = "";
    $(draggable).on("dragstart", (e: any) => {
      type = $(e.target).text();
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
          type: type,
        },
        priority: priority.immediate,
      });
      e.preventDefault();
    });

    $(draggable).on("dragend", () => {
      if (valid) return;

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
      send({
        id: "dropped",
        ns: ns,
        message: {
          type: type,
          target: e.target?.id,
          class: e.target?.class,
          data: $(e.target).data(),
        },
        priority: priority.immediate,
      });
    });
  });
};

$(() => {
  Shiny.addCustomMessageHandler("add-stack-init", (msg: any) => {
    setTimeout(() => {
      console.log(msg);
      handleAddStack(msg);
    }, msg.delay);
  });
});
