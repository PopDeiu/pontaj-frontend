#!/bin/bash
git pull
docker compose down
docker build . -t pontaj-frontend
docker compose up -d