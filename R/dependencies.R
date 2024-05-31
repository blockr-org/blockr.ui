#' Dependencies
#' 
#' Attache dependncies.
#' 
#' @param dep Name of dependency, generally corresponding to a file name.
#' 
#' @importFrom htmltools htmlDependency
#' 
#' @export
dependency <- function(dep){
  stopifnot(!missing(dep))

  htmlDependency(
    package = "blockr.ui",
    version = utils::packageVersion("blockr.ui"),
    name = dep,
    src = "assets",
    script = sprintf("%s.js", dep)
  )
}
