import React, { useState } from "react";
import classNames from "classnames/bind";
import { pipe, path, reject, equals, keys } from "ramda";

import Button from "../../../components/Button/Button";
import Difficulties from "../../../components/Song/Difficulties/Difficulties";

import { ThumbUp, ThumbDown, AccountCircle } from "@material-ui/icons";
import { ReactComponent as BombIcon } from "../../../assets/img/icons/bomb.svg";
import { ReactComponent as CubeIcon } from "../../../assets/img/icons/ice.svg";
import { ReactComponent as TimeIcon } from "../../../assets/img/icons/speed.svg";
import { ReactComponent as BpmIcon } from "../../../assets/img/icons/tempo.svg";
import { ReactComponent as WallIcon } from "../../../assets/img/icons/wall.svg";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./SongDetails.module.scss";

const cx = classNames.bind(styles);

type Props = {
  song?: Song;
};
const SongDetails: React.FC<Props> = ({ song }) => {
  const [selectedDiff, setDiff] = useState<string>("easy");

  return (
    <div className={cx("songDetails")}>
      {!song ? null : (
        <>
          <div className={cx("cover")}>
            <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
          </div>
          <div className={cx("title")}>{song.metadata.songName}</div>
          <div className={cx("artist")}>{song.metadata.songAuthorName}</div>
          <audio
            className={cx("player")}
            controls
            src={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}
          ></audio>
          <div className={cx("songLikes")}>
            <ThumbUp />
            <span>{song.stats.upVotes}</span>
            <ThumbDown />
            <span>{song.stats.downVotes}</span>
          </div>
          <Difficulties className={cx("difficulties")} song={song} onSelectDiff={setDiff} />
          <div className={cx("stats")}>
            <div className={cx("stat")}>
              <BombIcon />
              <p>{song.metadata.characteristics[0].difficulties[selectedDiff]?.bombs}</p>
            </div>
            <div className={cx("stat")}>
              <CubeIcon />
              <p>{song.metadata.characteristics[0].difficulties[selectedDiff]?.notes}</p>
            </div>
            <div className={cx("stat")}>
              <WallIcon />
              <p>{song.metadata.characteristics[0].difficulties[selectedDiff]?.obstacles}</p>
            </div>
          </div>

          <Button type="primary">Download</Button>
        </>
      )}
    </div>
  );
};

export default SongDetails;
