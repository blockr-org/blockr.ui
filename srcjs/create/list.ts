import { Field, fieldCard } from "./card";
import { fieldEvents } from "./events";

export const blockList = (params: any, editor: any): void => {
  $(`#${params.nsPrefix}blocks`).html(blocks(params.blocks));
  handleBlockList(params, editor);
};

const blocks = (blocks: any): string => {
  return blocks
    .map((block: any) => {
      return `<div class="block-list-item rounded shadow-sm mb-2 d-flex p-2">
      <div class="flex-grow-1 block-list-name me-4">${block.name}</div>
      <div class="flex-shrink-1 text-muted">${block.type}</div>
    </div>`;
    })
    .join("");
};

const handleBlockList = (params: any, editor: any): void => {
  $(".block-list-item").off("click");

  $(".block-list-item").on("click", (e) => {
    const current = $(`#${params.nsPrefix}name`).val();
    const name = $(e.currentTarget).find(".block-list-name").text();

    if (current == name) return;

    const block = params.blocks.filter((b: any) => b.name == name)[0];

    $(`#${params.nsPrefix}name`).val(block.name);
    $(`#${params.nsPrefix}type`).val(block.type);
    editor.setValue(block.expression);

    const fields = block.fields.map((field: Field) => fieldCard(field));
    $(`#${params.nsPrefix}fields`).append(fields);

    fieldEvents();
  });
};
