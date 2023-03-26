FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get -y install nginx
RUN apt-get install -y libmysqlclient-dev

COPY . usr/src/backend
COPY requirements.txt usr/src/backend/requirements.txt

WORKDIR /usr/src/backend

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

EXPOSE 80

CMD ["gunicorn", "-b", "0.0.0.0:4000", "app:app"]