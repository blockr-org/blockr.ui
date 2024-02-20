#' @importFrom purrr imap
get_blocks <- function(){
  available_blocks() |>
    imap(\(block, index){
      attr(block, "index") <- index
      block
    }) |>
    sort_blocks()
}

sort_blocks <- \(blocks){
  blocks[order(sapply(blocks, sorter), na.last = FALSE)]
}

sorter <- function(block){
  cl <- attr(block, "classes")
  
  if("data_block" %in% cl)
    return(1)

  if("transform_block" %in% cl)
    return(2)

  if("plot_block" %in% cl)
    return(3)

  return(4)
}
