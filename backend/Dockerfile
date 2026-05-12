# Gunakan node versi 18
FROM node:18

# Folder /app akan dimiliki oleh user 'node' (UID 1000)
WORKDIR /app

# Copy package.json dan install
# Kita gunakan --chown=node:node agar izin aksesnya benar
COPY --chown=node:node package*.json ./
RUN npm install

# Copy semua file kode dengan izin akses user node
COPY --chown=node:node . .

# Pindah ke user 'node' sebelum menjalankan aplikasi
USER node

# Ekspos port 7860
EXPOSE 7860

# Jalankan aplikasi
CMD ["node", "index.js"]