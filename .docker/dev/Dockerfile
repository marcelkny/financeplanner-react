FROM node:18-bullseye

RUN set -ex \
    ## update packages and install deps / usefull tools
    && export DEBIAN_FRONTEND=noninteractive \
    && apt-get update -y -q \
    && apt-get upgrade -y -q \
    && apt-get install -y -q \
        sudo \
        curl \
    ## cleanup
    && apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

###
# Add node User and sudo config
###

ARG USERNAME=node
ARG USER_UID=1000
ARG USER_GID=1000

## add user group and user
RUN set -ex \
## node should be created by node js image
##    && groupadd --gid ${USER_GID} ${USERNAME} \
##    && useradd --uid ${USER_UID} --gid ${USER_GID} -m ${USERNAME} \
    && echo ${USERNAME} ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/${USERNAME} \
    && chmod 0440 /etc/sudoers.d/${USERNAME}

## Mountpoint for App Source & Workdir
VOLUME /app
WORKDIR /app

## Port where Sample Application is served f.e. by http-server
EXPOSE "8090"

## switch to node user
USER node

## setup cache locally for reuse
ENV NPM_CACHE "/app/.npm-cache"
RUN set -ex \
    && npm set cache ${NPM_CACHE}

## startup
CMD npm run dev
