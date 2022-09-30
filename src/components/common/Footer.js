import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import logo from "../../logo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  const handleOnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer>
      <div className={styles.footerContent}>
        <ul className={styles.ul}>
          <li className={styles.title}>Holidaze - Accommodation in Bergen</li>
          <div className={styles.horizontalLine}></div>
          <li className={styles.title}>Bergen City Travel Agency</li>
          <li>Nedre Kaikanten 4</li>
          <li>5011 Bergen</li>
          <div className={styles.horizontalLine}></div>
          <li>Office hours: Mon-sat 08-18 | Sun 10-20</li>
          <li>
            <BsFillTelephoneFill /> 555 55 555
          </li>
          <li>
            <IoMdMail /> post@holidaze-bergen.no
          </li>
          <li className={styles.copyright}>
            <a href="/">© Holidaze 2022</a>
          </li>
        </ul>
        <div>
          <a href="/">
            <img src={logo} className={styles.logo} alt="Back to home" />
          </a>

          <button id="totop" onClick={handleOnClick} className={styles.button}>
            Top of page
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
