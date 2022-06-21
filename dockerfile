# setup
FROM node:16-alpine
RUN node -v
WORKDIR /app
COPY package*.json ./

# env mode
ENV DEBUG=fc:*
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN echo run env: $NODE_ENV
ARG GITHUB_TOKEN
ENV GITHUB_TOKEN=$GITHUB_TOKEN
# RUN echo @fastcampus:registry=https://npm.pkg.github.com/ >> ~/.npmrc
# RUN echo //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN >> ~/.npmrc

# install chromium
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
# RUN apk add --no-cache udev ttf-freefont chromium

# export ports
ENV HOST=0.0.0.0
ENV PORT=7000
EXPOSE 7000

# bootstrap
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production
RUN true
CMD ["npm", "run", "start"]
