blocks <- function() {
  div(
    h5("Data"),
    div(
      class = "block-wrapper",
      blockPill(
        "Data",
        icon("table"),
        class = "data_block",
        type = "dataset_block",
        color = "secondary"
      ),
      blockPill(
        "CDISC",
        icon("table"),
        class = "cdisc_block",
        type = "demo_data_block",
        color = "secondary"
      ),
      blockPill(
        "Join",
        icon("object-ungroup"),
        class = "data_block",
        type = "demo_join_block",
        color = "secondary"
      )
    ),
    h5("Transform"),
    div(
      class = "block-wrapper",
      blockPill(
        "Select",
        icon("hand-pointer"),
        class = "transform_block",
        color = "info"
      ),
      blockPill(
        "Filter",
        icon("filter"),
        class = "transform_block",
        color = "info"
      ),
      blockPill(
        "Arrange",
        icon("sort"),
        class = "demo_data_block",
        color = "info"
      ),
      blockPill(
        "Group by",
        icon("object-group"),
        class = "transform_block",
        type = "group_by_block",
        color = "info"
      ),
      blockPill(
        "Summarize",
        icon("layer-group"),
        class = "transform_block",
        color = "info"
      ),
      blockPill(
        "Factor",
        icon("boxes"),
        class = "transform_block",
        type = "as_factor_block",
        color = "info"
      ),
      blockPill(
        "Top",
        icon("bars"),
        class = "transform_block",
        type = "head_block",
        color = "info"
      )
    ),
    h5("Visualise"),
    div(
      class = "block-wrapper",
      blockPill(
        "Plot",
        icon("chart-bar"),
        class = "output",
        color = "success",
        type = "plot_block"
      ),
      blockPill(
        "Interactive Plot",
        icon("chart-bar"),
        class = "output",
        color = "success",
        type = "ggiraph_block"
      )
    )
  )
}

blockPill <- function( # nolint
  title, 
  ..., 
  class, 
  type = paste0(tolower(title), "_block"), 
  color = "primary"
){
  p(
    title, 
    ..., 
    `data-class` = class, 
    `data-type` = type, 
    class = sprintf("mb-1 w-100 badge add-block bg-%s", color)
  )
}
