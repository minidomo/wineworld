FROM node:19.7.0

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

WORKDIR /.tempbuild

COPY package*.json ./
RUN npm ci

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

EXPOSE 3000

CMD bash
