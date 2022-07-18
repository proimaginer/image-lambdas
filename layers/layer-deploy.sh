#!/bin/sh

# 스테이지를 파라미터로 받아 배포 한다.
cd ./modules/nodejs
npm run update
rm -rf ./node_modules/sharp
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux --libc=glibc sharp
cd ../..
sls deploy --stage $1
