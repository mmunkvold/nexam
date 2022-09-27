import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaDog, FaParking } from "react-icons/fa";
import { BsWifi2 } from "react-icons/bs";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import styles from "../../home/HomePage.module.css";

//this is accommodations shown on the accommodation all page
const Accommodations = ({ id, name, pets, cover_image, parking, wifi, breakfast, price, type }) => {
  return (
    <div>
      <Link to={`detail/${id}`}>
        <div className={`${styles.card} ${styles.cardImg}`} style={{ backgroundImage: `url('${cover_image.data.attributes.url}')` }}>
          <div className={styles.overlay}>
            <h3>{name}</h3>
            <p>
              {pets ? <FaDog className={styles.icons} /> : " "}
              {parking ? <FaParking className={styles.icons} /> : ""}
              {wifi ? <BsWifi2 className={styles.icons} /> : " "}
              {breakfast ? <MdOutlineEmojiFoodBeverage className={styles.icons} /> : " "} <small>NOK {price},-</small>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

Accommodations.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Accommodations;
