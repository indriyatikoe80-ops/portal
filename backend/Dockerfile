FROM node:18

# Set folder kerja
WORKDIR /app

# Copy package.json dan install dependencies
COPY --chown=node:node package*.json ./
RUN npm install

# Copy seluruh file backend (termasuk folder routes)
COPY --chown=node:node . .

# Gunakan user 'node' bawaan (UID 1000) agar diizinkan Hugging Face
USER node

# Expose port 7860
EXPOSE 7860

CMD ["node", "index.js"]