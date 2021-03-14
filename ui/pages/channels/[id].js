import channels from "../../../downloader/channels.json";
import { useEffect, useMemo, useState } from "react";

export default function ChannelPage({ videos, channelInfo }) {
  return (
    <div className="channelPage">
      <img className="channelPage__banner" src={channelInfo.authorBanners} />
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
  );
}

export async function getStaticProps({ params }) {
  const id = params.id;
  const channel = channels[id];
  const firstVideo = channel[0];

  return {
    props: {
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
