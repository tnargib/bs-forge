import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import classNames from "classnames/bind";
import { keys, head, reject, equals, pipe } from "ramda";
import { Line } from "rc-progress";

import Button from "../../../components/Button/Button";
import Difficulties from "../../../components/Song/Difficulties/Difficulties";

import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { ReactComponent as BombIcon } from "../../../assets/img/icons/bomb.svg";
import { ReactComponent as CubeIcon } from "../../../assets/img/icons/ice.svg";
import { ReactComponent as WallIcon } from "../../../assets/img/icons/wall.svg";

import { useStores } from "../../../services/mobx/useStores";

import styles from "./SongDetails.module.scss";

import DownloadConnector from "../../../services/connectors/DownloadConnector";

const cx = classNames.bind(styles);
const DL = new DownloadConnector();

type Props = {
  style?: React.CSSProperties;
};
const SongDetails: React.FC<Props> = ({ style }) => {
  const { songStore } = useStores();
  const {
    currentSong: song,
    currentSongAudio: audioSource,
    currentAudioPreviewProgress: previewProgress,
    currentSongRatings: ratings,
  } = songStore;

  const [selectedDiff, setDiff] = useState<string>("easy");

  useEffect(() => {
    if (song) {
      const diff: string = pipe(reject(equals(false)), keys, head)(song.metadata.difficulties);
      setDiff(diff);
    }
  }, [song, setDiff]);

  const dlSong = () => {
    if (song)
      DL.downloadByUrl(process.env.REACT_APP_BEATSAVER_URL + song.downloadURL).then(data => {
        console.log("dlSong", data);
      });
  };

  return (
    <div className={cx("songDetails")} style={style}>
      {!song ? null : (
        <>
          <div className={cx("cover")}>
            <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
          </div>
          <div className={cx("title")}>{song.metadata.songName}</div>
          <div className={cx("artist")}>{song.metadata.songAuthorName}</div>

          {audioSource ? (
            <audio
              className={cx("player")}
              controls
              controlsList="nodownload"
              src={audioSource}
            ></audio>
          ) : (
            <Line
              className={cx("progress")}
              percent={previewProgress || 1}
              strokeWidth={1}
              trailWidth={1}
            />
          )}

          <div className={cx("songLikes")}>
            <ThumbUp />
            <span>{song.stats.upVotes}</span>
            <ThumbDown />
            <span>{song.stats.downVotes}</span>
          </div>
          <Difficulties
            className={cx("difficulties")}
            song={song}
            selected={selectedDiff}
            onSelectDiff={setDiff}
          />
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

          {!!ratings && (
            <div className={cx("ratings")}>
              <div>Fun Factor</div>
              <Line percent={(ratings.average_ratings.fun_factor / 5) * 100} />
              <div>Rhythm</div>
              <Line percent={(ratings.average_ratings.rhythm / 5) * 100} />
              <div>Flow</div>
              <Line percent={(ratings.average_ratings.flow / 5) * 100} />
              <div>Pattern Quality</div>
              <Line percent={(ratings.average_ratings.pattern_quality / 5) * 100} />
              <div>Readability</div>
              <Line percent={(ratings.average_ratings.readability / 5) * 100} />
              <div>Level Quality</div>
              <Line percent={(ratings.average_ratings.level_quality / 5) * 100} />
            </div>
          )}

          <Button color="primary" onClick={dlSong}>
            Download
          </Button>
        </>
      )}
    </div>
  );
};

export default observer(SongDetails);
