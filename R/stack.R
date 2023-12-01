#' Add Stack
#' 
#' Create an "add stack" button.
#' 
#' @param id The id of button stack.
#' @param item Item to use as draggable.
#' @param on_select,on_deselect JavaScript to run when 
#'  the user selects or deselects the stack button.
#' 
#' @name addStack
#' 
#' @export
addStackUI <- function( # nolint
  id,
  item
){
  stopifnot(!missing(id))

  ns <- shiny::NS(id)

  div(
    sortable_dependency(),
    dependency("stack"),
    class = "add-stack-wrapper",
    id = ns("addStackWrapper"),
    item |>
      shiny::tagAppendAttributes(
        id = ns("addStack"),
        class = "add-stack"
      )
  )
}

#' @rdname addStack
#' @export
add_stack_server <- function(
  id,
  on_select = NULL,
  on_deselect = NULL
){
  moduleServer(
    id,
    function(input, output, session){
      send_message <- make_send_message("add-stack")

      if(!is.null(on_deselect)){
        observeEvent(input$addStackEnded, {
          eval <- on_deselect()
          send_message("ended", js = eval)
        })
      }

      if(!is.null(on_select)){
        observeEvent(input$addStackStarted, {
          eval <- on_select()
          send_message("started", js = eval)
        })
      }
    }
  )
}

# default on select
on_select <- function(){
  "$('.masonry-row').addClass('bg-danger')"
}

# default on deselect
on_deselect <- function(){
  "$('.masonry-row').removeClass('bg-danger')"
}
