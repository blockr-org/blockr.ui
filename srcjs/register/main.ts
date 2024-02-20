import { description } from "./description";
import { bindSearch } from "./search";
import { bindScroll } from "./scroll";
import { sortStack, sortableAll } from "./drag";

$(() => {
  Shiny.addCustomMessageHandler("block-list-init", (msg) => {
    setTimeout(() => {
      sortableAll(msg);
      description();
    }, msg.delay);
  });

  Shiny.addCustomMessageHandler("block-list-bind", (msg) => {
    setTimeout(() => {
      sortStack();
      description();
    }, msg.delay);
  });

  Shiny.addCustomMessageHandler("block-list-endpoints", (msg) => {
    setTimeout(() => {
      bindSearch(msg);
      bindScroll(msg);
    }, msg.delay);
  });
});
