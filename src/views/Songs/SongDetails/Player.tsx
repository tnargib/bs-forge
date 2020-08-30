import React, { useState, useRef } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Typography, Grid, Slider, IconButton, LinearProgress } from "@material-ui/core";

import { VolumeDown, VolumeUp, PlayArrow, Pause } from "@material-ui/icons";

const useStyles = makeStyles(() =>
  createStyles({
    cover: {
      "width": 50,
      "height": 50,
      "flexShrink": 0,
      "borderRadius": 15,
      "boxShadow": "0px 5px 20px 0px rgba(0, 0, 0, 0.5)",
      "overflow": "hidden",
      "& img": {
        objectFit: "cover",
        width: "100%",
        height: "100%",
      },
    },
  }),
);

type Props = {
  style?: React.CSSProperties;
  cover: string;
  url?: string;
  title: string;
  artist: string;
  previewProgress?: number;
};
const Player: React.FC<Props> = ({ style = {}, cover, url, title, artist, previewProgress }) => {
  const classes = useStyles();
  const playerEl = useRef<ReactPlayer>(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [progress, setProgress] = useState<any>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: any, value: number | number[]) => {
    setVolume(value as number);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleSeeking = (e: any, value: number | number[]) => {
    setSeeking(true);
    setPlayed(value as number);
  };

  const handleCommitSeek = (e: any, value: number | number[]) => {
    setSeeking(false);
    if (playerEl && playerEl.current) playerEl.current.seekTo(value as number);
  };

  const handleProgress: ReactPlayerProps["onProgress"] = state => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setProgress(state);
      setPlayed(state.played);
    }
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  const handleDuration = (duration: any) => {
    setDuration(duration);
  };

  const formatSeconds = (nbSeconds: number) => {
    let minutes = Math.floor(nbSeconds / 60) + "";
    let seconds = Math.floor(nbSeconds % 60) + "";
    if (minutes.length < 2) minutes = "0" + minutes;
    if (seconds.length < 2) seconds = "0" + seconds;
    return minutes + ":" + seconds;
  };

  const playedSecondsFormatted = progress ? formatSeconds(progress.playedSeconds) : null;
  const durationFormatted = duration ? formatSeconds(duration) : null;

  return (
    <div style={style}>
      <Grid container spacing={2}>
        <Grid item>
          <div className={clsx(classes.cover)}>
            <img src={cover} alt="" />
          </div>
        </Grid>

        <Grid item xs>
          <Typography gutterBottom>{title}</Typography>
          <Typography>{artist}</Typography>
        </Grid>

        <Grid item>
          <IconButton color="primary" onClick={handlePlayPause}>
            {!playing ? <PlayArrow /> : <Pause />}
          </IconButton>
        </Grid>
      </Grid>

      {/* <Typography gutterBottom>Volume</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <VolumeDown />
        </Grid>
        <Grid item xs>
          <Slider min={0} max={1} step={0.01} value={volume} onChange={handleVolumeChange} />
        </Grid>
        <Grid item>
          <VolumeUp />
        </Grid>
      </Grid> */}

      {typeof previewProgress === "number" ? (
        <>
          <br />
          <LinearProgress variant="determinate" value={previewProgress || 0} />
          <br />
        </>
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <Typography>{playedSecondsFormatted}</Typography>
          </Grid>
          <Grid item xs>
            <Slider
              min={0}
              max={1}
              step={0.01}
              value={played}
              onChange={handleSeeking}
              onChangeCommitted={handleCommitSeek}
            />
          </Grid>
          <Grid item>
            <Typography>{durationFormatted}</Typography>
          </Grid>
        </Grid>
      )}

      <ReactPlayer
        width={0}
        height={0}
        ref={playerEl}
        url={url}
        playing={playing}
        controls={false}
        volume={volume}
        onReady={() => console.log("onReady")}
        onStart={() => console.log("onStart")}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={() => console.log("onBuffer")}
        onSeek={e => console.log("onSeek", e)}
        onEnded={handleEnded}
        onError={e => console.log("onError", e)}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </div>
  );
};

export default Player;
