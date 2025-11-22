FROM ubuntu:22.04
ENV DEBIAN_FRONTEND=noninteractive

# 1. Installer outils de base
RUN apt-get update && apt-get install -y \
    # Outils de base
    curl git build-essential python3 python3-pip unzip sudo wget net-tools \
    # X11 + VNC
    xvfb fluxbox x11vnc fontconfig \
    # Dépendances Electron / Chromium
    libgtk-3-0 libglib2.0-0 libnotify4 libnss3 libxss1 \
    libasound2 libxtst6 libatk1.0-0 libatk-bridge2.0-0 libcups2 \
    libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 libgbm1 \
    libpango-1.0-0 libpangocairo-1.0-0 libatspi2.0-0 libdrm2 \
    libpixman-1-0 libxfixes3 libxi6 libxcursor1 \
    # Pour WebGL / Chromium
    libxshmfence1 \
    && rm -rf /var/lib/apt/lists/*

# 2. Installer Node.js + npm
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm@10.9.4

# 3. Installer tsx et Yarn
RUN npm install -g tsx@4.20.6 yarn@1.22.22

# 4. Créer un utilisateur non-root
RUN useradd -m -s /bin/bash electronuser
USER electronuser
WORKDIR /home/electronuser/app

# NOTE: On ne fait plus de COPY ici. Le code sera partagé via bind-mount
# Installer noVNC
RUN git clone https://github.com/novnc/noVNC.git /home/electronuser/noVNC \
    && git clone https://github.com/novnc/websockify /home/electronuser/noVNC/utils/websockify

# Exposer ports VNC / noVNC
EXPOSE 5900 6080

# 5. Lancer bash par défaut
CMD ["/bin/bash"]


