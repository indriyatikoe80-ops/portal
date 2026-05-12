# Gunakan node versi 18
FROM node:18

# Buat user baru 'user' dengan ID 1000 sesuai protokol Hugging Face
RUN useradd -m -u 1000 user
USER user
ENV PATH="/home/user/.local/bin:$PATH"

# Set direktori kerja
WORKDIR /app

# Copy package.json dan install
COPY --chown=user package*.json ./
RUN npm install

# Copy semua file kode
COPY --chown=user . .

# Ekspos port 7860
EXPOSE 7860

# Jalankan aplikasi
CMD ["npm", "start"]