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
        `<small>${$el.data("icon") || defaultIcon}${$el.data(
          "description",
        )}</small>`,
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
  $(el).addClass("border border-primary p-2 my-1");
};

const downlight = (el: JQuery<HTMLElement>) => {
  $(el).removeClass("border border-primary p-2 my-1");
};
