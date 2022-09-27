import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import styles from "./Modal.module.css";
import styles2 from "../../formElements/buttons/Button.module.css";
import "../../../App.css";

const Modal = (props) => {
  const nodeRef = useRef(null);

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  };
  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <CSSTransition nodeRef={nodeRef} in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300 }}>
      <div ref={nodeRef} className="modal" onClick={props.onClose}>
        <div className={styles.modal2}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles2.button} onClick={props.onClose}>
              Close
            </button>
            <div className={styles.modalBody}>{props.children}</div>
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById("root")
  );
};

export default Modal;
