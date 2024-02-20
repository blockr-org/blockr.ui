import { description } from "./description";
import { sortableAll } from "./drag";
import { handleSearch } from "./search";

const createPills = (blocks: any): string => {
  return blocks.map((b: any) => createPill(b)).join("");
};

const createPill = (block: any): string => {
  return `<p class="cursor-pointer mb-1 badge add-block bg-${blockColor(
    block,
  )} me-1"
    data-index="${block.index}"
    data-icon='${block.icon}'
    data-name="${block.name}"
    data-description="${block.description}"
    draggable="true">
    ${block.name}
  </p>`;
};

export const renderPills = (params: any, data: any): void => {
  const pills = createPills(data);
  $(`#${params.ns}-scrollable-child`).append(pills);
  sortableAll(params);
  description();
  handleSearch(params);
};

const blockColor = (block: any) => {
  if (block.classes.includes("data_block")) return "primary";

  if (block.classes.includes("transform_block")) return "secondary";

  return "info";
};
