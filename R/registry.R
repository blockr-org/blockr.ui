blockList <- function(id, orient = c("vertical", "horizontal")) { # nolint
  stopifnot(!is.mixing(id))

  orient <- match.arg(orient)

  blocks <- available_blocks()

  div(
    h5("Data"),
    lapply(blocks$data, blockPill),
    h5("Transform"),
    lapply(blocks$transform, blockPill),
    h5("Visualise"),
    lapply(blocks$visualise, blockPill)
  )
}

#' @export
blockPill <- function(obj) UseMethod("blockPill") # nolint

#' @export
blockPill.block_reg <- function( # nolint
  obj
){
  type <- attr(obj, "type")
  name <- get_name(obj)
  p(
    name, 
    `data-fn` = obj, 
    class = sprintf("mb-1 w-100 badge add-block bg-%s", type_to_color(type))
  )
}

#' @export
get_name <- function(obj) UseMethod("get_name") # nolint

#' @export
get_name.block_reg <- function(obj) { # nolint
  obj |>
    gsub("_block$", "", x = _) |>
    gsub("^new_", "", x = _) |>
    gsub("_", " ", x = _) |>
    tolower() |>
    tools::toTitleCase()
}

type_to_color <- function(
  type = c("data", "transform", "visualise")
){
  switch(
    type,
    data = "primary",
    transform = "secondary",
    visualise = "info",
    "dark"
  )
}

available_blocks <- function(){
  data <- c(
    "data_block",
    "demo_data_block",
    "demo_join_block"
  )

  transform <- c(
    "select_block",
    "filter_block",
    "arrange_block",
    "summarize_block",
    "group_by_block",
    "as_factor_block",
    "head_block"
  )

  visualise <- c(
    "plot_block",
    "ggiraph_block"
  )

  list(
    data = lapply(data, build_block, "data"),
    transform = lapply(transform, build_block, "transform"),
    visualise = lapply(visualise, build_block, "visualise")
  )
}

build_block <- function(x, type){
  structure(
    x,
    type = type,
    class = c("block_reg", class(x))
  )
}
