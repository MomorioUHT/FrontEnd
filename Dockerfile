FROM node:21
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV REACT_APP_API_ENDPOINT=http://lab.skytalemc.com:8000
RUN npm run build
RUN npm install -g serve
CMD ["serve","-s","build"]