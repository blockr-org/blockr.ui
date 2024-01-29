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
          class = "flex-shrink-1 mx-2",
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
              class = "flex-grow-1 px-1",
              tags$input(
                class = "blockr-create-name form-control mt-2 me-2",
                id = ns("name"),
                placeholder = "Block name"
              )
            ),
            div(
              class = "flex-shrink-1 px-1",
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
              class = "flex-shrink-1 px-1 py-2",
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
      custom_blocks <- reactiveVal(0L)

      observe({
        custom_blocks()
        send_message <- make_send_message("blockr-create")
          
        send_message(
          "init",
          id = id,
          blocks = available_blocks() |>
            lapply(\(block) {
              if(!"blockrui_custom_block" %in% attr(block, "classes"))
                return()

              blk <- block()

              fields <- blk |>
                purrr::map2(names(blk), \(field, name) {
                  list(
                    name = name,
                    type = sprintf("new_%s", class(field)[1])
                  )
                }) |>
                unname()

              list(
                name = attr(block, "name"),
                type = ifelse(inherits(blk, "data_block"), "data", "transform"),
                fields = fields,
                expression = deparse(attr(blk, "expr"))
              )
            }) |>
            purrr::keep(\(block) !is.null(block)) |>
            unname()
        )
      })

      observeEvent(input$newBlock, {
        create_new_block(
          input$newBlock
        )
        custom_blocks(custom_blocks() + 1L)
      })

      return(custom_blocks)
    }
  )
}

create_new_block <- function(block){
  register_block(
    \(...){
      new_block(
        fields = create_fields(block$fields),
        expr = create_expression(block$expression),
        class = create_class(block)
      )
    }, 
    block$name, 
    "Description", 
    create_class(block), 
    input = ifelse(block$type == "data", NA_character_, "data.frame"),
    output = "data.frame"
  )
}

create_class <- function(block){
  inheritance <- sprintf("%s_block", block$type)
  c(
    sprintf("%s_block", block$name),
    "blockrui_custom_block",
    inheritance
  )
}

create_expression <- function(expr_str){
  enquote(expr_str)
}

create_fields <- function(fields){
  fields_new <- fields |>
    lapply(\(field) {
      do.call(field$type, list())
    })

  names(fields_new) <- fields |>
    sapply(\(field) field$name)

  return(fields_new)
}
