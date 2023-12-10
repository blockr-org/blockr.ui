install: check
	Rscript -e "devtools::install()"

check: document
	Rscript -e "devtools::check()"

document: bundle
	Rscript -e "devtools::document()"

bundle: 
	Rscript -e "packer::bundle_prod()"

bundle_dev:
	Rscript -e "packer::bundle_dev()"

dev: bundle_dev 
	Rscript test.R

