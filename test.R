devtools::load_all()
library(shiny)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5,
    bootswatch = "minty"
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
  ),
  addStackUI("add"),
  hr(),
  stacksArea(
    class = "bg-success",
    style = "min-height:5rem;"
  )
)

server <- \(input, output, session){
  add <- add_stack_server("add")

  observeEvent(add$dropped(), {
    print(add$dropped())
  })

  observeEvent(add$started(), {
    print(add$started())
  })

  sel <- block_list_server("list")

  observeEvent(sel$error(), {
    print(sel$error())
  })

  observeEvent(sel$dropped(), {
    print(sel$dropped())
  })

  observeEvent(sel$started(), {
    print(sel$started())
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
