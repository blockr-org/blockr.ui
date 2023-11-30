#' Toast
#' 
#' Toast notifications.
#' 
#' @param ... Content, generally [toastHeader()], [toastBody()].
#' @param class Any additional classes.
#' @param position Position of the toast.
#' 
#' @export
toast <- function(
  ...,
  class = "",
  position = c(
    "top-right", 
    "top-left", 
    "bottom-right", 
    "bottom-left"
  )
) {
  style <- get_position(position)

  div(
    class = sprintf("position-fixed %s", style),
    style = "z-index:999",
    div(
      class = sprintf("toast %s", class),
      role = "alert",
      `aria-live` = "assertive",
      `aria-atomic` = "true",
      ...
    )
  )
}

#' Toast Content
#' 
#' Content of the toast to place within [toast()].
#' 
#' @param ... Content.
#' @param class Any additional class.
#' 
#' @name toastContent
#' 
#' @export 
toastHeader <- \( # nolint
  ...,
  class = ""
) {
  div(
    class = sprintf("toast-header %s", class),
    ...,
    tags$button(
      type = "button",
      class = "btn-close",
      `data-bs-dismiss` = "toast",
      `aria-label` = "Close"
    )
  )
}

#' @rdname toastContent
#' @export 
toastBody <- \( # nolint
  ...,
  class = ""
) {
  div(
    class = sprintf("toast-body %s", class),
    ...
  )
}

get_position <- \(
  position = c(
    "top-right", 
    "top-left", 
    "bottom-right", 
    "bottom-left"
  )
) {
  position <- match.arg(position)

  if(position == "top-right")
    return("top-0 end-0")

  if(position == "top-left")
    return("top-0 start-0")

  if(position == "bottom-right")
    return("bottom-0 end-0")
  
  "bottom-0 start-0"
}
