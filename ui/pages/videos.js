import channels from "../data/channels.json";
import { useEffect, useMemo, useState } from "react";
import { WatchPanel } from "../components/WatchPanel";
import { VideoFilter } from "../components/VideoFilter";

export default function VideosPage({ videos }) {
  const [history, setHistory] = useState([]);
  const [isWatchPanelOpened, setIsWatchPanelOpened] = useState(false);
  const [search, setSearch] = useState("");

  const onClose = () => {
    setIsWatchPanelOpened(false);
  };

  const addToHistory = (video) => {
    setIsWatchPanelOpened(true);
    setHistory([video, ...history]);
  };

  const getFilteredVideos = () => {
    return videos
      .filter((video) => {
        const terms = search.toLowerCase().split(" ");
        return terms.every((term) => {
          return video.title.includes(term);
        });
      })
      .splice(0, 100);
  };

  const filteredVideos = getFilteredVideos();

  return (
    <div className="videosPageWrapper">
      <VideoFilter setSearch={setSearch} search={search} />
      {isWatchPanelOpened && (
        <WatchPanel limit={10} onClose={onClose} history={history} />
      )}
      <div className="videosPage">
        <div className="videosPage__inner">
          <h1>{filteredVideos.length} matching videos</h1>
          <div className="videos">
            {filteredVideos.map((video) => (
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

export async function getStaticProps() {
  const videos = Object.keys(channels).flatMap((key) => channels[key]);
  return {
    props: {
      videos,
    },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: Object.keys(channels).map((channel) => ({
//       params: { id: channel },
//     })),
//     fallback: false,
//   };
// }
