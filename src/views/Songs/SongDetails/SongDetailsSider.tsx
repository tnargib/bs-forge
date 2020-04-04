import React from "react";
import { createPortal } from "react-dom";
import classNames from "classnames/bind";
import { useSpring, animated } from "react-spring";

import SongDetails from "./SongDetails";
import SettingForm from "../../../components/Forms/SettingForm";

import { ChevronRight } from "@material-ui/icons";

import styles from "./SongDetails.module.scss";

const cx = classNames.bind(styles);
const el = document.body;

type Props = {
  open?: boolean;
  onClose: () => void;
};
const SongDetailsSider: React.FC<Props> = ({ open = false, onClose }) => {
  const wrapper = useSpring({
    to: { transform: open ? "translate3d(0px,0,0)" : "translate3d(350px,0,0)" },
  });
  const content = useSpring({
    to: {
      opacity: open ? 1 : 0,
      transform: open ? "translate3d(0,0,0)" : "translate3d(0,30px,0)",
    },
    delay: 300,
  });

  return createPortal(
    <animated.div className={cx("SongDetailsSider")} style={wrapper}>
      <animated.div style={content}>
        <SettingForm />
      </animated.div>
      {/* <div
        className={cx("closeSider")}
        onClick={() => {
          console.log("closing");
          onClose();
        }}
      >
        <ChevronRight />
      </div>
      <animated.div style={content}>
        <SongDetails />
      </animated.div> */}
    </animated.div>,
    el,
  );
};

export default SongDetailsSider;
