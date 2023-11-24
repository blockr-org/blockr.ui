devtools::load_all()
library(shiny)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5,
    bootswatch = "minty"
  ),
  addStackUI("add",
    tags$a(
      class = "btn btn-primary",
      "add stack"
    )
  ),
  blockListUI("list")
)

server <- \(...){
  add_stack_server(
    "add",
    on_deselect = on_deselect,
    on_select = on_select
  )

  sel <- block_list_server("list")

  observeEvent(sel$error(), {
    print(sel$error())
  })

  observeEvent(sel$block(), {
    print(sel$block())
  })
}

shinyApp(ui, server, options = list(port = 3000L))
