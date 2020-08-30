import React, { Component, ReactNode } from "react";

type Props = {
  autoPlay: boolean;
  children: ReactNode;
  className: string;
  controls: boolean;
  controlsList: string;
  crossOrigin: string;
  id: string;
  listenInterval: number;
  loop: boolean;
  muted: boolean;
  onAbort: (e: UIEvent) => void;
  onCanPlay: (e: Event) => void;
  onCanPlayThrough: (e: Event) => void;
  onEnded: (e: Event) => void;
  onError: (e: ErrorEvent) => void;
  onListen: (v: number) => void;
  onLoadedMetadata: (e: Event) => void;
  onPause: (e: Event) => void;
  onPlay: (e: Event) => void;
  onSeeked: (e: Event) => void;
  onVolumeChanged: (e: Event) => void;
  preload: "none" | "metadata" | "auto";
  src: string; // Not required b/c can use <source;
  style: React.CSSProperties;
  title: string;
  volume: number;
};
class AudioPlayer extends Component<Props> {
  public static defaultProps = {
    autoPlay: false,
    children: null,
    className: "",
    controls: false,
    controlsList: "",
    crossOrigin: null,
    id: "",
    listenInterval: 10000,
    loop: false,
    muted: false,
    onAbort: () => null,
    onCanPlay: () => null,
    onCanPlayThrough: () => null,
    onEnded: () => null,
    onError: () => null,
    onListen: () => null,
    onPause: () => null,
    onPlay: () => null,
    onSeeked: () => null,
    onVolumeChanged: () => null,
    onLoadedMetadata: () => null,
    preload: "metadata",
    src: null,
    style: {},
    title: "",
    volume: 1.0,
  };

  audioEl = React.createRef<HTMLAudioElement>();
  listenTracker?: NodeJS.Timeout;

  componentDidMount() {
    const audio = this.audioEl.current;
    if (!audio) return;
    this.updateVolume(this.props.volume);

    audio.addEventListener("error", e => {
      this.props.onError(e);
    });

    // When enough of the file has downloaded to start playing
    audio.addEventListener("canplay", e => {
      this.props.onCanPlay(e);
    });

    // When enough of the file has downloaded to play the entire file
    audio.addEventListener("canplaythrough", e => {
      this.props.onCanPlayThrough(e);
    });

    // When audio play starts
    audio.addEventListener("play", e => {
      this.setListenTrack();
      this.props.onPlay(e);
    });

    // When unloading the audio player (switching to another src)
    audio.addEventListener("abort", e => {
      this.clearListenTrack();
      this.props.onAbort(e);
    });

    // When the file has finished playing to the end
    audio.addEventListener("ended", e => {
      this.clearListenTrack();
      this.props.onEnded(e);
    });

    // When the user pauses playback
    audio.addEventListener("pause", e => {
      this.clearListenTrack();
      this.props.onPause(e);
    });

    // When the user drags the time indicator to a new time
    audio.addEventListener("seeked", e => {
      this.props.onSeeked(e);
    });

    audio.addEventListener("loadedmetadata", e => {
      this.props.onLoadedMetadata(e);
    });

    audio.addEventListener("volumechange", e => {
      this.props.onVolumeChanged(e);
    });
  }

  componentDidUpdate(prevProps: Props) {
    this.updateVolume(prevProps.volume);
  }

  /**
   * Set the volume on the audio element from props
   */
  updateVolume(volume: number): void {
    const audio = this.audioEl.current;
    if (!audio) return;

    if (typeof volume === "number" && volume !== audio.volume) {
      audio.volume = volume;
    }
  }

  /**
   * Set an interval to call props.onListen every props.listenInterval time period
   */
  setListenTrack() {
    const audio = this.audioEl.current;
    if (!audio) return;

    if (!this.listenTracker) {
      const listenInterval = this.props.listenInterval;
      this.listenTracker = setInterval(() => {
        this.props.onListen(audio.currentTime);
      }, listenInterval);
    }
  }

  /**
   * Clear the onListen interval
   */
  clearListenTrack() {
    if (this.listenTracker) {
      clearInterval(this.listenTracker);
      this.listenTracker = undefined;
    }
  }

  render() {
    const incompatibilityMessage = this.props.children || (
      <p>
        Your browser does not support the <code>audio</code> element.
      </p>
    );

    // Set lockscreen / process audio title on devices
    const title = this.props.title ? this.props.title : this.props.src;

    return (
      <audio
        ref={this.audioEl}
        className={`react-audio-player ${this.props.className}`}
        autoPlay={this.props.autoPlay}
        controls={this.props.controls}
        crossOrigin={this.props.crossOrigin}
        id={this.props.id}
        loop={this.props.loop}
        muted={this.props.muted}
        preload={this.props.preload}
        src={this.props.src}
        style={this.props.style}
        title={title}
        onPlay={() => null}
        controlsList={this.props.controlsList}
      >
        {incompatibilityMessage}
      </audio>
    );
  }
}

export default AudioPlayer;
