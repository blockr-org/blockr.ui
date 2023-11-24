BLOCK_LIST_ID <- "block-list" # nolint

#' Block List Module
#' 
#' @param id ID of module.
#' @param headers Function to use for headers.
#' @param feedback Whether to notify user of errors, warnings, and more.
#' @param toast_position Position of toast, only used if `feeedback` is `TRUE`.
#' 
#' @return [shiny::reactiveValues] with `block` to add where, .
#'  as well as `error` to display.
#' 
#' @name blockList
#' 
#' @import shiny
#' 
#' @export
blockListUI <- function( # nolint
  id, 
  headers = shiny::h5,
  toast_position = c(
    "top-right", 
    "top-left", 
    "bottom-right", 
    "bottom-left"
  )
) {
  stopifnot(!missing(id))
  ns <- NS(id)

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
    blockWrapper(blocks$visualise),
    toast(
      id = ns("toast"),
      position = toast_position,
      toastHeader(
        tags$strong("Error", class = "me-auto")
      ),
      toastBody()
    )
  )
}

#' @rdname blockList
#' @export
block_list_server <- function(
  id,
  feedback = TRUE
){
  shiny::moduleServer(
    id,
    \(input, output, session){
      send_message <- make_send_message("block-list")

      observe({
        send_message(
          "init", 
          id = session$ns(BLOCK_LIST_ID),
          feedback = feedback
        )
      })

      return(
        list(
          error = reactive(input$error),
          block = reactive(input$block)
        )
      )
    }
  )
}

#' Block Wrapper
#' 
#' Creates a UI wrapper for a block.
#' Used to enable sortable.
#' 
#' @param blocks List of blocks to wrap.
#' 
#' @keywords internal
blockWrapper <- function(blocks) { # nolint
  div(
    class = "block-list-wrapper",
    lapply(blocks, blockPill)
  )
}

#' Get Pill
#' 
#' Get pill for block
#' 
#' @param obj Object to get pill for.
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

#' Get Name
#' 
#' Get name of block
#' 
#' @param obj Object to get name of.
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

#' Construct Block
#' 
#' Construct block object.
#' 
#' @param x Object to construct block from.
#' @param type Type of block.
#' 
#' @keywords internal
build_block <- function(x, type){
  structure(
    x,
    type = type,
    class = c("block_reg", class(x))
  )
}
