import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";

import SongDetails from "./SongDetails";

import { Song } from "../../../services/apis/BeatSaverApi";

import styles from "./SongDetails.module.scss";

const cx = classNames.bind(styles);
const el = document.body;

type Props = {
  open?: boolean;
  song?: Song;
  onClose: () => void;
};
const SongDetailsSider: React.FC<Props> = ({ open = false, onClose, ...rest }) => {
  // Prevent scroll if a sider is open
  // useEffect(() => {
  //   document.body.style.overflow = open ? "hidden" : "auto";
  // }, [open]);

  return open
    ? createPortal(
        <div className={cx("SongDetailsSider")}>
          <div onClick={onClose}>Close</div>
          <SongDetails {...rest} />
        </div>,
        el,
      )
    : null;
};

export default SongDetailsSider;
