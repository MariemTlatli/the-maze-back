FROM node:18 as build
WORKDIR /app
#
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
COPY .env.dev .env
RUN npx prisma generate
RUN npx prisma db push --force-reset
RUN npx prisma db seed
RUN npm run build
WORKDIR /app/dist
EXPOSE 80
CMD ["npm","run", "start"]