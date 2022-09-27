import React from "react";
import styles from "./WrapperMain.module.css";

const WrapperMain = (props) => {
  return <div className={styles.wrapperMain}>{props.children}</div>;
};
export default WrapperMain;
