import Head from "../common/Head";
import Heading from "../typography/Heading";
import img from "../../images/bergen_street.jpg";
import styles from "./AboutUsPage.module.css";

const AboutUsPage = () => {
  document.title = "About Us";
  return (
    <>
      <Head
        title="About Us"
        addPostfixTitle={true}
        keywords="About, Holidaze"
        description="Holidaze is a website created by us, a little local tour agency called Bergen City Travel Agency"
      />
      <Heading title="Making visiting Bergen easier" />
      <h2>A little bit about us</h2>
      <div className={styles.flex}>
        <div className={styles.leftColumn}>
          <p>
            We are a small local travel agency located downtown Bergen, probably the best place in Norway! No, seriously, Bergen has a lot to offer,
            and we want you to come visit us.
          </p>
          <p>
            We created this website to make it easier for you to find a place to stay here in Bergen. On these pages you'll find different kinds of
            accommodation - hotels, guesthouses and B&amp;B's.
          </p>
          <p>
            If you have any questions or if you want to put your accommodation up here, use the <a href="/contact">contact form</a> and we'll take it
            from there.
          </p>
        </div>
        <div className={styles.rightColumn}>
          <img src={img} alt="Street with white houses" className={styles.img} />
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
