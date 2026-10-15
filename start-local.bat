@echo off
cd /d "%~dp0"
echo Starting the website at http://localhost:8080
echo Keep this window open while using the website. Press Ctrl+C to stop.
python -m http.server 8080
