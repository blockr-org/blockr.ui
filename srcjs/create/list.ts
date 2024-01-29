import { Field, fieldCard } from "./card";

export const blockList = (params: any): void => {
  $(`#${params.nsPrefix}blocks`).html(blocks(params.blocks));
  handleBlockList(params);
};

const blocks = (blocks: any): string => {
  return blocks
    .map((block: any) => {
      return `<div class="block-list-item rounded shadow-sm mb-2 d-flex p-2">
      <div class="flex-grow-1 block-list-name">${block.name}</div>
      <div class="flex-shrink-1 text-muted">${block.type}</div>
    </div>`;
    })
    .join("");
};

const handleBlockList = (params: any): void => {
  $(".block-list-item").off("click");

  $(".block-list-item").on("click", (e) => {
    const name = $(e.currentTarget).find(".block-list-name").text();
    const block = params.blocks.filter((b: any) => b.name == name)[0];

    console.log(block);
    $(`#${params.nsPrefix}name`).val(block.name);
    $(`#${params.nsPrefix}type`).val(block.type);

    const fields = block.fields.map((field: Field) => fieldCard(field));
    $(`#${params.nsPrefix}fields`).append(fields);
  });
};
