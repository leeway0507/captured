#!/bin/sh

# 로컬 업데이트 사항을 빌드하여 도커에서 테스트하는 명령문



# cd /Users/yangwoolee/repo/captured/main/frontend
# docker build -t nextjs_dev -f ../../docker/dev/nextjs_dev.Dockerfile .

# cd /Users/yangwoolee/repo/captured/main/backend
# docker build -t fastapi_dev -f ../../docker/dev/fastapi_dev.Dockerfile .

echo "docker-compose -f docker_compose_dev.yml up"

cd /Users/yangwoolee/repo/captured/docker/dev
docker-compose -f docker_compose_dev.yml up