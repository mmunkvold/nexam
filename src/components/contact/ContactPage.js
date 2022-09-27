import Heading from "../typography/Heading";
import img from "../../images/bergen_dock.jpg";
import img2 from "../../images/bergen_ulriksbanen.jpg";
import ContactForm from "./ContactForm";
import styles from "./ContactPage.module.css";

const ContactPage = () => {
  document.title = "Contact Us";
  return (
    <>
      <div className={styles.title}>
        <Heading title="Get in touch" subtitle="We're here to help you" />
      </div>
      <div className={styles.flex}>
        <div className={styles.leftColumn}>
          <p>
            If you have any questions about this website or want to maybe put up your own accommodation - use this form and we will get back to you as
            soon as possible.
          </p>
          <p>
            NB! If you want to make any enquiries about specific accommodations, it's better to go to that specific page here and contact them
            directly using the enquiry form.
          </p>

          <div className={styles.flex}>
            <figure>
              <img src={img} alt="Docks downtown Bergen taken from seaside" />
              <figcaption>Be sure to check out the docks downtown Bergen!</figcaption>
            </figure>
            <figure>
              <img src={img2} alt="A red gondol hanging high in the air" />
              <figcaption>Don't forget to take the cable car to Ulriken!</figcaption>
            </figure>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <ContactForm className={styles.form} />
        </div>
      </div>
    </>
  );
};

export default ContactPage;
