export const fieldEvents = (): void => {
  $(".blockr-create-field-name").off("keyup");
  $(".blockr-create-field-delete").off("click");

  $(".blockr-create-field-delete").on("click", (e) => {
    $(e.target).closest(".blockr-create-field").remove();
  });

  $(".blockr-create-field-name").on("keyup", (e) => {
    const name: string = String($(e.target).val());

    const $preview = $(e.target)
      .closest(".blockr-create-field")
      .find(".blockr-create-field-preview");

    if (name.length <= 0) {
      $preview.html(
        "<span class='text-danger'>must give the field a name</span>",
      );
      return;
    }

    if (name.includes(" ")) {
      $preview.html(
        "<span class='text-danger'>field name cannot contain spaces</span>",
      );
      return;
    }

    $preview.html(
      `<span class="text-muted">Use <code>.(${name})</code> in the expression below</span>`,
    );
  });
};
