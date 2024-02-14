import { renderPills } from "./render";

export const unbindScroll = (params: any) => {
  $(`#${params.ns}-scrollable`).off("scroll");
};

export const bindScroll = (params: any) => {
  unbindScroll(params);

  $(`#${params.ns}-scrollable`).on("scroll", (e) => {
    const childHeight = $(`#${params.ns}-scrollable-child`).height();

    const scrollableHeight = $(`#${params.ns}-scrollable`).height();
    const scrollTop = $(e.target).scrollTop();

    if (childHeight - scrollableHeight - scrollTop > 10) {
      return;
    }

    const n = $(`#${params.ns}-scrollable`).find(".add-block").length;

    fetch(`${params.scroll}&min=${n}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.length) return;

        renderPills(params, data);
      });
  });
};
