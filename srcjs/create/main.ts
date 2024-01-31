import { fieldCard, Field } from "./card";
import { fieldEvents } from "./events";
import { blockList } from "./list";
const Ace = require("ace-builds/src-noconflict/ace");
require("ace-builds/src-noconflict/mode-r.js");
require("ace-builds/src-noconflict/snippets/r.js");
require("ace-builds/src-noconflict/ext-language_tools.js");

Ace.require("ace/ext/language_tools");
Ace.require("ace/mode/r");

Shiny.addCustomMessageHandler("blockr-create-init", (msg: any) => {
  const editor = Ace.edit(`${msg.nsPrefix}expression`);

  editor.session.setMode("ace/mode/r");

  editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
  });

  blockList(msg, editor);

  // cheap reset
  $(`#${msg.nsPrefix}save`).off("click");
  $(`#${msg.nsPrefix}add`).off("click");

  $(`#${msg.nsPrefix}add`).on("click", () => {
    const f: Field = { name: "", type: "numeric" };
    const field = fieldCard(f);
    $(`#${msg.nsPrefix}fields`).append(field);

    fieldEvents();
  });

  $(`#${msg.nsPrefix}save`).on("click", (e): void => {
    const fields: Field[] = [];

    $(e.target)
      .closest(".blockr-create-block")
      .find(".blockr-create-field")
      .each((_i, el) => {
        const name = String($(el).find(".blockr-create-field-name").val());
        const type = String($(el).find(".blockr-create-field-type").val());
        fields.push({ name: name, type: type });
      });

    const block: Block = {
      name: String($(`#${msg.nsPrefix}name`).val()),
      type: String($(`#${msg.nsPrefix}type`).val()),
      expression: editor.getValue(),
      fields: fields,
    };

    if (block.fields.length == 0) {
      Shiny.notifications.show({ html: "Must have at least one field" });
      return;
    }

    if (block.name == "") {
      Shiny.notifications.show({ html: "Must set a block name" });
      return;
    }

    if (block.expression == "") {
      Shiny.notifications.show({ html: "Expression is not set" });
      return;
    }

    $(`#${msg.nsPrefix}fields`).html("");
    $(`#${msg.nsPrefix}name`).val("");
    editor.setValue("");

    Shiny.setInputValue(`${msg.nsPrefix}newBlock`, block);
  });
});

type Block = {
  name: string;
  type: string;
  expression: string;
  fields: Field[];
};
