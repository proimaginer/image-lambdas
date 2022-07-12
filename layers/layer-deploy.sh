#!/bin/sh

# 스테이지를 파라미터로 받아 배포 한다.
cd ./modules/nodejs
npm run update
cd ../..
npm run deploy:$1
