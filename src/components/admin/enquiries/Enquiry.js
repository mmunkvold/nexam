import PropTypes from "prop-types";
import "../../../App.css";
import styles from "./Enquiry.module.css";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";

const Enquiry = ({ id, fullname, email, message, accommodationName, beds, start, end }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.message}>
      <div className={styles.title}>
        <div>
          <p onClick={() => setExpanded(!expanded)} className={styles.messageTitle}>
            {accommodationName}
          </p>
          <p>From: {fullname}</p>
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
          <p>Accommodation Name: {accommodationName}</p>
          <p>No beds: {beds}</p>
          <p>From: {start}</p>
          <p>To: {end}</p>
          <p>Message: {message}</p>
        </div>
      )}
    </div>
  );
};

Enquiry.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Enquiry;
