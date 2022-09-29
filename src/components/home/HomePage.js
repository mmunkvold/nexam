import Heading from "../typography/Heading";
import AccommodationAll from "../accommodations/accommodationAll/AccommodationAll";
import Head from "../common/Head";
import styles from "./HomePage.module.css";
import Search from "../search/Search";

const HomePage = () => {
  return (
    <>
      <Head
        title="Home"
        addPostfixTitle={true}
        keywords="Holidaze, accommodation, bergen"
        description="Find your next stay in Bergen with Holidaze"
      />
      <div className={styles.search}>
        <Search />
      </div>
      <div className={styles.center}>
        <Heading title="Find a place to stay in Bergen" subtitle="Hotels, Guesthouses and B&amp;B's" />
      </div>

      <AccommodationAll />
    </>
  );
};

export default HomePage;
