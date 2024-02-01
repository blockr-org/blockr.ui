<!-- badges: start -->
<!-- badges: end -->

# blockr.ui

UI components to build dashboards with [blockr](https://github.com/blockr-org/blockr)

## Installation

``` r
# install.packages("remotes")
remotes::install_github("blockr-org/blockr.ui")
```

## Examples

### Add Stack

``` r
library(shiny)
library(blockr.ui)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5
  ),
  addStackUI("add"),
  stacksArea(
    id = "stacksArea",
    class = "border border-dark",
    style = "min-height:5rem;"
  )
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
}

shinyApp(ui, server, options = list(port = 3000L))
```

