import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import { useTransition, animated } from "react-spring";

import SongDetails from "./SongDetails";

import { Song } from "../../../services/apis/BeatSaverApi";

import { ChevronRight } from "@material-ui/icons";

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

  const transitions = useTransition(open, null, {
    from: { transform: "translate3d(350px,0,0)" },
    enter: { transform: "translate3d(0px,0,0)" },
    leave: { transform: "translate3d(350px,0,0)" },
  });

  return createPortal(
    transitions.map(
      ({ item, key, props }) =>
        item && (
          <animated.div key={key} className={cx("SongDetailsSider")} style={props}>
            <div className={cx("closeSider")} onClick={onClose}>
              <ChevronRight />
            </div>
            <SongDetails {...rest} />
          </animated.div>
        ),
    ),
    el,
  );
};

export default SongDetailsSider;
