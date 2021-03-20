import channels from "../../data/channels.json";
import { useEffect, useMemo, useState } from "react";
import { ChannelFilter } from "../../components/ChannelFilter";
import { WatchPanel } from "../../components/WatchPanel";

export default function ChannelPage({ channels, videos, channelInfo }) {
  const [history, setHistory] = useState([]);
  const [isWatchPanelOpened, setIsWatchPanelOpened] = useState(false);

  const onClose = () => {
    setIsWatchPanelOpened(false);
  };

  const addToHistory = (video) => {
    setIsWatchPanelOpened(true);
    setHistory([video, ...history]);
  };

  return (
    <div className="channelPageWrapper">
      <ChannelFilter channels={channels} />
      {isWatchPanelOpened && (
        <WatchPanel limit={10} onClose={onClose} history={history} />
      )}
      <div className="channelPage">
        <img className="channelPage__banner" src={channelInfo.authorBanners} />
        <div className="channelPage__inner">
          <div className="channelPage_subNavigation">
            <img src={channelInfo.authorThumbnails} />
            <a
              className="channelPage__userTitle"
              href={channelInfo.authorUrl}
              target="_blank"
            >
              {channelInfo.author}
            </a>
          </div>

          <div className="videos">
            {videos.map((video) => (
              <div onClick={() => addToHistory(video)} className="video">
                <img className="video__thumbnail" src={video.thumbnail} />
                <div className="video__title">
                  <a onClick={(e) => e.preventDefault()}>{video.title}</a>
                </div>
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
