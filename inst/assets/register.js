(()=>{"use strict";var t;Sortable,function(t){t[t.noStack=1]="noStack",t[t.noBlockIndex=2]="noBlockIndex",t[t.stackAlreadyHasDataBlock=3]="stackAlreadyHasDataBlock",t[t.stackAlreadyHasPlotBlock=4]="stackAlreadyHasPlotBlock"}(t||(t={}));var e=new Map;e.set(t.noStack,"must drag blocks within a stack"),e.set(t.noBlockIndex,"could not find block index"),e.set(t.stackAlreadyHasDataBlock,"this stack already includes a data block"),e.set(t.stackAlreadyHasPlotBlock,"this stack already includes a plot block");var a,o=new Map;o.set(t.noStack,"no-stack"),o.set(t.noBlockIndex,"no-block-index"),o.set(t.stackAlreadyHasDataBlock,"stack-already-has-data-block"),o.set(t.stackAlreadyHasPlotBlock,"stack-already-has-plot-block"),function(t){t[t.deferred=1]="deferred",t[t.throttled=2]="throttled",t[t.immediate=3]="immediate"}(a||(a={}));var n=new Map;function s(t){var n={ns:t.ns,id:"error",message:{type:o.get(t.type)||"unknown error",message:e.get(t.type)||"unknown error"},priority:a.immediate};console.error("".concat(n.message.message)),function(t){if(t.feedback){var a=$("#".concat(t.ns,"-toast"));a.find(".toast-body").text(r(e.get(t.type))||"Unknown error"),a.show(),setTimeout((function(){a.hide()}),4500)}}(t),c(n)}function c(t){var e=t.id;t.ns&&(e="".concat(t.ns,"-").concat(e));var a=n.get(t.priority)||"deferred";Shiny.setInputValue(e,t.message,{priority:a})}n.set(a.deferred,"deferred"),n.set(a.throttled,"throttle"),n.set(a.immediate,"event");var r=function(t){var e=t.substring(0,4).normalize();return e[0].toUpperCase()+e.substring(1)+t.substring(4)};$((function(){Shiny.addCustomMessageHandler("block-list-init",(function(t){for(var e=document.querySelectorAll("#".concat(t.id," .block-list-wrapper")),a=0;a<e.length;++a)new Sortable(e[a],l(t.ns,t.feedback))}))}));var l=function(e,o){return{draggable:".add-block",onEnd:function(n){var r=n.originalEvent.srcElement,l=$(r).closest(".stack"),d={id:"error",ns:e,type:t.noStack,feedback:o};if(l.length){var i=$(n.item).data("type"),k=[];$(r).closest(".stack").find("[data-block-type]").each((function(t,e){var a=$(e).data("block-type").split(",");k.push.apply(k,a)}));var u,y=l.attr("id").split("-")[1],p=$(r).closest(".block").data("value");return l.find(".block").each((function(t,e){$(e).data("value")==p&&(u=t+1)})),u?k.includes("dataset_block")&&"dataset_block"==i?(d.type=t.stackAlreadyHasDataBlock,void s(d)):k.includes("plot_block")&&"plot_block"==i?(d.type=t.stackAlreadyHasPlotBlock,void s(d)):void c({id:"block",ns:e,message:{stackId:y,blockId:p,blockIndex:u,type:i},priority:a.immediate}):(d.type=t.noBlockIndex,void s(d))}s(d)}}}})();