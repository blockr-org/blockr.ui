const defaultIcon = `<i class="fas fa-cube"></i>`;

export const description = () => {
  $(".add-block").off("mouseenter");
  $(".add-block").off("mouseleave");

  let timeoutLeave: any;
  $(".add-block").on("mouseenter", (e: any) => {
    clearTimeout(timeoutLeave);
    const $el = $(e.currentTarget);

    $el
      .closest(".blockr-registry")
      .find(".blockr-description")
      .html(
        `<p class="p-0">
        ${$el.data("icon") || defaultIcon}
        <strong>${$el.data("name") || ""}</strong><br/>
        <small>${$el.data("description") || ""}</small></p>`,
      );

    highlight($el.closest(".blockr-registry").find(".blockr-description"));
  });

  $(".add-block").on("mouseleave", (e) => {
    const el = $(e.currentTarget)
      .closest(".blockr-registry")
      .find(".blockr-description");
    clearTimeout(timeoutLeave);

    timeoutLeave = setTimeout(() => {
      downlight(el);
      $(el).text("");
    }, 250);
  });
};

const highlight = (el: JQuery<HTMLElement>) => {
  $(el).addClass("rounded border border-primary p-1 my-1");
};

const downlight = (el: JQuery<HTMLElement>) => {
  $(el).removeClass("rounded border border-primary p-1 my-1");
};
