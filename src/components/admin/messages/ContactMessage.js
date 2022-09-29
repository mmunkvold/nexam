import PropTypes from "prop-types";
import styles from "../enquiries/Enquiry.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";

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
        <button className={styles.btn} onClick={() => setExpanded(!expanded)}>
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
