import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import classNames from "classnames/bind";
import { keys, head, reject, equals, pipe } from "ramda";
import { withStyles, createStyles, makeStyles, fade } from "@material-ui/core/styles";

import {
  Button,
  LinearProgress,
  Typography,
  CircularProgress,
  Box,
  Divider,
  Grid,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import Difficulties from "../../../components/Song/Difficulties/Difficulties";
import Player from "./Player";

import { ThumbUp, ThumbDown, Favorite } from "@material-ui/icons";
import { ReactComponent as BombIcon } from "../../../assets/img/icons/bomb.svg";
import { ReactComponent as CubeIcon } from "../../../assets/img/icons/ice.svg";
import { ReactComponent as WallIcon } from "../../../assets/img/icons/wall.svg";

import { useStores } from "../../../services/mobx/useStores";

import styles from "./SongDetails.module.scss";

import DownloadConnector from "../../../services/connectors/DownloadConnector";

const cx = classNames.bind(styles);
const DL = new DownloadConnector();

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
})(Rating);

const useStyles = makeStyles(theme =>
  createStyles({
    stat: {
      backgroundColor: theme.palette.secondary.light,
      // backgroundColor: fade(theme.palette.secondary.light, 0.2),
      padding: 15,
      borderRadius: 35,
    },
  }),
);

type Props = {
  style?: React.CSSProperties;
};
const SongDetails: React.FC<Props> = ({ style }) => {
  const classes = useStyles();

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
    <>
      {song && (
        <div style={{ zIndex: 10, position: "sticky", top: 0, padding: 16, background: "gray" }}>
          <Player
            cover={process.env.REACT_APP_BEATSAVER_URL + song.coverURL}
            url={audioSource}
            title={song.metadata.songName}
            artist={song.metadata.songAuthorName}
            previewProgress={audioSource ? undefined : previewProgress}
          />
          <Button color="primary" onClick={dlSong} fullWidth>
            Download
          </Button>
        </div>
      )}

      <div className={cx("songDetails")} style={style}>
        {!song ? null : (
          <>
            {/* <div className={cx("cover")}>
            <img src={process.env.REACT_APP_BEATSAVER_URL + song.coverURL} alt="" />
          </div>

          <Typography variant="h6" align="center">
            {song.metadata.songName}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            {song.metadata.songAuthorName}
          </Typography> */}

            {/* <div className={cx("player")}>
              {audioSource ? (
                <audio controls controlsList="nodownload" src={audioSource}></audio>
              ) : (
                <LinearProgress variant="determinate" value={previewProgress || 0} />
              )}
            </div> */}

            <Difficulties.Select
              // className={cx("difficulties")}
              song={song}
              value={selectedDiff}
              onChange={e => setDiff(e.target.value as string)}
              // selected={selectedDiff}
              // onSelectDiff={setDiff}
            />
            {/* <Difficulties
              className={cx("difficulties")}
              song={song}
              selected={selectedDiff}
              onSelectDiff={setDiff}
            /> */}

            <div className={cx("stats")}>
              <Box boxShadow={3} className={cx("stat", classes.stat)}>
                <BombIcon />
                <p>{song.metadata.characteristics[0].difficulties[selectedDiff]?.bombs}</p>
              </Box>
              <Box boxShadow={3} className={cx("stat", classes.stat)}>
                <CubeIcon />
                <p>{song.metadata.characteristics[0].difficulties[selectedDiff]?.notes}</p>
              </Box>
              <Box boxShadow={3} className={cx("stat", classes.stat)}>
                <WallIcon />
                <p>{song.metadata.characteristics[0].difficulties[selectedDiff]?.obstacles}</p>
              </Box>
            </div>

            <br />
            <br />
            <Divider />
            <br />
            <br />

            <div className={cx("songLikes")}>
              <ThumbUp />
              <span>{song.stats.upVotes}</span>
              <ThumbDown />
              <span>{song.stats.downVotes}</span>
            </div>

            <div className={cx("ratings")}>
              {!!ratings && audioSource ? (
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Fun Factor</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={(ratings.average_ratings.fun_factor / 5) * 100}
                  /> */}
                    <StyledRating
                      readOnly
                      value={ratings.average_ratings.fun_factor}
                      precision={0.5}
                      icon={<Favorite fontSize="inherit" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Rhythm</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={(ratings.average_ratings.rhythm / 5) * 100}
                  /> */}
                    <StyledRating
                      readOnly
                      value={ratings.average_ratings.rhythm}
                      precision={0.5}
                      icon={<Favorite fontSize="inherit" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Flow</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={(ratings.average_ratings.flow / 5) * 100}
                  /> */}
                    <StyledRating
                      readOnly
                      value={ratings.average_ratings.flow}
                      precision={0.5}
                      icon={<Favorite fontSize="inherit" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Pattern Quality</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={(ratings.average_ratings.pattern_quality / 5) * 100}
                  /> */}
                    <StyledRating
                      readOnly
                      value={ratings.average_ratings.pattern_quality}
                      precision={0.5}
                      icon={<Favorite fontSize="inherit" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Readability</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={(ratings.average_ratings.readability / 5) * 100}
                  /> */}
                    <StyledRating
                      readOnly
                      value={ratings.average_ratings.readability}
                      precision={0.5}
                      icon={<Favorite fontSize="inherit" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Level Quality</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {/* <LinearProgress
                    color="secondary"
                    variant="determinate"
                    value={(ratings.average_ratings.level_quality / 5) * 100}
                  /> */}
                    <StyledRating
                      readOnly
                      value={ratings.average_ratings.level_quality}
                      precision={0.5}
                      icon={<Favorite fontSize="inherit" />}
                    />
                  </Grid>
                </Grid>
              ) : (
                <CircularProgress
                  style={{ alignSelf: "center" }}
                  color="secondary"
                  variant="indeterminate"
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default observer(SongDetails);
