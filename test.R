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
  blockListUI("list"),
  hr(),
  actionButton("modal", "show modal"),
  bsutils::offcanvas(
    bsutils::offcanvasButton("show offcanvas"),
    bsutils::offcanvasContent(
      bsutils::offcanvasHeader("Blocks"),
      blockListUI("offcanvaslist")
    )
  )
)

server <- \(input, output, session){
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

  observeEvent(input$modal, {
    showModal(
      modalDialog(
        blockListUI("modalist")
      )
    )

    msel <- block_list_server("modalist")
  })

  osel <- block_list_server("offcanvaslist")
}

shinyApp(ui, server, options = list(port = 3000L))
