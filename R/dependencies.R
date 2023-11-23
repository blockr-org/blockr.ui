#' Dependencies
#' 
#' @keywords internal
dependency <- function(dep){
  stopifnot(!missing(dep))

  htmltools::htmlDependency(
    package = "block.ui",
    version = utils::packageVersion("block.ui"),
    name = dep,
    src = "assets",
    script = c(file = sprintf("%s.js", dep))
  )
}

sortable_dependency <- function(){
  htmlwidgets::getDependency("sortable", "sortable")
}
