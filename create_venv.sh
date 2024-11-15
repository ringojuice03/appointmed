#!/bin/bash
# Run this script only on your first clone
# Use git bash terminal to run the script properly
# Download gitbash, then you can use the gitbash terminal in vscode
# You do not need to run this program many times, only once
# In the following sessions after running this script, you only need to
# run the command 'source env/Scripts/activate' (for Windows) in gitbash 
# to activate the virtual environment named 'env'

py -m venv env
echo "Virtual environment 'env' created in the project directory"

if [[ "$OSTYPE" == "linux-gnu"* || "$OSTYPE" == "darwin"* ]]; then
    # For Linux/macOS
    source env/bin/activate
elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # For Windows
    ./env/Scripts/activate.bat
else
    echo "Unsupported OS"
    exit 1
fi

echo "Installing dependencies from requirements.txt"
pip install -r requirements.txt
echo "Dependencies installed from requirements.txt"

echo "env/" >> .gitignore
echo "'env/' directory added to .gitignore"