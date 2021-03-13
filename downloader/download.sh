#!/bin/bash

# This script is old and unused at this point

regex="\((.*)\)"

afterDate="now-4week"

while read channel; do
  echo "downloading - ${channel}"
  if [[ $channel =~ $regex ]] ; then
    url="${BASH_REMATCH[1]}"
    dir=$(echo $url | sed 's/[\:\/\.]/_/g')
    mkdir -p "./channels/${dir}"
    pushd "./channels/${dir}"
      youtube-dl --dateafter "${afterDate}" --skip-download --write-description --write-info-json "${url}" > out.log &
      pid=$!
      tail -f out.log |
      sed '/not in range/ q'
      kill -9 $pid
    popd
    echo "done processing all channels"
  fi
done <channels.txt