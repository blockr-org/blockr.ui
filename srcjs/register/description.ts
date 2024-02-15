const defaultIcon = `<i class="fas fa-cube"></i>`;

export const description = () => {
  $(".add-block").off("mouseenter");

  let timeout: any;
  $(".add-block").on("mouseenter", (e: any) => {
    const $el = $(e.currentTarget);

    $el
      .closest(".blockr-registry")
      .find(".blockr-description")
      .html(
        `<small>${$el.data("icon") || defaultIcon}${$el.data(
          "description",
        )}</small>`,
      );

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $el.closest(".blockr-registry").find(".blockr-description").text("");
    }, 3000);
  });
};
