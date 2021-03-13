const fs = require("fs");
const ytch = require("yt-channel-info");

const CHANNEL_USER_ID = process.argv[2];

(async () => {
  const sortBy = "newest";
  const response = await ytch.getChannelVideos(CHANNEL_USER_ID, sortBy);
  const channelInfo = await ytch.getChannelInfo(CHANNEL_USER_ID);

  const videos = response.items.map((item) => {
    return {
      channelId: CHANNEL_USER_ID,
      videoId: item.videoId,
      publishedText: item.publishedText,
      thumbnail: item.videoThumbnails[item.videoThumbnails.length - 1].url,
      title: item.title,
      author: channelInfo.author,
      authorUrl: channelInfo.authorUrl,
      authorId: channelInfo.authorId,
      subscriberText: channelInfo.subscriberText,
      description: channelInfo.description,
      authorBanners:
        channelInfo.authorBanners[channelInfo.authorBanners.length - 1].url,
      authorThumbnails:
        channelInfo.authorThumbnails[channelInfo.authorThumbnails.length - 1]
          .url,
    };
  });

  fs.writeFileSync(
    `./metadata/${CHANNEL_USER_ID}.json`,
    JSON.stringify(videos, null, 2)
  );
})();
