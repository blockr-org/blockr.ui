(()=>{"use strict";var e;Sortable,function(e){e[e.noStack=1]="noStack",e[e.noBlockIndex=2]="noBlockIndex",e[e.stackAlreadyHasDataBlock=3]="stackAlreadyHasDataBlock",e[e.stackAlreadyHasPlotBlock=4]="stackAlreadyHasPlotBlock"}(e||(e={}));const t=new Map;t.set(e.noStack,"must drag blocks within a stack"),t.set(e.noBlockIndex,"could not find block index"),t.set(e.stackAlreadyHasDataBlock,"this stack already includes a data block"),t.set(e.stackAlreadyHasPlotBlock,"this stack already includes a plot block");const a=new Map;var r;a.set(e.noStack,"no-stack"),a.set(e.noBlockIndex,"no-block-index"),a.set(e.stackAlreadyHasDataBlock,"stack-already-has-data-block"),a.set(e.stackAlreadyHasPlotBlock,"stack-already-has-plot-block"),function(e){e[e.deferred=1]="deferred",e[e.throttled=2]="throttled",e[e.immediate=3]="immediate"}(r||(r={}));const o=new Map;o.set(r.deferred,"deferred"),o.set(r.throttled,"throttle"),o.set(r.immediate,"event");const s=e=>{let t=e.id;e.ns&&(t=`${e.ns}-${t}`);const a=o.get(e.priority)||"deferred";Shiny.setInputValue(t,e.message,{priority:a})},n=e=>{const t=e.substring(0,4).normalize();return t[0].toUpperCase()+t.substring(1)+e.substring(4)},d=e=>t=>{if(t.key&&"Enter"!=t.key)return;const{target:a}=t,r=$(`#${e.ns}-query`),o=String(null==r?void 0:r.val());""!=o?$(a).closest(".blockr-registry").find(".add-block").each(((e,t)=>{$(t).data("description").includes(o)||$(t).text().includes(o)?$(t).show():$(t).hide()})):$(a).closest(".blockr-registry").find(".add-block").show()};$((()=>{Shiny.addCustomMessageHandler("block-list-init",(e=>{var t;$(`#${e.id} .block-list-wrapper`).each(((t,a)=>{p(a,e)})),t=e,$(`#${t.ns}-search`).on("click",d(t)),$(`#${t.ns}-query`).on("keyup",d(t)),[...document.querySelectorAll('[data-bs-toggle="popover"]')].map((e=>new window.bootstrap.Popover(e)))}))}));let l="",i=0,c="",k=!1;const p=(o,d)=>{$(o).hasClass("sorted")||($(o).addClass("sorted"),$(".stack").off("dragover dragenter drop dragdrop"),$(".stack").on("dragover",(e=>{e.preventDefault()})),$(".stack").on("dragenter",(e=>{e.preventDefault()})),$(".stack").on("drop dragdrop",(e=>{var t;k=!0,s({id:"dropped",ns:l,message:{type:c,index:i,target:null===(t=e.target)||void 0===t?void 0:t.id},priority:r.immediate})})),$(o).find(".add-block").each(((o,p)=>{$(p).on("dragstart",(e=>{var t;c=$(e.target).data("type"),i=$(e.target).data("index"),l=(e=>{const t=null==e?void 0:e.split("-");return null==t?void 0:t.slice(0,t.length-1).join("-")})($(e.target).attr("id")),e.originalEvent.dataTransfer.setData("text/plain",null===(t=e.target)||void 0===t?void 0:t.id)})),$(p).on("dragover",(e=>{k=!1,e.preventDefault()})),$(p).on("dragenter",(e=>{s({id:"started",ns:d.ns,message:{type:c,index:i},priority:r.immediate}),e.preventDefault()})),$(p).on("dragend",(()=>{k||(e=>{const o={ns:e.ns,id:"error",message:{type:a.get(e.type)||"unknown error",message:t.get(e.type)||"unknown error"},priority:r.immediate};console.error(`${o.message.message}`),(e=>{if(!e.feedback)return;const a=$(`#${e.ns}-toast`);a.find(".toast-body").text(n(t.get(e.type))||"Unknown error"),a.show(),setTimeout((()=>{a.hide()}),4500)})(e),s(o)})({id:"error",ns:d.ns,type:e.noStack,feedback:d.feedback})}))})))}})();