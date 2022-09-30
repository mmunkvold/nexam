import Heading from "../typography/Heading";
import AccommodationAll from "../accommodations/accommodationAll/AccommodationAll";
import Head from "../common/Head";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <>
      <Head
        title="Home"
        addPostfixTitle={true}
        keywords="Holidaze, accommodation, bergen"
        description="Find your next stay in Bergen with Holidaze"
      />

      <div className={styles.center}>
        <Heading title="Find a place to stay in Bergen" />
      </div>

      <AccommodationAll />
    </>
  );
};

export default HomePage;
