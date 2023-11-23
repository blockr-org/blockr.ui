#' Dependencies
#' 
#' Attache dependncies.
#' 
#' @param dep Name of dependency, generally corresponding to a file name.
#' 
#' @importFrom htmltools htmlDependency
#' 
#' @keywords internal
dependency <- function(dep){
  stopifnot(!missing(dep))

  htmlDependency(
    package = "block.ui",
    version = utils::packageVersion("block.ui"),
    name = dep,
    src = "assets",
    script = c(file = sprintf("%s.js", dep))
  )
}

#' @keywords internal
sortable_dependency <- function(){
  htmlwidgets::getDependency("sortable", "sortable")
}
