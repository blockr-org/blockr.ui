#' Create Block
#' 
#' Module to create a custom block.
#' 
#' @param id ID of module.
#' 
#' @name createBlock
#' 
#' @export
createBlockUI <- function(id){ # nolint
  ns <- shiny::NS(id)

  div(
    dependency("create"),
    class = "blockr-create-block",
    id = ns("create-block"),
    div(
      div(
        class = "d-flex",
        div(
          class = "flex-shrink-1",
          h2("Block list"),
          div(
            id = ns("blocks")
          )
        ),
        div(
          class = "flex-grow-1",
          div(
            class = "d-flex",
            div(
              class = "flex-grow-1",
              tags$input(
                class = "blockr-create-name form-control",
                id = ns("name"),
                placeholder = "Name"
              )
            ),
            div(
              class = "flex-shrink-1",
              selectInput(
                ns("type"),
                "",
                choices = c(
                  "data",
                  "transform",
                  "plot"
                ),
                selectize = FALSE
              )
            ),
            div(
              class = "flex-shrink-1",
              tags$button(
                class = "ms-2 btn btn-secondary",
                id = ns("save"),
                icon("save"),
                "Save"
              ),
              tags$button(
                class = "btn btn-primary",
                id = ns("add"),
                icon("plus"),
                "Field"
              )
            )
          ),
          div(
            class = "blockr-create-fields",
            id = ns("fields")
          ),
          div(
            class = "blockr-create-expression mt-2",
            id = ns("expression"),
            style = "height:10rem"
          )
        )
      )
    )
  )
}

#' @rdname createBlock
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
        send_message <- make_send_message("blockr-create")
          
        send_message(
          "init",
          id = id
        )
      })

      observeEvent(input$newBlock, {
        print(input$newBlock)
      })
    }
  )
}
