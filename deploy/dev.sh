#!/bin/zsh

source ~/.zshrc

cleanup() {
    ports=(3000 3001 3002)

    for port in "${ports[@]}"; do
        pid=$(lsof -i :"$port" | awk 'NR==2 {print $2}')

        # Check if the PID is not empty before using it
        if [ -n "$pid" ]; then
            echo "Found PID $pid for port $port. Killing the process..."
            kill "$pid"
        fi
    done
}

cleanup


cd /Users/yangwoolee/repo/captured/main/frontend
npm run dev &

cd /Users/yangwoolee/repo/captured/main/auth-server
pyenv activate py310 
python main.py &

cd /Users/yangwoolee/repo/captured/main/product-server
go run main.go




