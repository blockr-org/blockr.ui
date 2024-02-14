export const description = () => {
  $(".add-block").off("mouseenter");

  let timeout: any;
  $(".add-block").on("mouseenter", (e: any) => {
    const $el = $(e.currentTarget);

    $el
      .closest(".blockr-registry")
      .find(".blockr-description")
      .html(
        `<small><i class='fas fa-info text-info px-2'></i>${$el.data(
          "description",
        )}</small>`,
      );

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      $el.closest(".blockr-registry").find(".blockr-description").text("");
    }, 3000);
  });
};
