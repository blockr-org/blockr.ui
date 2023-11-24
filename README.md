<!-- badges: start -->
<!-- badges: end -->

# blockr.ui

UI components to build dashboards with [blockr](https://github.com/blockr-org/blockr)

## Installation

``` r
# install.packages("remotes")
remotes::install_github("blockr-org/blockr.ui")
```

## Example

``` r
library(shiny)
library(blockr.ui)

ui <- fluidPage(
  theme = bslib::bs_theme(
    version = 5,
    bootswatch = "minty"
  ),
  blockListUI("blockList")
)

server <- \(...){
  sel <- block_list_server("blockList")

  observeEvent(sel$error(), {
    print(sel$error())
  })

  observeEvent(sel$block(), {
    print(sel$block())
  })
}

shinyApp(ui, server, options = list(port = 3000L))
```

