import React, { useState } from "react";
import classNames from "classnames/bind";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Paper, Collapse, Grow, Divider } from "@material-ui/core";

import { ThumbUp, ThumbDown, AccountCircle } from "@material-ui/icons";
import { ReactComponent as BombIcon } from "../../../assets/img/icons/bomb.svg";
import { ReactComponent as CubeIcon } from "../../../assets/img/icons/ice.svg";
import { ReactComponent as WallIcon } from "../../../assets/img/icons/wall.svg";

import Difficulties from "../../../components/Song/Difficulties/Difficulties";
import { Line } from "rc-progress";

import Button from "@material-ui/core/Button";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./SongRow.module.scss";

const cx = classNames.bind(styles);

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      marginBottom: 50,
      cursor: "pointer",
      backgroundColor: theme.palette.background.default,
      transition: theme.transitions.create(["padding", "box-shadow", "background-color"]),
    },
    containerExpanded: {
      padding: 40,
      backgroundColor: theme.palette.background.paper,
    },
    header: {
      display: "flex",
    },
    details: {
      "display": "flex",
      "flexDirection": "column",
      "& > *": {
        marginTop: 30,
      },
    },
    stats: {
      display: " flex",
      alignItems: " center",
      justifyContent: " space-evenly",
    },
    stat: {
      "display": "flex",
      "flexDirection": "column",
      "alignItems": "center",
      "fontWeight": 700,
      "& svg": {
        height: 40,
        width: " auto",
      },
    },
    ratings: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gridGap: 40,
    },
    rating: {},
  }),
);

type Props = {
  song: Song;
  onSelectSong: (song: Song) => void;
};

const SongRow: React.FC<Props> = ({ song, onSelectSong }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const selectSong = () => {
    onSelectSong(song);
  };

  return (
    <Paper
      className={clsx(classes.container, { [classes.containerExpanded]: open })}
      onClick={selectSong}
      elevation={open ? 3 : 0}
    >
      <div className={clsx(classes.header)}>
        <div className={cx("cover")}>
          <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
        </div>
        <div className={cx("content")}>
          <h3>{song.name}</h3>
          <span className={cx("songAuthor")}>{song.metadata.songAuthorName}</span>
          <div className={cx("songLikes")}>
            <ThumbUp />
            <span>{song.stats.upVotes}</span>
            <ThumbDown />
            <span>{song.stats.downVotes}</span>
          </div>

          <Difficulties song={song} />

          <span className={cx("songUploader")}>
            <AccountCircle /> <span>{song.metadata.levelAuthorName}</span>
          </span>
        </div>
      </div>

      <Collapse in={open}>
        <Grow in={open}>
          <div className={clsx(classes.details)}>
            <Divider />
            <audio className={cx("player")} controls controlsList="nodownload" src={""}></audio>

            <div className={clsx(classes.stats)}>
              <div className={clsx(classes.stat)}>
                <BombIcon />
                <p>1000</p>
              </div>
              <div className={clsx(classes.stat)}>
                <CubeIcon />
                <p>2000</p>
              </div>
              <div className={clsx(classes.stat)}>
                <WallIcon />
                <p>150</p>
              </div>
            </div>

            <div className={clsx(classes.ratings)}>
              <div className={clsx(classes.rating)}>
                <div>Fun Factor</div>
                <Line percent={50} />
              </div>
              <div className={clsx(classes.rating)}>
                <div>Rhythm</div>
                <Line percent={50} />
              </div>
              <div className={clsx(classes.rating)}>
                <div>Flow</div>
                <Line percent={50} />
              </div>
              <div className={clsx(classes.rating)}>
                <div>Pattern Quality</div>
                <Line percent={50} />
              </div>
              <div className={clsx(classes.rating)}>
                <div>Readability</div>
                <Line percent={50} />
              </div>
              <div className={clsx(classes.rating)}>
                <div>Level Quality</div>
                <Line percent={50} />
              </div>
            </div>

            <Button color="primary">Download</Button>
          </div>
        </Grow>
      </Collapse>
    </Paper>
  );
};

export default SongRow;
