import "sortable";
import { getNamespace, send } from "../utils";
import { priority } from "../priority";

$(() => {
  const draggables: JQuery = $(document).find(".add-stack");

  draggables.each((_: number, draggable: any) => {
    if ($(draggable).hasClass("sorted")) return;

    $(draggable).addClass("sorted");

    const ns = getNamespace($(draggable).attr("id"));

    const stackTarget = $(draggable)
      .closest(".add-stack-wrapper")
      .data("target");

    let type = "";
    $(draggable).on("dragstart", (e: any) => {
      type = $(e.target).text();
      e.originalEvent.dataTransfer.setData("text/plain", e.target?.id);
    });

    $(draggable).on("dragover", (e: any) => {
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

    $(stackTarget).on("dragover", (e: any) => {
      e.preventDefault();
    });

    $(stackTarget).on("dragenter", (e: any) => {
      e.preventDefault();
    });

    $(stackTarget).on("drop dragdrop", (e: any) => {
      send({
        id: "dropped",
        ns: ns,
        message: {
          type: type,
          target: e.target?.id,
        },
        priority: priority.immediate,
      });
    });
  });

  Shiny.addCustomMessageHandler("add-stack-init", (msg: any) => {
    console.log(msg);
  });
});
