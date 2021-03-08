FROM node:14

RUN mkdir -p /usr/src/nuxt-frontend
WORKDIR /usr/src/nuxt-frontend
COPY . .

ENV NUXT_ENV_PROXY_URL=https://localhost:8081
# ENV NUXT_ENV_APP_INSIGHT_KEY=

RUN npm install --production && npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
