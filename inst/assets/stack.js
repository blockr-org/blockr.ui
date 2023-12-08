(()=>{"use strict";var t;!function(t){t[t.noStack=1]="noStack",t[t.noBlockIndex=2]="noBlockIndex",t[t.stackAlreadyHasDataBlock=3]="stackAlreadyHasDataBlock",t[t.stackAlreadyHasPlotBlock=4]="stackAlreadyHasPlotBlock",t[t.noStackArea=5]="noStackArea"}(t||(t={}));const e=new Map;e.set(t.noStack,"must drag blocks within a stack"),e.set(t.noStackArea,"cannot place stack here"),e.set(t.noBlockIndex,"could not find block index"),e.set(t.stackAlreadyHasDataBlock,"this stack already includes a data block"),e.set(t.stackAlreadyHasPlotBlock,"this stack already includes a plot block");const a=new Map;var s;a.set(t.noStack,"no-stack"),a.set(t.noBlockIndex,"no-block-index"),a.set(t.stackAlreadyHasDataBlock,"stack-already-has-data-block"),a.set(t.stackAlreadyHasPlotBlock,"stack-already-has-plot-block"),function(t){t[t.deferred=1]="deferred",t[t.throttled=2]="throttled",t[t.immediate=3]="immediate"}(s||(s={}));const r=new Map;r.set(s.deferred,"deferred"),r.set(s.throttled,"throttle"),r.set(s.immediate,"event");const o=t=>{let e=t.id;t.ns&&(e=`${t.ns}-${e}`);const a=r.get(t.priority)||"deferred";Shiny.setInputValue(e,t.message,{priority:a})},n=t=>{const e=t.substring(0,4).normalize();return e[0].toUpperCase()+e.substring(1)+t.substring(4)},d=r=>{$(document).find(".add-stack").each(((d,l)=>{if($(l).hasClass("sorted"))return;$(l).addClass("sorted");const c=(t=>{const e=null==t?void 0:t.split("-");return null==e?void 0:e.slice(0,e.length-1).join("-")})($(l).attr("id")),i=$(l).closest(".add-stack-wrapper").data("target");let k=!1,p="";$(l).on("dragstart",(t=>{var e;p=$(t.target).text(),t.originalEvent.dataTransfer.setData("text/plain",null===(e=t.target)||void 0===e?void 0:e.id)})),$(l).on("dragover",(t=>{k=!1,t.preventDefault()})),$(l).on("dragenter",(t=>{o({id:"started",ns:c,message:{type:p},priority:s.immediate}),t.preventDefault()})),$(l).on("dragend",(()=>{k||(t=>{const r={ns:t.ns,id:"error",message:{type:a.get(t.type)||"unknown error",message:e.get(t.type)||"unknown error"},priority:s.immediate};console.error(`${r.message.message}`),(t=>{if(!t.feedback)return;const a=$(`#${t.ns}-toast`);a.find(".toast-body").text(n(e.get(t.type))||"Unknown error"),a.show(),setTimeout((()=>{a.hide()}),4500)})(t),o(r)})({id:"error",ns:c,type:t.noStackArea,feedback:r.feedback})})),$(i).on("dragover",(t=>{t.preventDefault()})),$(i).on("dragenter",(t=>{t.preventDefault()})),$(i).on("drop dragdrop",(t=>{var e,a;k=!0,o({id:"dropped",ns:c,message:{type:p,target:null===(e=t.target)||void 0===e?void 0:e.id,class:null===(a=t.target)||void 0===a?void 0:a.class,data:$(t.target).data()},priority:s.immediate})}))}))};$((()=>{Shiny.addCustomMessageHandler("add-stack-init",(t=>{d(t)}))}))})();