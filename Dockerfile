FROM cypress/base:12

ENV PORT 8080

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package.json /usr/src/app/
COPY yarn.lock /usr/src/app/

RUN yarn install

# Copying source files
COPY . /usr/src/app

# Building app
EXPOSE 3000

# Running the app
CMD "yarn" "dev"
