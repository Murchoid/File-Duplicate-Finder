FROM node:23-alpine3.20

WORKDIR /usr/src/app/

COPY package.json /usr/src/app
COPY dup-finder /usr/src/app/dup-finder/


RUN npm install

CMD ["sh"]