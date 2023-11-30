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
#' @import blockr
#' @importFrom purrr imap
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

  blocks <- available_blocks() |>
    imap(\(block, index){
      attr(block, "index") <- index
      return(block)
    })

  tagList(
    sortable_dependency(),
    dependency("register"),
    toast(
      id = ns("toast"),
      position = toast_position,
      toastHeader(
        tags$strong("Error", class = "me-auto")
      ),
      toastBody()
    ),
    div(
      id = ns(BLOCK_LIST_ID),
      class = "blockr-registry",
      div(
        class = "input-group mb-2",
        tags$input(
          id = ns("query"),
          type = "text",
          class = "form-control",
          placeholder = "search"
        ),
        tags$button(
          id = ns("search"),
          class = "btn btn-primary",
          icon("search")
        )
      ),
      headers("Data"),
      blockWrapper(blocks, "data_block"),
      headers("Transform"),
      blockWrapper(blocks, "transform_block"),
      headers("Visualise"),
      blockWrapper(blocks, "visualise_block")
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
#' @param cls Class to filter
#' 
#' @importFrom purrr keep map
#' 
#' @keywords internal
blockWrapper <- function(blocks, cls) { # nolint
  div(
    class = "block-list-wrapper",
    blocks |>
      blocks_filter(cls) |>
      map(blockPill)
  )
}

blocks_filter <- function(blocks, cls){
  blocks |>
    keep(\(block){
      classes <- attr(block, "classes")
      cls %in% classes
    })
}

#' Get Pill
#' 
#' Get pill for block
#' 
#' @param block Object to get pill for.
blockPill <- function( # nolint
  block
){
  p(
    block_name(block),
    `data-index` = block_index(block),
    `data-bs-toggle` = "popover",
    `data-bs-title` = block_name(block),
    `data-bs-content` = block_descr(block),
    class = sprintf("mb-1 badge add-block bg-%s", block_color(block))
  )
}

block_index <- function(block){
  attr(block, "index")
}

block_color <- function(block) {
  classes <- attr(block, "classes")

  if("data_block" %in% classes)
    return("primary")

  if("transform_block" %in% classes)
    return("secondary")

  return("info")
}

