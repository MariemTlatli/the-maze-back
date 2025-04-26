FROM node:18 as build
WORKDIR /app
#
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
COPY .env .env
RUN npx prisma generate
RUN npm run build
WORKDIR /app/dist
EXPOSE 4000
CMD ["npm","run", "start"]