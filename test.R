devtools::load_all()
library(shiny)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5,
    bootswatch = "minty"
  ),
  blockListUI("blockList")
)

server <- \(...){
  sel <- block_list_server("blockList")

  observeEvent(sel$error, {
    print(sel$error)
  })

  observeEvent(sel$block, {
    print(sel$block)
  })
}

shinyApp(ui, server, options = list(port = 3000L))
