import channels from "../../../downloader/channels.json";
import { useEffect, useMemo, useState } from "react";
import { ChannelFilter } from "../../components/ChannelFilter";

export default function ChannelPage({ channels, videos, channelInfo }) {
  return (
    <div className="channelPageWrapper">
      <ChannelFilter channels={channels} />
      <div className="channelPage">
        <img className="channelPage__banner" src={channelInfo.authorBanners} />
        <div className="channelPage__inner">
          <a
            className="channelPage__userTitle"
            href={channelInfo.authorUrl}
            target="_blank"
          >
            {channelInfo.author}
          </a>

          <div className="videos">
            {videos.map((video) => (
              <div className="video">
                <img className="video__thumbnail" src={video.thumbnail} />
                <div className="video__title">{video.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const channel = channels[id];
  const firstVideo = channel[0];

  return {
    props: {
      // TODO: refactor this ugly code
      channels: Object.keys(channels).map((key) => ({
        author: channels[key][0].author,
        channelId: channels[key][0].channelId,
        authorThumbnail: channels[key][0].authorThumbnails,
      })),
      channelInfo: firstVideo,
      videos: channel,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: Object.keys(channels).map((channel) => ({
      params: { id: channel },
    })),
    fallback: false,
  };
}
