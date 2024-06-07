#!/bin/sh

STAGING_DOCKER_DIR="/Users/yangwoolee/repo/captured/docker/staging"
DOCKER_LOCAL="docker-compose -f docker_compose_staging_build.yml"
DOCKER_SERVER="sudo docker-compose -f docker_compose_staging_server.yml"

FIBER="/Users/yangwoolee/repo/captured/main/backend-golang"
GO_COMPILE="CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o fiberGo ./main.go"

echo "수동으로 captured-production Instance에 배포 중"

# Attempt to build and push local Docker images

cd "$FIBER" && eval "$GO_COMPILE"

if [ $? -eq 0 ]; then
    echo "fiber 컴파일 성공"
else
    echo "fiber 컴파일 실패"
    exit 1
fi

cd "$STAGING_DOCKER_DIR" &&
$DOCKER_LOCAL build &&
$DOCKER_LOCAL push

if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 및 푸시 성공"
else
    echo "로컬 내 Dockerfile 빌드 및 푸시 실패"
    exit 1
fi

# 과거
# ssh -i ~/.ssh/captured.pem ubuntu@43.201.98.25 "cd captured && \

# 현재
ssh -i ~/.ssh/EC2-captured-shop.pem ubuntu@54.180.152.81 "cd captured && \
sudo docker system prune -f && \
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
