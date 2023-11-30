import { AnyFunction } from "rstudio-shiny/srcts/types/src/utils/extraTypes";

export const handleSearch = (params: any) => {
  $(`#${params.ns}-search`).on("click", search(params));
  // so it also works on Enter key in query
  $(`#${params.ns}-query`).on("keyup", search(params));
};

const search = (params: any): AnyFunction => {
  return (event: JQuery.Event & { target: HTMLElement }): void => {
    if (event.key && event.key != "Enter") return;
    const { target } = event;

    const queryNode: JQuery = $(`#${params.ns}-query`);
    const query: string = String(queryNode?.val());

    // faster way to reset search
    if (query == "") {
      $(target).closest(".blockr-registry").find(".add-block").show();
      return;
    }

    // toggle blocks based on query match
    $(target)
      .closest(".blockr-registry")
      .find(".add-block")
      .each((_, pill) => {
        if (
          $(pill).data("fn").includes(query) ||
          $(pill).text().includes(query)
        ) {
          $(pill).show();
          return;
        }

        $(pill).hide();
      });
  };
};
