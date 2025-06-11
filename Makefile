.PHONY: install-all

install-all:
	@echo "Installing backend dependencies..."
	@cd hris-backend && composer install
	@echo "Installing frontend dependencies..."
	@cd hris-frontend && npm install

install: install-all