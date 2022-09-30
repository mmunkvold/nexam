import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "../enquiries/Enquiry.module.css";

const ContactMessage = ({ id, fullname, email, message, subject }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.message}>
      <div className={styles.title}>
        <div>
          <p onClick={() => setExpanded(!expanded)} className={styles.messageTitle}>
            {fullname}
          </p>
          <p>{subject}</p>
        </div>
        <button className={styles.button} onClick={() => setExpanded(!expanded)}>
          {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </button>
      </div>

      {expanded && (
        <div className={styles.card}>
          <p>
            From: {fullname} ({email})
          </p>
          <p>{subject}</p>
          <p>Message: {message}</p>
        </div>
      )}
    </div>
  );
};

ContactMessage.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ContactMessage;
