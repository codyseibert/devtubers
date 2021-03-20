import React from "react";
import YouTube from "react-youtube";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

export const WatchPanel = ({ history, onClose, limit = 10 }) => {
  const filteredHistory = history.slice(0, limit);

  return (
    <div className="watchPanel">
      <button className="watchPanel__closeButton" onClick={onClose}>
        <FontAwesomeIcon icon={faWindowClose} />
      </button>
      <h1>Watch History</h1>
      {filteredHistory.map((video) => (
        <>
          <h2>{video.title}</h2>
          <div class="watchPanel__videoAuthor">
            <img src={video.authorThumbnails} />
            <Link href={`/channels/${video.channelId}`}>
              <a>{video.author}</a>
            </Link>
          </div>
          <YouTube
            videoId={video.videoId}
            opts={{
              width: "100%",
              // playerVars: {
              //   autoplay: 1,
              // },
            }}
          />
        </>
      ))}
    </div>
  );
};
