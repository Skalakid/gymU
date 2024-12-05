#!/bin/bash

### CREATE TEMPORARY DIRECTORY ###
mkdir generated
echo $0
pwd
ls -lsa $(pwd)/scripts/
### BUILD MODULES ####
bash ./scripts/build.node.sh
bash ./scripts/build.python.sh

### COMMON DIRS ###
PROTO_DIR_ANALIZE=../analyze/src/proto
PROTO_DIR_API=../api/src/proto

### CLEANUP OLD DIRECTORIES ###
if ! command -v sudo 2>&1 >/dev/null
then
    rm -rf $PROTO_DIR_API
    rm -rf $PROTO_DIR_ANALIZE
else
    sudo rm -rf $PROTO_DIR_API
    sudo rm -rf $PROTO_DIR_ANALIZE
fi

### CREATE DIRECTORIES ###
mkdir $PROTO_DIR_ANALIZE
mkdir $PROTO_DIR_API

### MOVE GENERATED FILES TO PROPER SERVICES ###
mv ./generated/python/* $PROTO_DIR_ANALIZE
mv ./generated/node/* $PROTO_DIR_API

### CLEANUP ###
rm -rf ./generated
