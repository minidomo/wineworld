FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get -y install nginx

WORKDIR /.tempbuild
COPY requirements.txt ./requirements.txt

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 80

CMD bash
