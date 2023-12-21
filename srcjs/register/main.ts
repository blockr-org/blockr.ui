import { error, send, errorMsg, popovers, getNamespace } from "../utils";
import { Error } from "../errors";
import { priority } from "../priority";
import { handleSearch } from "./search";

$(() => {
  Shiny.addCustomMessageHandler("block-list-init", (msg) => {
    setTimeout(() => {
      $(`#${msg.id} .block-list-wrapper`).each((_, parent) => {
        sortable(parent, msg);
      });
      handleSearch(msg);
      popovers();
    }, msg.delay);
  });
});

let ns = "";
let index = 0;
let type = "";
let valid = false;

const sortStack = () => {
  $(".stack").off("dragover dragenter drop dragdrop");
  $(".stack").on("dragover", (e: any) => {
    e.preventDefault();
  });

  $(".stack").on("dragenter", (e: any) => {
    e.preventDefault();
  });

  $(".stack").on("drop dragdrop", (e: any) => {
    valid = true;
    send({
      id: "dropped",
      ns: ns,
      message: {
        type: type,
        index: index,
        target: $(e.target).closest(".stack").attr("id"),
      },
      priority: priority.immediate,
    });
  });
};

const sortable = (parent: HTMLElement, params: any) => {
  if ($(parent).hasClass("sorted")) return;

  $(parent).addClass("sorted");
  sortStack();

  $(parent)
    .find(".add-block")
    .each((_, el) => {
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
