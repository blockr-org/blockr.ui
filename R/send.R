#' Send Factory
#' 
#' Makes a function that sends a custom message to the client.
#' 
#' @param prefix Prefix to use all messages.
#' @param session [shiny::session] to use.
#' 
#' @keywords internal
make_send_message <- function(
  prefix,
  session = shiny::getDefaultReactiveDomain()
){
  stopifnot(!missing(prefix))
  ns <- session$ns(NULL)

  ns_prefix <- ns
  if(length(ns) > 0 && ns != "")
    ns_prefix <- paste0(ns_prefix, "-")

  function(.id, ...){
    .id <- sprintf("%s-%s", prefix, .id)
    
    session$sendCustomMessage(
      .id,
      list(
        ns = ns,
        nsPrefix = ns_prefix,
        ...
      )
    )
  }
}
