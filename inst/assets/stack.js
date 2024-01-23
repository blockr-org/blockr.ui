(()=>{"use strict";var e;!function(e){e[e.noStack=1]="noStack",e[e.noBlockIndex=2]="noBlockIndex",e[e.stackAlreadyHasDataBlock=3]="stackAlreadyHasDataBlock",e[e.stackAlreadyHasPlotBlock=4]="stackAlreadyHasPlotBlock",e[e.noStackArea=5]="noStackArea"}(e||(e={}));const t=new Map;t.set(e.noStack,"must drag blocks within a stack"),t.set(e.noStackArea,"cannot place stack here"),t.set(e.noBlockIndex,"could not find block index"),t.set(e.stackAlreadyHasDataBlock,"this stack already includes a data block"),t.set(e.stackAlreadyHasPlotBlock,"this stack already includes a plot block");const a=new Map;var r;a.set(e.noStack,"no-stack"),a.set(e.noBlockIndex,"no-block-index"),a.set(e.stackAlreadyHasDataBlock,"stack-already-has-data-block"),a.set(e.stackAlreadyHasPlotBlock,"stack-already-has-plot-block"),function(e){e[e.deferred=1]="deferred",e[e.throttled=2]="throttled",e[e.immediate=3]="immediate"}(r||(r={}));const s=new Map;s.set(r.deferred,"deferred"),s.set(r.throttled,"throttle"),s.set(r.immediate,"event");const o=e=>{let t=e.id;e.ns&&(t=`${e.ns}-${t}`);const a=s.get(e.priority)||"deferred";Shiny.setInputValue(t,e.message,{priority:a})},n=e=>{const t=e.substring(0,4).normalize();return t[0].toUpperCase()+t.substring(1)+e.substring(4)};let d=!1,c="";const i=s=>{d=!1,$(document).find(`#${s.ns}-addWrapper`).find(".add-stack").each(((i,l)=>{const k=s.ns,p=$(l).closest(".add-stack-wrapper").data("target");$(l).on("dragstart",(e=>{var t;e.originalEvent.dataTransfer.setData("text/plain",null===(t=e.target)||void 0===t?void 0:t.id)})),$(l).on("dragover",(e=>{d=!1,e.preventDefault()})),$(l).on("dragenter",(e=>{o({id:"started",ns:k,message:{type:"stack"},priority:r.immediate}),e.preventDefault()})),$(l).on("dragend",(()=>{if(d)return o({id:"dropped",ns:k,message:{type:"stack",target:c},priority:r.immediate}),void(d=!1);(e=>{(e=>{if(!e.feedback)return;const a=$(`#${e.ns}-toast`);a.find(".toast-body").text(n(t.get(e.type))||"Unknown error"),a.show(),setTimeout((()=>{a.hide()}),4500)})(e);const s={ns:e.ns,id:"error",message:{type:a.get(e.type)||"unknown error",message:t.get(e.type)||"unknown error"},priority:r.immediate};o(s),console.error(`${s.message.message}`)})({id:"error",ns:k,type:e.noStackArea,feedback:s.feedback})})),$(p).off("dragover dragenter drop dragdrop"),$(p).on("dragover",(e=>{e.preventDefault()})),$(p).on("dragenter",(e=>{e.preventDefault()})),$(p).on("drop dragdrop",(e=>{d=!0,c=$(e.target).closest(p).attr("id")}))}))};$((()=>{Shiny.addCustomMessageHandler("add-stack-init",(e=>{setTimeout((()=>{i(e)}),e.delay)}))}))})();