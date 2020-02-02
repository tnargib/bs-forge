import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { flatten, pluck, last } from "ramda";

import SongRow from "../SongRow/SongRow";
import SongDetails from "../SongDetails/SongDetails";
import Button from "../../../components/Button/Button";
import Loader from "../../../components/Loader/Loader";

import { Song, SongPage, SongSortOrder } from "../../../services/apis/BeatSaverApi";

import styles from "./SongList.module.scss";

const cx = classNames.bind(styles);

type Props = {
  pages: SongPage[];
  loadSongs: (page?: number) => void;
  changeOrder: (filter: SongSortOrder) => void;
};

const SongList: React.FC<Props> = ({ pages, loadSongs, changeOrder }) => {
  const [selectedSong, setSelectedSong] = useState<Song>();

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

  return (
    <div>
      <div className={cx("filters")}>
        <div onClick={() => changeOrder(SongSortOrder.Latest)}>Latest</div>
        <div onClick={() => changeOrder(SongSortOrder.Rating)}>Top rating</div>
      </div>
      {!!selectedSong && (
        <div>
          <SongDetails song={selectedSong} />
        </div>
      )}
      {allSongs.map(song => (
        <SongRow key={song._id} song={song} onSelectSong={setSelectedSong} />
      ))}
    </div>
  );
};

export default SongList;
