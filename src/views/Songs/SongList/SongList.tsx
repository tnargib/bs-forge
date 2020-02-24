import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { flatten, pluck, last } from "ramda";

import { FilterList } from "@material-ui/icons";

import SongRow from "../SongRow/SongRow";
import SongDetails from "../SongDetails/SongDetails";

import { Song, SongPage, SongSortOrder } from "../../../services/apis/BeatSaverApi";

import styles from "./SongList.module.scss";

const cx = classNames.bind(styles);

type Props = {
  pages: SongPage[];
  order: SongSortOrder;
  shrinked: boolean;
  loadSongs: (page?: number) => void;
  changeOrder: (filter: SongSortOrder) => void;
  selectSong: (song: Song) => void;
};

const SongList: React.FC<Props> = ({
  pages,
  order,
  shrinked,
  loadSongs,
  changeOrder,
  selectSong,
}) => {
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // const root = containerRef.current;

    const fetchNewPage = () => {
      const lastPage: SongPage = last(pages);
      if (lastPage && lastPage.nextPage) loadSongs(lastPage.nextPage);
    };

    const handleScroll = () => {
      const root = document.documentElement;
      if (window.innerHeight + root.scrollTop !== root.offsetHeight) return;
      // if (root && root.scrollTop !== root.scrollHeight - root.offsetHeight) return;
      console.log("Fetch more list items!");
      fetchNewPage();
    };

    console.log("useEffect: SongList handleScroll");
    window.addEventListener("scroll", handleScroll);
    // if (root) root.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // if (root) root.removeEventListener("scroll", handleScroll);
    };
  }, [pages, loadSongs]);

  const allSongs: Song[] = flatten(pluck("docs", pages));

  return (
    <div className={cx("songList", { open: shrinked })} ref={containerRef}>
      <div className={cx("filters")}>
        <FilterList />
        <div
          className={cx({ active: order === SongSortOrder.Latest })}
          onClick={() => changeOrder(SongSortOrder.Latest)}
        >
          Latest
        </div>
        <div
          className={cx({ active: order === SongSortOrder.Rating })}
          onClick={() => changeOrder(SongSortOrder.Rating)}
        >
          Top Rating
        </div>
      </div>
      {allSongs.map(song => (
        <SongRow key={song._id} song={song} onSelectSong={selectSong} />
      ))}
    </div>
  );
};

export default SongList;
