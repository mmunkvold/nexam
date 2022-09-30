import PropTypes from "prop-types";
import styles from "./Heading.module.css";

const Heading = (props) => {
  return (
    <>
      <h1 className={styles.h1}>{props.title}</h1>
    </>
  );
};

Heading.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Heading;
