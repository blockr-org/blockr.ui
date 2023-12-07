#' Add Stack
#' 
#' Create an "add stack" button.
#' 
#' @param id The id of button stack.
#' @param target Selector of target element where stacks can be dropped.
#' 
#' @name addStack
#' 
#' @export
addStackUI <- function( # nolint
  id,
  target
){
  stopifnot(!missing(id), !missing(target))

  ns <- shiny::NS(id)

  div(
    dependency("stack"),
    `data-target` = target,
    class = "add-stack-wrapper",
    available_stacks() |>
      map(stackPill, ns)
  )
}

#' @rdname addStack
#' @export
add_stack_server <- function(
  id
){
  stopifnot(!missing(id))

  moduleServer(
    id,
    function(input, output, session){
      return(
        list(
          started = reactive(input$started),
          dropped = reactive(input$dropped)
        )
      )
    }
  )
}

available_stacks <- function(){
  c(
    "data"
  )
}

stackPill <- function(stack, ns){ # nolint
  span(
    class = "add-stack badge bg-primary cursor-pointer",
    draggable = "true",
    id = ns(stack),
    stack
  )
}
