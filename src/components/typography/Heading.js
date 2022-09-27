import React from "react";
import PropTypes from "prop-types";
import styles from "./Heading.module.css";

const Heading = (props) => {
  return (
    <>
      <h1 className={styles.h1}>{props.title}</h1>
      <h2 className={styles.h2}>{props.subtitle}</h2>
      <h3 className={styles.h3}>{props.subsubtitle}</h3>
    </>
  );
};

Heading.propTypes = {
  title: PropTypes.string /* .isRequired */,
  subtitle: PropTypes.string,
  subsubtitle: PropTypes.string,
};

export default Heading;
//see if I need to have the title required... gives error on accommodationpage because i dont use it there...
