FROM ubuntu:latest

RUN apt-get -y update 
RUN apt-get install -y python3 python3-pip wget

ENV NODE_VERSION 19.6.1

RUN wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash \
    && . ~/.nvm/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm use $NODE_VERSION 

ENV NODE_PATH ~/.nvm/v$NODE_VERSION/lib/node_modules
ENV PATH ~/.nvm/v$NODE_VERSION/bin:$PATH

# https://github.com/joyzoursky/docker-python-chromedriver/blob/master/py-debian/3.10/Dockerfile
# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update
RUN apt-get install -y google-chrome-stable

# set display port to avoid crash
ENV DISPLAY=:99

WORKDIR /.tempbuild

COPY requirements.txt ./
RUN pip3 install -r requirements.txt

EXPOSE 3000

CMD bash
