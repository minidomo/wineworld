FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim
RUN apt-get install -y libmysqlclient-dev

WORKDIR /usr/backend
COPY src ./src
COPY requirements.txt ./
COPY .env ./

RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

WORKDIR /usr/backend/src

CMD ["gunicorn", "-b", "0.0.0.0:4000", "app:app"]