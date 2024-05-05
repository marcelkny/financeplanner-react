#!/bin/bash

THIS_PATH=${BASH_SOURCE%/*}
cd ${THIS_PATH}
PROJECT_PATH=$PWD/..

GENERATOR_IMAGE=${GENERATOR_IMAGE:-"openapitools/openapi-generator-cli"}
GENERATOR_TAG=${GENERATOR_TAG:-"v7.3.0"}

## cleaning
rm -rf ${PROJECT_PATH}/src/client/board-api/

## SENSORDASH-Board API

## use openapi-generator for model/api generation
docker run --rm -v "${PWD}:/temporary-api" -v "${PROJECT_PATH}/src/client/board-api:/generated-client" ${GENERATOR_IMAGE}:${GENERATOR_TAG} generate \
    -i /temporary-api/board-api.yml \
    --additional-properties=enumPropertyNaming=original \
    --additional-properties=modelPropertyNaming=original \
    --additional-properties=paramNaming=original \
    --additional-properties=supportsES6=true \
    --additional-properties=platform=node \
    -o /generated-client \
    -g typescript-fetch

