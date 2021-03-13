const path = require("path");
const fs = require("fs");

let videos = [];

function fromDir(startPath, filter) {
  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  var files = fs.readdirSync(startPath);
  for (var i = 0; i < files.length; i++) {
    var filename = path.join(startPath, files[i]);
    var stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter);
    } else if (filename.indexOf(filter) >= 0) {
      const f = fs.readFileSync(filename);
      videos = [...videos, ...JSON.parse(f)];
    }
  }
}

fromDir("./metadata", ".json");

const channels = {};

for (let video of videos) {
  const { channelId } = video;
  if (!channels[channelId]) {
    channels[channelId] = [];
  }
  channels[channelId].push(video);
}

fs.writeFileSync("channels.json", JSON.stringify(channels, null, 2));
