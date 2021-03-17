import React, { useState } from "react";
import Link from "next/link";

export const ChannelFilter = ({ channels }) => {
  const [search, setSearch] = useState("");

  const getFilteredChannels = () => {
    return channels.filter((channel) =>
      search === ""
        ? true
        : channel.author.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="channelFilterPanel">
      <h1 className="channelFilterPanel__title">Filter Channels</h1>
      <input
        onChange={(e) => setSearch(e.target.value)}
        className="channelFilterPanel__search"
      />

      <div className="channelFilterPanel__channelList">
        {getFilteredChannels().map((channel) => (
          <Link href={`/channels/${channel.channelId}`}>
            <div className="channelFilterPanel__channel">
              <img
                className="channelFilterPanel__thumbnail"
                src={channel.authorThumbnail}
              />
              {channel.author}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
