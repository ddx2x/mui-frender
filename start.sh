#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

REPO=
APP=mui-frender
COMMIT_ID=$(git rev-parse --verify HEAD)
VERSION="${VERSION:-"${COMMIT_ID:0:8}"}"

function build() {
  echo "Build"
  docker build -t "${REPO}/${APP}:${VERSION}" --platform linux/amd64 .
  docker push ${REPO}/${APP}:${VERSION}
  echo "End....."
}

function run(){
  docker rm -f mui-form-render && \
  docker run --name mui-form-render --restart=always -itd \
    -p 3003:3003 \
    ${REPO}/${APP}:${VERSION}
}


while true
do
  case "$1" in
  build)
      build
      shift
      ;;
  run)
     run
     shift
     ;;
  -h|--help)
      usage
      ;;
  esac
shift
done
