#!/bin/bash
# Script to set backend .env DB config for Docker Compose
set -e
ENV_FILE="$(dirname "$0")/../hris-backend/.env"


# Ambil kredensial dari .docker/database/.env.db
DB_USER=$(grep POSTGRES_USER .docker/database/.env.db | cut -d '=' -f2)
DB_PASS=$(grep POSTGRES_PASSWORD .docker/database/.env.db | cut -d '=' -f2)
DB_NAME=$(grep POSTGRES_DB .docker/database/.env.db | cut -d '=' -f2)

sed -i \
  -e 's/^DB_HOST=.*/DB_HOST=postgres/' \
  -e 's/^DB_PORT=.*/DB_PORT=5432/' \
  -e "s/^DB_DATABASE=.*/DB_DATABASE=$DB_NAME/" \
  -e "s/^DB_USERNAME=.*/DB_USERNAME=$DB_USER/" \
  -e "s/^DB_PASSWORD=.*/DB_PASSWORD=$DB_PASS/" \
  "$ENV_FILE"

echo "Backend .env DB config updated for Docker!"
