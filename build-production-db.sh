#!/bin/sh

# Find the PIDs of the SSH tunnel processes
PIDS=($(ps aux | grep '[s]sh -fN' | awk '{print $2}'))

if [ ${#PIDS[@]} -gt 0 ]; then
    echo "SSH tunnel processes found with PIDs: ${PIDS[@]}. Terminating..."
    # Terminate the SSH tunnel processes
    for PID in "${PIDS[@]}"; do
        kill "$PID"
    done
    echo "SSH tunnel processes terminated."
else
    echo "No SSH tunnel process found."
fi


### ssh DB 연결
ssh -fNT -i ~/.ssh/captured.pem -o ServerAliveInterval=60 -o ServerAliveCountMax=60 ubuntu@43.201.98.25 -L 3336:db-captured.cheoqn0aa7xs.ap-northeast-2.rds.amazonaws.com:3306


echo "docker-compose -f docker_compose_dev.yml up"

cd /Users/yangwoolee/repo/captured/docker/dev
docker-compose -f docker_compose_dev.yml up --build


PIDS=($(ps aux | grep '[s]sh -fN' | awk '{print $2}'))

if [ ${#PIDS[@]} -gt 0 ]; then
    echo "SSH tunnel processes found with PIDs: ${PIDS[@]}. Terminating..."
    # Terminate the SSH tunnel processes
    for PID in "${PIDS[@]}"; do
        kill "$PID"
    done
    echo "SSH tunnel processes terminated."
else
    echo "No SSH tunnel process found."
fi
