import React, { useEffect } from "react";
import { flatten, pluck, last } from "ramda";

import SongRow from "../SongRow/SongRow";

import { Song, SongPage } from "../../../services/apis/BeatSaverApi";

type Props = {
  pages: SongPage[];
  loadSongs: (page?: number) => void;
};

const SongList: React.FC<Props> = ({ pages, loadSongs }) => {
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
    <>
      {allSongs.map(song => (
        <SongRow key={song._id} song={song} />
      ))}
    </>
  );
};

export default SongList;
