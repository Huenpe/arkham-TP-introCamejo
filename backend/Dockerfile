FROM node:20  

WORKDIR /app/backend  

COPY package.json package-lock.json ./  
COPY prisma ./prisma  

RUN npm install 

COPY . .  

EXPOSE 3002  

CMD ["node", "src/app.js"]