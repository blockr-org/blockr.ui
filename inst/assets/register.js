(()=>{"use strict";const e=()=>{let e;$(".add-block").off("mouseenter"),$(".add-block").on("mouseenter",(t=>{const n=$(t.currentTarget);n.closest(".blockr-registry").find(".blockr-description").html(`<small>${n.data("icon")||'<i class="fas fa-cube"></i>'}${n.data("description")}</small>`),clearTimeout(e),e=setTimeout((()=>{n.closest(".blockr-registry").find(".blockr-description").text("")}),3e3)}))};var t;!function(e){e[e.noStack=1]="noStack",e[e.noBlockIndex=2]="noBlockIndex",e[e.stackAlreadyHasDataBlock=3]="stackAlreadyHasDataBlock",e[e.stackAlreadyHasPlotBlock=4]="stackAlreadyHasPlotBlock",e[e.noStackArea=5]="noStackArea"}(t||(t={}));const n=new Map;n.set(t.noStack,"must drag blocks within a stack"),n.set(t.noStackArea,"cannot place stack here"),n.set(t.noBlockIndex,"could not find block index"),n.set(t.stackAlreadyHasDataBlock,"this stack already includes a data block"),n.set(t.stackAlreadyHasPlotBlock,"this stack already includes a plot block");const a=new Map;var s;a.set(t.noStack,"no-stack"),a.set(t.noBlockIndex,"no-block-index"),a.set(t.stackAlreadyHasDataBlock,"stack-already-has-data-block"),a.set(t.stackAlreadyHasPlotBlock,"stack-already-has-plot-block"),function(e){e[e.deferred=1]="deferred",e[e.throttled=2]="throttled",e[e.immediate=3]="immediate"}(s||(s={}));const o=new Map;o.set(s.deferred,"deferred"),o.set(s.throttled,"throttle"),o.set(s.immediate,"event");const r=e=>{let t=e.id;e.ns&&(t=`${e.ns}-${t}`);const n=o.get(e.priority)||"deferred";Shiny.setInputValue(t,e.message,{priority:n})},l=e=>{const t=e.substring(0,4).normalize();return t[0].toUpperCase()+t.substring(1)+e.substring(4)};let c="",d=0,i="",k=!1;const u=e=>{const t=$(e).closest(".block"),n=t.data("value");let a=0;return t.closest(".stack").find(".block").each(((e,t)=>{$(t).data("value")==n&&(a=e+1)})),a},h=()=>{$(".stack").off("dragover dragenter drop dragdrop"),$(".stack").on("dragover",(e=>{e.preventDefault()})),$(".stack").on("dragenter",(e=>{e.preventDefault()})),$(".stack").on("drop dragdrop",(e=>{k=!0,d<0||(r({id:"dropped",ns:c,message:{type:i,index:d,position:u(e.target),target:$(e.target).closest(".stack").attr("id")},priority:s.immediate}),d=-1)}))},p=e=>{$(`#${e.id} .block-list-wrapper`).each(((t,n)=>{g(n,e)}))},g=(e,o)=>{h(),$(e).find(".add-block").each(((e,u)=>{$(u).hasClass("sorted")||($(u).addClass("sorted"),$(u).on("dragstart",(e=>{var t;i=$(e.target).data("type"),d=$(e.target).data("index"),c=(e=>{const t=null==e?void 0:e.split("-");return null==t?void 0:t.slice(0,t.length-1).join("-")})($(e.target).closest(".blockr-registry").attr("id")),e.originalEvent.dataTransfer.setData("text/plain",null===(t=e.target)||void 0===t?void 0:t.id)})),$(u).on("dragover",(e=>{k=!1,e.preventDefault()})),$(u).on("dragenter",(e=>{r({id:"started",ns:o.ns,message:{type:i,index:d},priority:s.immediate}),e.preventDefault()})),$(u).on("dragend",(()=>{k||(e=>{(e=>{if(!e.feedback)return;const t=$(`#${e.ns}-toast`);t.find(".toast-body").text(l(n.get(e.type))||"Unknown error"),t.show(),setTimeout((()=>{t.hide()}),4500)})(e);const t={ns:e.ns,id:"error",message:{type:a.get(e.type)||"unknown error",message:n.get(e.type)||"unknown error"},priority:s.immediate};r(t),console.error(`${t.message.message}`)})({id:"error",ns:o.ns,type:t.noStack,feedback:o.feedback})})))}))},f=(t,n)=>{const a=n.map((e=>{return`<p class="cursor-pointer mb-1 badge add-block bg-${b(t=e)} me-1"\n    data-index="${t.index}"\n    data-icon='${t.icon}'\n    data-name="${t.name}"\n    data-description="${t.description}"\n    draggable="true">\n    ${t.name}\n  </p>`;var t})).join("");$(`#${t.ns}-scrollable-child`).append(a),p(t),e(),w(t)},b=e=>e.classes.includes("data_block")?"primary":e.classes.includes("transform_block")?"secondary":"info";var m=function(e,t,n,a){return new(n||(n=Promise))((function(s,o){function r(e){try{c(a.next(e))}catch(e){o(e)}}function l(e){try{c(a.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,l)}c((a=a.apply(e,t||[])).next())}))};const y=e=>{$(`#${e.ns}-scrollable`).off("scroll")},v=e=>{x(e),y(e),$(`#${e.ns}-scrollable`).on("scroll",(t=>{$(`#${e.ns}-scrollable-child`).height()-$(`#${e.ns}-scrollable`).height()-$(t.target).scrollTop()>10||function(e){m(this,void 0,void 0,(function*(){const t=$(`#${e.ns}-scrollable`).find(".add-block").length;return fetch(`${e.scroll}&min=${t}`).then((e=>e.json())).then((t=>{t.length&&f(e,t)}))}))}(e)}))};function x(e){return m(this,void 0,void 0,(function*(){const t=$(`#${e.ns}-scrollable`).find(".add-block").length;return fetch(`${e.scroll}&min=${t}`).then((e=>e.json())).then((t=>{t.length&&(f(e,t),$(`#${e.ns}-scrollable-child`).height()<=$(`#${e.ns}-scrollable`).height()&&x(e))}))}))}const w=e=>{$(`#${e.ns}-search`).off("click"),$(`#${e.ns}-query`).off("keyup"),$(`#${e.ns}-search`).on("click",S(e)),$(`#${e.ns}-query`).on("keyup",S(e))},S=e=>t=>{if(t.key&&"Enter"!=t.key)return;const{target:n}=t,a=$(`#${e.ns}-query`),s=String(null==a?void 0:a.val());$(n).closest(".blockr-registry").find(".block-list-wrapper").html(""),""!=s?fetch(`${e.search}&query=${encodeURIComponent(s)}`).then((e=>e.json())).then((t=>{f(e,t),y(e)})):fetch(`${e.scroll}&min=1&max=10`).then((e=>e.json())).then((t=>{f(e,t),v(e)}))};$((()=>{Shiny.addCustomMessageHandler("block-list-init",(t=>{setTimeout((()=>{p(t),e()}),t.delay)})),Shiny.addCustomMessageHandler("block-list-bind",(t=>{setTimeout((()=>{h(),e()}),t.delay)})),Shiny.addCustomMessageHandler("block-list-endpoints",(e=>{setTimeout((()=>{w(e),v(e)}),e.delay)}))}))})();