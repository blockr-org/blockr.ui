(()=>{"use strict";var e;!function(e){e[e.noStack=1]="noStack",e[e.noBlockIndex=2]="noBlockIndex",e[e.stackAlreadyHasDataBlock=3]="stackAlreadyHasDataBlock",e[e.stackAlreadyHasPlotBlock=4]="stackAlreadyHasPlotBlock",e[e.noStackArea=5]="noStackArea"}(e||(e={}));const t=new Map;t.set(e.noStack,"must drag blocks within a stack"),t.set(e.noStackArea,"cannot place stack here"),t.set(e.noBlockIndex,"could not find block index"),t.set(e.stackAlreadyHasDataBlock,"this stack already includes a data block"),t.set(e.stackAlreadyHasPlotBlock,"this stack already includes a plot block");const a=new Map;var r;a.set(e.noStack,"no-stack"),a.set(e.noBlockIndex,"no-block-index"),a.set(e.stackAlreadyHasDataBlock,"stack-already-has-data-block"),a.set(e.stackAlreadyHasPlotBlock,"stack-already-has-plot-block"),function(e){e[e.deferred=1]="deferred",e[e.throttled=2]="throttled",e[e.immediate=3]="immediate"}(r||(r={}));const o=new Map;o.set(r.deferred,"deferred"),o.set(r.throttled,"throttle"),o.set(r.immediate,"event");const s=e=>{let t=e.id;e.ns&&(t=`${e.ns}-${t}`);const a=o.get(e.priority)||"deferred";Shiny.setInputValue(t,e.message,{priority:a})},n=e=>{const t=e.substring(0,4).normalize();return t[0].toUpperCase()+t.substring(1)+e.substring(4)},d=o=>{$(document).find(`#${o.ns}-addWrapper`).find(".add-stack").each(((d,c)=>{const l=o.ns,i=$(c).closest(".add-stack-wrapper").data("target");let k=!1,p="";$(c).on("dragstart",(e=>{var t;p=$(e.target).text(),e.originalEvent.dataTransfer.setData("text/plain",null===(t=e.target)||void 0===t?void 0:t.id)})),$(c).on("dragover",(e=>{k=!1,e.preventDefault()})),$(c).on("dragenter",(e=>{s({id:"started",ns:l,message:{type:p},priority:r.immediate}),e.preventDefault()})),$(c).on("dragend",(()=>{k||(e=>{const o={ns:e.ns,id:"error",message:{type:a.get(e.type)||"unknown error",message:t.get(e.type)||"unknown error"},priority:r.immediate};console.error(`${o.message.message}`),(e=>{if(!e.feedback)return;const a=$(`#${e.ns}-toast`);a.find(".toast-body").text(n(t.get(e.type))||"Unknown error"),a.show(),setTimeout((()=>{a.hide()}),4500)})(e),s(o)})({id:"error",ns:l,type:e.noStackArea,feedback:o.feedback})})),$(i).off("dragover dragenter drop dragdrop"),$(i).on("dragover",(e=>{e.preventDefault()})),$(i).on("dragenter",(e=>{e.preventDefault()})),$(i).on("drop dragdrop",(e=>{var t,a;k=!0,s({id:"dropped",ns:l,message:{type:p,target:null===(t=e.target)||void 0===t?void 0:t.id,class:null===(a=e.target)||void 0===a?void 0:a.class,data:$(e.target).data()},priority:r.immediate})}))}))};$((()=>{Shiny.addCustomMessageHandler("add-stack-init",(e=>{setTimeout((()=>{console.log(e),d(e)}),e.delay)}))}))})();