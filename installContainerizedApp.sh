#!/bin/bash
set -e  # stop script if any command fails
set -o pipefail

# -------------------------
# 1️⃣ Cloner le projet
# -------------------------
#if [ ! -d "testwe-evaluation" ]; then
#    git clone https://github.com/raphy76/testwe-evaluation.git
#fi
#cd testwe-evaluation

# -------------------------
# 2️⃣ Nettoyer le projet
# -------------------------
rm -f yarn.lock package-lock.json
rm -rf node_modules
rm -rf config/dll release/app/node_modules

# -------------------------
# 3️⃣ Créer le volume Docker
# -------------------------
docker volume create electron_node_modules || true

# -------------------------
# 4️⃣ Build de l'image Docker
# -------------------------
docker build -t testwe-react .

# -------------------------
# 5️⃣ Installer les dépendances (dans Docker root)
# -------------------------
docker run -it --rm \
  -v "$(pwd)":/home/electronuser/app:cached \
  -v electron_node_modules:/home/electronuser/app/node_modules \
  --security-opt seccomp=unconfined \
  --user root \
  testwe-react /bin/bash -c "\
    yarn install && \
    chmod +x start.sh && \
    chown -R electronuser:electronuser /home/electronuser/app/node_modules /home/electronuser/app/config/dll \
  "


