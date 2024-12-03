#!/bin/bash

### CREATE TEMPORARY DIRECTORY ###
mkdir generated

### BUILD MODULES ####
./scripts/build.node.sh
./scripts/build.python.sh

### COMMON DIRS ###
PROTO_DIR_ANALIZE=../analyze/src/proto
PROTO_DIR_API=../api/src/proto

### CLEANUP OLD DIRECTORIES ###
rm -rf $PROTO_DIR_API
rm -rf $PROTO_DIR_ANALIZE

### CREATE DIRECTORIES ###
mkdir $PROTO_DIR_ANALIZE
mkdir $PROTO_DIR_API

### MOVE GENERATED FILES TO PROPER SERVICES ###
mv ./generated/python/* $PROTO_DIR_ANALIZE
mv ./generated/node/* $PROTO_DIR_API

### CLEANUP ###
rm -rf ./generated
