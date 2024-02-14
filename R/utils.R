get_blocks <- function(){
  available_blocks() |>
    map2(seq_along(available_blocks()), \(block, index){
      attr(block, "index") <- index
      return(block)
    })
}
