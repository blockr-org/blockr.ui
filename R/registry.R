BLOCK_LIST_ID <- "block-list" # nolint

blockListUI <- function( # nolint
  id, 
  orient = c("vertical", "horizontal"),
  headers = shiny::h5
) {
  stopifnot(!missing(id))
  ns <- NS(id)

  orient <- match.arg(orient)

  blocks <- available_blocks()

  div(
    id = ns(BLOCK_LIST_ID),
    sortable_dependency(),
    dependency("register"),
    headers("Data"),
    blockWrapper(blocks$data),
    headers("Transform"),
    blockWrapper(blocks$transform),
    headers("Visualise"),
    blockWrapper(blocks$visualise)
  )
}

block_list_server <- function(id){
  shiny::moduleServer(
    id,
    \(input, output, session){

      send_message <- make_send_message("block-list")
      observe({
        send_message("init", id = session$ns(BLOCK_LIST_ID))
      })

      rvs <- reactiveValues(
        block = list(),
        error = NULL
      )

      resp <- eventReactive(input$block, {
        rvs$block <- input$block
      })

      observeEvent(input$error, {
        rvs$error <- input$error
      })

      return(rvs)
    }
  )
}

blockWrapper <- function(blocks) { # nolint
  div(
    class = "block-list-wrapper",
    lapply(blocks, blockPill)
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
    class = sprintf("mb-1 badge add-block bg-%s", type_to_color(type))
  )
}

#' @export
get_name <- function(obj) UseMethod("get_name") # nolint

#' @export
get_name.block_reg <- function(obj) { # nolint
  obj |>
    gsub("_block$", "", x = _) |>
    gsub("^new_", "", x = _) |>
    gsub("_|\\.", " ", x = _) |>
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
