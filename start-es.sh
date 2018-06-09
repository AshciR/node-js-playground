#!/bin/bash

if [[ $(docker ps -q) ]]; then
    echo "found running containers"
    echo "killing running containers"
    docker kill $(docker ps -q)
    echo "removing all containers"
    docker rm $(docker ps -a -q)
    echo "starting elasticsearch"
    docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.2.4
else
    echo "no containers were running"
    echo "starting elasticsearch"
    docker run -d -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:6.2.4
fi
