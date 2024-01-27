#' Create Block
#' 
#' Module to create a custom block.
#' 
#' @param id ID of module.
#' 
#' @export
createBlockUI <- function(id){ # nolint
  ns <- shiny::NS(id)

  div(
    dependency("create"),
    class = "blockr-create-block",
    id = ns("create-block"),
    div(
      class = "d-flex",
      div(
        class = "flex-grow-1"
      )
    ),
    div(
      class = "blockr-expression",
      id = ns("expression")
    )
  )
}

#' @export
create_block_server <- function(id){
  moduleServer(
    id, 
    function(
      input, 
      output, 
      session
    ){
      observe({
        send_message <- make_send_message("block-create")
          
        send_message(
          "init",
          id = id
        )
      })
    }
  )
}
