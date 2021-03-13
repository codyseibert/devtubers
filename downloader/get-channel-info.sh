#!/bin/bash

# This script loops through all the channels inside the channels.txt file and invokes the get-channel-info.js script.
# After running this script, a bunch of updated .json files will be put into the metadata directory.
# These .json file will be combined together later using the aggregate.js script.

channelRegex="\channel\/(.*)\)"
userRegex="\user\/(.*)\)"
while read url; do
  if [[ $url =~ $channelRegex ]] || [[ $url =~ $userRegex ]]  ; then
    id="${BASH_REMATCH[1]}"
    node get-channel-info.js $id
  fi
done <channels.txt
