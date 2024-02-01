devtools::load_all()
library(shiny)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5
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
    id = "stacksArea",
    class = "border border-dark",
    style = "min-height:5rem;"
  ),
  createBlockUI("create")
)

server <- \(input, output, session){
  add <- add_stack_server("add", delay = 1000)

  stacks <- list()
  stacks_servers <- list()
  observeEvent(add$dropped(), {
    stack <- new_stack()
    stacks <<- c(stacks, stack)
    insertUI("#stacksArea", "afterBegin", ui = generate_ui(stack))
    stacks_servers <<- c(stacks_servers, generate_server(stack))
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

  create <- create_block_server("create")
}

shinyApp(ui, server, options = list(port = 3000L))
