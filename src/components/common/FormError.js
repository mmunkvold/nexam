import PropTypes from "prop-types";
import styles from "../formElements/form/Form.module.css";

const ValidationError = ({ children }) => {
  return <div className={styles.formError}>{children}</div>;
};

ValidationError.proptTypes = {
  children: PropTypes.node.isRequired,
};

export default ValidationError;
