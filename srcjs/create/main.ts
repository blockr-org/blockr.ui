import { fieldCard, FieldCardParams } from "./card";
import { fieldEvents } from "./events";
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

  $(`#${msg.nsPrefix}add`).on("click", () => {
    const params: FieldCardParams = {};
    const field = fieldCard(params);
    $(`#${msg.nsPrefix}fields`).append(field);

    fieldEvents();
  });
});
