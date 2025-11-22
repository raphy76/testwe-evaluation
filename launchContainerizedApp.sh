# -------------------------
# 6️⃣ Lancer l'application Electron avec noVNC
# -------------------------
docker run -it -p 6080:6080 --rm \
  -v "$(pwd)":/home/electronuser/app:cached \
  -v electron_node_modules:/home/electronuser/app/node_modules \
  --security-opt seccomp=unconfined \
  testwe-react /bin/bash -c "./start.sh"

# -------------------------
# 7️⃣ Accès
# -------------------------
#echo "accéder via : http://localhost:6080/vnc.html"
#Si 'lancé depuis un terminal local, accéder via : http://localhost:6080/vnc.html" quand vous êtes sur la page, cliquez sur le bouton connect
#Si lancé depuis un terminal sur https://github.com/codespaces, ajouter un port 6080, puis codespaces vous donnera un lien.
#Ouvrir ce lien sur votre navigateur puis cliquer sur vnc.html (ou ajouter directement /vnc.html dans la barre de navigation). Quand vous êtes sur la page, cliquez sur le bouton connect
