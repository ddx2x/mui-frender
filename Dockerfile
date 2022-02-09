# deps
FROM node:16-alpine3.14 as deps

WORKDIR /app

RUN yarn global add lerna

COPY package.json lerna.json ./
COPY packages/form-render/package.json ./packages/form-render/package.json
COPY packages/fr-generator/package.json ./packages/fr-generator/package.json
COPY packages/emalutor/package.json ./packages/emalutor/package.json

RUN lerna bootstrap --force-local

COPY . .
RUN sh ./build.sh

# serve-runner
FROM node:16-alpine3.14 AS serve-runner
RUN npm install -g serve

# runner
FROM serve-runner

WORKDIR /app

COPY --from=deps /app/packages/emalutor ./

EXPOSE 3003

CMD serve -s build -l 3003