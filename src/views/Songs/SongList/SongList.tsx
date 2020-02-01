import React, { useEffect } from "react";
import cx from "classnames";
import { pipe, keys, equals, reject, path, flatten, pluck, last } from "ramda";

import { Song, SongPage } from "../../../services/apis/BeatSaverApi";

import useStyles from "./SongListStyle";

type Props = {
  pages: SongPage[];
  loadSongs: (page?: number) => void;
};

const SongList: React.FC<Props> = ({ pages, loadSongs }) => {
  const classes = useStyles();

  useEffect(() => {
    const fetchNewPage = () => {
      const lastPage: SongPage = last(pages);
      if (lastPage.nextPage) loadSongs(lastPage.nextPage);
    };

    const handleScroll = () => {
      const root = document.documentElement;
      console.log(window.innerHeight, root.scrollTop, root.offsetHeight);
      if (window.innerHeight + root.scrollTop !== root.offsetHeight) return;
      console.log("Fetch more list items!");
      fetchNewPage();
    };

    console.log("useEffect: SongList handleScroll");
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pages, loadSongs]);

  const allSongs: Song[] = flatten(pluck("docs", pages));
  const difficulties = pipe(path(["metadata", "difficulties"]), reject(equals(false)), keys);

  return (
    <>
      {allSongs.map(song => (
        <div key={song._id} className={cx(classes.songItem)}>
          <img
            className={cx(classes.cover)}
            src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL}
            alt=""
          />
          <div className={cx(classes.songItemContent)}>
            <h3>{song.name}</h3>
            <p>{song.metadata.songAuthorName}</p>
            <p>{song.metadata.levelAuthorName}</p>
            {difficulties(song).map((diff: string) => (
              <span key={diff} className={cx(classes.difficultyTag)}>
                {diff}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default SongList;
