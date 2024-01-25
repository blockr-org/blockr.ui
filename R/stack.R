#' Add Stack
#' 
#' Create an "add stack" button.
#' 
#' @param id,ns The id of add stack function.
#' @param target Selector of target element where stacks can be dropped.
#' @param toast_position Position of toast, only used if `feedback` is `TRUE`.
#' @param feedback Whether to notify user of errors, warnings, and more.
#' @param delay Delay in milliseconds before binding JavaScript.
#' @param content Content of the draggable item.
#' @param session Shiny session.
#' 
#' @name addStack
#' 
#' @export
addStackUI <- function( # nolint
  id,
  content = shiny::span(
    class = "badge bg-primary fs-5 mx-2",
    shiny::icon("plus"), 
    "Stack"
  ),
  class = "badge bg-primary fs-5 mx-2",
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
      span(
        class = "add-stack cursor-pointer",
        draggable = "true",
        id = ns("addStack"),
        content |>
          as.character() |>
          shiny::HTML()
      )
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

#' @rdname addStack 
#' @export
add_stack_bind <- function(
  ns = "",
  feedback = TRUE,
  session = shiny::getDefaultReactiveDomain(),
  delay = 0L
){
  session$sendCustomMessage(
    "add-stack-init", 
    list(
      feedback = feedback,
      delay = delay,
      ns = ns
    )
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

stackPill <- function(stack, ns){ # nolint
  span(
    class = "add-stack badge bg-primary cursor-pointer fs-5 cursor-pointer",
    draggable = "true",
    id = ns(stack),
    stack
  )
}
