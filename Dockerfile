FROM node:18 as build
WORKDIR /app
#
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
# Environment variables are set in docker-compose.yml
RUN npx prisma generate
RUN npm run build
WORKDIR /app/dist
EXPOSE 4000
CMD ["npm","run", "start"]