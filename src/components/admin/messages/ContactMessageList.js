import "../../../App.css";
import { useEffect, useState } from "react";
import ContactMessage from "./ContactMessage";
import useAxios from "../../../hooks/useAxios";
import styles from "../enquiries/Enquiry.module.css";

const ContactMessageList = () => {
  const [messages, setMessages] = useState([]);
  //const [loading, setLoading] = useState(true);
  const [setError] = useState(null);

  const http = useAxios();

  useEffect(function () {
    async function getMessages() {
      try {
        const response = await http.get("messages");
        //console.log("response", response);
        setMessages(response.data.data);
      } catch (error) {
        console.log("error getting messages");
        setError(error.toString());
      }
    }
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className={styles.flex}>
        {messages &&
          messages.map((item) => {
            const { id } = item;
            const { fullname, email, message, subject } = item.attributes;
            return <ContactMessage key={id} id={id} fullname={fullname} email={email} message={message} subject={subject} />;
          })}
      </div>
    </div>
  );
};

export default ContactMessageList;
