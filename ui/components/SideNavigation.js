import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImport,
  faInfo,
  faVideo,
  faLaptop,
  faCode,
} from "@fortawesome/free-solid-svg-icons";

export const SideNavigation = () => {
  return (
    <div className="sideNavigation">
      <h1 className="sideNavigation__logo">
        <FontAwesomeIcon icon={faLaptop}></FontAwesomeIcon>DevTubers
      </h1>
      <div className="sideNavigation__links">
        <Link href="/channels/CalebTheVideoMaker2">Channels</Link>
        <Link href="/videos">Videos</Link>
        <div className="sideNavigation__divider"></div>
        <Link href="/submit">
          <a>
            <FontAwesomeIcon icon={faFileImport}></FontAwesomeIcon>Submit
            Channel
          </a>
        </Link>
        <Link href="/about">
          <a>
            <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>About
          </a>
        </Link>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/codyseibert/devtubers"
        >
          <FontAwesomeIcon icon={faCode}></FontAwesomeIcon>View Source
        </a>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.youtube.com/c/webdevjunkie"
        >
          <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
          /c/webdevjunkie
        </a>
        <div className="sideNavigation__credits">Created by Cody Seibert</div>
      </div>
    </div>
  );
};
