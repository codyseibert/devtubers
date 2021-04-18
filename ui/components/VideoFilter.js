import React, { useState } from "react";
import Link from "next/link";

export const VideoFilter = ({ setSearch, search }) => {
  return (
    <div className="videoFilterPanel">
      <div className="videoFilterPanel_searchPanel">
        <h1 className="videoFilterPanel__title">Filter Videos</h1>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="videoFilterPanel__search"
        />
      </div>

      <div className="videoFilterPanel__videoList"></div>
    </div>
  );
};
