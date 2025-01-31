cd backend

docker compose up -d

npm install 

npx prisma migrate dev

npm run dev
