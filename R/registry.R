BLOCK_LIST_ID <- "blockList" # nolint

#' Block List Module
#' 
#' Display a list of draggable blocks.
#' 
#' @param id ID of module.
#' @param headers Function to use for headers.
#' @param feedback Whether to notify user of errors, warnings, and more.
#' @param toast_position Position of toast, only used if `feedback` is `TRUE`.
#' @param delay Delay in milliseconds before binding JavaScript.
#' @param max_height Maximum height of block list.
#' @param session Shiny session.
#' 
#' @details The list is server-side rendered.
#' 
#' @return A named `list` containing the following reactives: `error`, `started`, and `dropped`.
#' 
#' @name blockList
#' 
#' @import shiny
#' @import blockr
#' @importFrom purrr map2
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
  ),
  max_height = "100vh"
) {
  stopifnot(!missing(id))
  ns <- NS(id)

  blocks <- get_blocks() |>
    utils::head(10)

  toast_position <- match.arg(toast_position)

  tagList(
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
          class = "form-control form-control-sm",
          placeholder = "search"
        ),
        tags$button(
          id = ns("search"),
          class = "btn btn-primary btn-sm",
          icon("search")
        )
      ),
      div(
        id = ns("scrollable"),
        class = "blockr-registry-list",
        style = sprintf("max-height:%s;overflow-y:scroll;", max_height),
        blockWrapper(blocks, ns)
      ),
      tags$p(class = "blockr-description w-100 m-0 p-0")
    )
  )
}

#' @rdname blockList
#' @export
block_list_server <- function(
  id,
  feedback = TRUE,
  delay = 0L
){
  shiny::moduleServer(
    id,
    \(input, output, session){
      send_message <- make_send_message("block-list")

      observe({
        search <- session$registerDataObj(
          "registry-search",
          list(
            registry = get_blocks()
          ),
          search_registry
        )

        scroll <- session$registerDataObj(
          "registry-scroll",
          list(
            registry = get_blocks()
          ),
          scroll_registry
        )

        send_message(
          "endpoints", 
          id = session$ns(BLOCK_LIST_ID),
          scroll = scroll,
          search = search,
          delay = delay
        )
      })

      observe({
        send_message(
          "init", 
          id = session$ns(BLOCK_LIST_ID),
          feedback = feedback,
          delay = delay
        )
      })

      return(
        list(
          error = reactive(input$error),
          started = reactive(input$started),
          dropped = reactive(input$dropped)
        )
      )
    }
  )
}

#' @rdname blockList
#' @export
block_list_bind <- function(
  session = shiny::getDefaultReactiveDomain(),
  delay = 0L
){
  send_message <- make_send_message("block-list")

  send_message(
    "bind", 
    delay = delay
  )
}

#' Block Wrapper
#' 
#' Creates a UI wrapper for a block.
#' Used to enable draggable.
#' 
#' @param blocks List of blocks to wrap.
#' 
#' @importFrom purrr keep map
#' 
#' @keywords internal
blockWrapper <- function(blocks, ns) { # nolint
  div(
    class = "block-list-wrapper",
    id = ns("scrollable-child"),
    blocks |>
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
    `data-name` = block_name(block),
    `data-description` = block_descr(block),
    `data-icon` = ...block_icon(block),
    draggable = "true",
    class = sprintf("cursor-pointer mb-1 badge add-block bg-%s", block_color(block))
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

scroll_registry <- function(data, req){
  query <- parseQueryString(req$QUERY_STRING)
  min <- as.integer(query$min)
  max <- query$max

  if(!length(max))
    max <- min + 5L

  max <- as.integer(max)

  if(min >= length(data$registry))
    return(
      shiny::httpResponse(
        200L,
        content_type = "application/json",
        content = jsonlite::toJSON(list(), auto_unbox = TRUE)
      )
    )

  if(max > length(data$registry))
    max <- length(data$registry)

  blocks <- data$registry[min:max] |>
    map(\(x){
      list(
        name = block_name(x),
        description = block_descr(x),
        index = block_index(x),
        classes = attr(x, "classes"),
        icon = ...block_icon(x) |> as.character()
      )
    }) |>
    keep(\(x) !is.null(x)) |>
    unname()

  shiny::httpResponse(
    200L,
    content_type = "application/json",
    content = jsonlite::toJSON(blocks, auto_unbox = TRUE, dataframe = "rows", force = TRUE)
  )
}

search_registry <- function(data, req){
  query <- parseQueryString(req$QUERY_STRING)

  blocks <- data$registry |>
    map(\(x){
      name <- block_name(x)
      description <- block_descr(x)

      obj <- list(
        name = name,
        description = description,
        index = block_index(x),
        classes = attr(x, "classes"),
        icon = ...block_icon(x) |> as.character()
      )

      if(grepl(query$query, name))
        return(obj)

      if(grepl(query$query, description))
        return(obj)

      return(NULL)
    }) |>
    keep(\(x) !is.null(x)) |>
    unname()

  shiny::httpResponse(
    200L,
    content_type = "application/json",
    content = jsonlite::toJSON(blocks, auto_unbox = TRUE, dataframe = "rows", force = TRUE)
  )
}

# TODO export block_icon from blockr
...block_icon <- function(x){ # nolint
  class(x) <- attr(x, "classes")
  utils::getFromNamespace("block_icon", "blockr")(x)
}
