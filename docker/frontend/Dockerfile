FROM node:20

WORKDIR /app

COPY frontend/ .

ENV PATH /app/node_modules/.bin:$PATH

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]