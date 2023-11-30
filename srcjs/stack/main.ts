import "sortable";
import { blockEvent, fireEvent } from "../events";
import { getNamespace, send } from "../utils";
import { priority } from "../priority";

declare const Sortable: any;

$(() => {
  const draggables: JQuery = $(document).find(".add-stack-wrapper");

  draggables.each((_: number, draggable: any) => {
    if ($(draggable).hasClass("sorted")) return;

    $(draggable).addClass("sorted");

    const button: JQuery = $(draggable).find(".add-stack");

    new Sortable(draggable, {
      draggable: ".add-stack",
      onStart: () => {
        const e: blockEvent = {
          name: "add-stack-start",
          data: {},
        };

        fireEvent(e, button[0]);

        send({
          id: "addStackStarted",
          ns: getNamespace($(draggable).attr("id")),
          message: {
            type: "add-stack-started",
            stackId: $(button).attr("id"),
          },
          priority: priority.immediate,
        });
      },
      onUnchoose: () => {
        const e: blockEvent = {
          name: "add-stack-ended",
          data: {},
        };

        fireEvent(e, button[0]);

        send({
          id: "addStackEnded",
          ns: getNamespace($(draggable).attr("id")),
          message: {
            type: "add-stack-ended",
            stackId: $(button).attr("id"),
          },
        });
      },
      onEnd: (evt: any) => {
        send({
          id: "addStackEnded",
          ns: getNamespace($(draggable).attr("id")),
          message: {
            stackId: $(button).attr("id"),
          },
        });

        const rowID: string = $(evt.originalEvent.srcElement)
          .closest(".masonry-row")
          .attr("id");

        send({
          id: "addStack",
          ns: getNamespace($(draggable).attr("id")),
          message: {
            rowID: rowID,
          },
          priority: priority.immediate,
        });
      },
    });
  });

  Shiny.addCustomMessageHandler("add-stack-started", (msg: any) => {
    eval(msg.js);
  });

  Shiny.addCustomMessageHandler("add-stack-ended", (msg: any) => {
    eval(msg.js);
  });
});
