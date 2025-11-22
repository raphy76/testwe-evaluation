#!/bin/bash
# Lancer Xvfb
Xvfb :0 -screen 0 1024x768x24 &
sleep 1

# Lancer fluxbox
fluxbox &
sleep 1

# Lancer x11vnc
x11vnc -display :0 -nopw -forever -rfbport 5900 &

# Lancer noVNC
/home/electronuser/noVNC/utils/novnc_proxy --vnc localhost:5900 --listen 6080 &

# Définir DISPLAY pour Electron
export DISPLAY=:0

# Lancer Electron (avec --no-sandbox pour Docker)
yarn start -- --no-sandbox --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage



