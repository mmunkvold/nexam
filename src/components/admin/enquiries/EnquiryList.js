import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import Enquiry from "./Enquiry";
import styles from "./Enquiry.module.css";

const EnquiryList = () => {
  const [enquiries, setEnquiries] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(function () {
    async function getEnquiries() {
      try {
        const response = await http.get("enquiries");
        setEnquiries(response.data.data);
      } catch (error) {
        setError("Sorry, couldn't get any messages");
      }
    }
    getEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className={styles.flex}>
        {enquiries &&
          enquiries.map((item) => {
            const { id } = item;
            const { fullname, email, message, accommodationName, beds, start, end } = item.attributes;
            return (
              <Enquiry
                key={id}
                id={id}
                fullname={fullname}
                email={email}
                message={message}
                accommodationName={accommodationName}
                beds={beds}
                start={start}
                end={end}
              />
            );
          })}
      </div>
    </div>
  );
};

export default EnquiryList;
