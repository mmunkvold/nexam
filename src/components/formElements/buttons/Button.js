import React from "react";
import styles from "./Buttons.module.css";
import dangerStyles from "./Danger.module.css";

const Button = (props) => {
  let altClass = null;

  if (props.variant === "danger") {
    altClass = dangerStyles.danger;
  }
  return <button className={`${styles.button} ${altClass}`}>{props.children}</button>;
};

export default Button;

//button variant if use...
