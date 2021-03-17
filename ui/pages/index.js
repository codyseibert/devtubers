import Head from "next/head";
import channels from "../data/channels.json";
import { useEffect, useMemo, useState } from "react";

const channelTags = {};

for (let [channelName, videos] of Object.entries(channels)) {
  let tags = [];
  for (let video of videos) {
    tags = [...tags, video.title].flatMap((tag) => tag.split(" "));
  }
  channelTags[channelName] = [...new Set(tags)];
}

const channelNames = Object.keys(channels);

const getTags = (channelName) => channelTags[channelName];

const SearchForm = ({ value, setSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  useEffect(() => {
    if (value) {
      setSearchInput(value);
    }
  }, [value]);

  return (
    <form onSubmit={submit} className="filter">
      <input
        value={searchInput}
        className="filter__input"
        placeholder="Search by tags, i.e: react, vue, vuex, etc"
        onChange={(e) => setSearchInput(e.target.value)}
        type="text"
      />
      <button type="submit" className="filter__button">
        Search
      </button>
    </form>
  );
};

const Video = ({ video }) => {
  return (
    <div className="video">
      <img className="video__thumbnail" src={video.thumbnail} />
      <a target="_blank" href={`https://youtube.com/videos/${video.videoId}`}>
        {video.title}
      </a>
    </div>
  );
};

const Tags = ({ channelName, setSearch }) => {
  return (
    <>
      {getTags(channelName).map((tag, i) => (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSearch(tag);
          }}
          key={i}
          className="tag"
        >
          {tag}
        </a>
      ))}
    </>
  );
};

const Channel = ({ channelName, videos, setSearch }) => {
  const [showVideos, setShowVideos] = useState(false);

  const memoTags = useMemo(
    () => <Tags channelName={channelName} setSearch={setSearch} />,
    [channelName, setSearch]
  );

  return (
    <div className="channel">
      {/* <img className="channel__banner" src={videos[0].authorBanners} />
      <img className="channel__avatar" src={videos[0].authorThumbnails} /> */}
      <h1>
        <a target="_blank" href={videos[0].authorUrl}>
          {videos[0].author}
        </a>
      </h1>
      <h2>
        <a
          onClick={(e) => {
            e.preventDefault();
            setShowVideos(!showVideos);
          }}
        >
          Click to View Latest Videos
        </a>
      </h2>
      {showVideos && (
        <div className="videos">
          {videos.map((video, i) => (
            <Video key={i} video={video} />
          ))}
        </div>
      )}
      <h3>Tags {memoTags}</h3>
    </div>
  );
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [filteredChannelNames, setFilteredChannelNames] = useState(
    channelNames
  );

  useEffect(() => {
    if (search) {
      setFilteredChannelNames(
        channelNames.filter((name) => {
          const channelTags = getTags(name);
          const hasMatchingTag = channelTags.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          );
          return (
            name.toLowerCase().includes(search.toLowerCase()) || hasMatchingTag
          );
        })
      );
    } else {
      setFilteredChannelNames(channelNames);
    }
  }, [search]);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header">
        <div className="header__container">
          <div className="header__logo">DevTubers</div>
          <div className="header__navigation">
            <a>Dev Channels</a>
            <a>About</a>
          </div>
        </div>
      </header>

      <SearchForm value={search} setSearch={setSearch} />

      <div className="channels">
        {filteredChannelNames.map((channel, i) => (
          <Channel
            setSearch={setSearch}
            key={i}
            channelName={channel}
            videos={channels[channel]}
          />
        ))}
      </div>
    </div>
  );
}
