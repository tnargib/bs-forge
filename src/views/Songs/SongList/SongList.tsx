import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { flatten, pluck, last } from "ramda";
import debounce from "lodash.debounce";

import { FilterList, SearchOutlined } from "@material-ui/icons";

import SongRow from "../SongRow/SongRow";
import Loader from "../../../components/Loader/Loader";

import { Song, SongPage, SongSortOrder } from "../../../services/apis/BeatSaverApi";

import styles from "./SongList.module.scss";

const cx = classNames.bind(styles);

type Props = {
  search?: string;
  order: SongSortOrder;
  pages: SongPage[];
  loadingPages: number[];
  loadSongs: (search?: string, page?: number) => void;
  changeOrder: (filter: SongSortOrder) => void;
  selectSong: (song: Song) => void;
};
const SongList: React.FC<Props> = ({
  search = "",
  order,
  pages,
  loadingPages,
  loadSongs,
  changeOrder,
  selectSong,
}) => {
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchNewPage = () => {
      const lastPage: SongPage = last(pages);
      if (lastPage && lastPage.nextPage) loadSongs(search, lastPage.nextPage);
    };

    const handleScroll = () => {
      const root = document.documentElement;
      if (window.innerHeight + root.scrollTop !== root.offsetHeight) return;
      console.log("Fetch more list items!");
      fetchNewPage();
    };

    console.log("useEffect: SongList handleScroll");
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [search, pages, loadSongs]);

  const applySearch = debounce(value => {
    console.log("searching!");
    loadSongs(value);
  }, 500);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    applySearch(value);
  };

  const allSongs: Song[] = flatten(pluck("docs", pages));
  const totalDocs = pages.length ? pages[0].totalDocs : 0;
  return (
    <>
      <div className={cx("searchBar")}>
        <SearchOutlined />
        <input type="text" placeholder="Search song..." onChange={handleSearch} />
      </div>
      <div className={cx("songList")} ref={containerRef}>
        {!search ? (
          <div className={cx("filters")}>
            <FilterList />
            <div
              className={cx({ active: order === SongSortOrder.Latest })}
              onClick={() => changeOrder(SongSortOrder.Latest)}
            >
              Latest
            </div>
            <div
              className={cx({ active: order === SongSortOrder.Hot })}
              onClick={() => changeOrder(SongSortOrder.Hot)}
            >
              Hot
            </div>
            <div
              className={cx({ active: order === SongSortOrder.Rating })}
              onClick={() => changeOrder(SongSortOrder.Rating)}
            >
              Top Rating
            </div>
            <div
              className={cx({ active: order === SongSortOrder.Download })}
              onClick={() => changeOrder(SongSortOrder.Download)}
            >
              Download
            </div>
            <div
              className={cx({ active: order === SongSortOrder.Played })}
              onClick={() => changeOrder(SongSortOrder.Played)}
            >
              Top Played
            </div>
          </div>
        ) : (
          <div className={cx("searchTitle")}>
            <p>
              {totalDocs} search result(s) for <span>{search}</span>
            </p>
          </div>
        )}
        {allSongs.map(song => (
          <SongRow key={song._id} song={song} onSelectSong={selectSong} />
        ))}
        {loadingPages.length > 0 && <Loader />}
      </div>
    </>
  );
};

export default SongList;
