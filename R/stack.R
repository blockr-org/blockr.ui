#' Add Stack
#' 
#' Create an "add stack" button.
#' 
#' @param id The id of button stack.
#' @param target Selector of target element where stacks can be dropped.
#' @param toast_position Position of toast, only used if `feedback` is `TRUE`.
#' @param feedback Whether to notify user of errors, warnings, and more.
#' @param delay Delay in milliseconds before binding JavaScript.
#' 
#' @name addStack
#' 
#' @export
addStackUI <- function( # nolint
  id,
  target = ".stack-target",
  toast_position = c(
    "top-right", 
    "top-left", 
    "bottom-right", 
    "bottom-left"
  )
){
  stopifnot(!missing(id))
  toast_position <- match.arg(toast_position)

  ns <- shiny::NS(id)

  tagList(
    dependency("stack"),
    toast(
      id = ns("toast"),
      position = toast_position,
      toastHeader(
        tags$strong("Error", class = "me-auto")
      ),
      toastBody()
    ),
    div(
      `data-target` = target,
      id = ns("addWrapper"),
      class = "add-stack-wrapper",
      available_stacks() |>
        map(stackPill, ns)
    )
  )
}

#' @rdname addStack
#' @export
add_stack_server <- function(
  id,
  feedback = TRUE,
  delay = 0L
){
  stopifnot(!missing(id))

  moduleServer(
    id,
    function(input, output, session){
      send_message <- make_send_message("add-stack")

      observe({
        send_message(
          "init",
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

#' Stack Area
#' 
#' Area where to drop stacks.
#' 
#' @param id The id of stack area.
#' @param class Additional class to add to stack area.
#' @param ... Additional __data__ attributes to add to stack area.
#' @param style Additional style to add to stack area.
#' 
#' @export
stacksArea <- function(id = NULL, class = "", style = "", ...){ # nolint
  args <- list(...) |> purrr::keep(is.character)

  if(length(args) > 0)
    names(args) <- paste0("data-", names(args))

  args <- append(
    args,
    list(
      id = id,
      style = style,
      class = paste("stack-target", class) |> trimws()
    )
  )

  do.call(
    div,
    args
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
