#!/bin/sh

STAGING_DOCKER_DIR="/Users/yangwoolee/repo/captured/docker/staging"
DOCKER_LOCAL="docker-compose -f docker_compose_staging_build.yml"
DOCKER_SERVER="docker-compose -f docker_compose_staging_server.yml"

echo "수동으로 captured-production Instance에 배포 중"

# Attempt to build and push local Docker images
cd "$STAGING_DOCKER_DIR" &&
$DOCKER_LOCAL build &&
$DOCKER_LOCAL push

if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 및 푸시 성공"
else
    echo "로컬 내 Dockerfile 빌드 및 푸시 실패"
    exit 1
fi

ssh -i ~/.ssh/captured.pem ubuntu@52.78.75.104 "cd captured && \
docker system prune -f && \
$DOCKER_SERVER down && \
$DOCKER_SERVER pull && \
$DOCKER_SERVER up -d
"

if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 및 원격 배포가 성공적으로 완료되었습니다."
else
    echo "로컬 내 Dockerfile 빌드 및 원격 배포 실패"
    exit 1
fi
