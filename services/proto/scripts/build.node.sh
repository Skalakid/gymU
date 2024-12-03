#!/bin/bash

mkdir ./generated/node
cp ./src/* ./generated/node/

### GENERATE PROTO TYPES ###
./../../node_modules/.bin/proto-loader-gen-types \
    --longs=String \
    --enums=String \
    --defaults \
    --oneofs \
    --grpcLib=@grpc/grpc-js \
    --outDir=generated/node/ \
    generated/node/*.proto

### FLATTEN DIRECTORY ###
mv ./generated/node/gymu/* ./generated/node/.
rm -rf ./generated/node/gymu/