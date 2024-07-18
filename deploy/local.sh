#!/bin/zsh
source ~/.zshrc


DIR="/Users/yangwoolee/repo/captured/main/"
DOCKER_LOCAL="docker-compose -f ./deploy/docker/docker_compose.local.yml up --build"


# Run npm build and Go compile in parallel

npm run build --prefix frontend


cd "$DIR" && eval $DOCKER_LOCAL

echo "Current directory: $current_dir"





if [ $? -eq 0 ]; then
    echo "로컬 내 Dockerfile 빌드 성공"
elif [ $? -eq 127 ]; then
    echo "에러 : Colima 실행 필요"
    exit 1
else
    echo "로컬 내 Dockerfile 빌드 실패"
    exit 1
fi



