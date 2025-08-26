FROM node:20

WORKDIR /app

COPY backend/ .

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install --frozen-lockfile
RUN yarn build

WORKDIR /app/apps/blog
RUN yarn
RUN yarn build

EXPOSE 1337

CMD ["yarn", "start"]