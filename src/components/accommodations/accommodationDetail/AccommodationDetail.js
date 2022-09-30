import { useState } from "react";
import { Link } from "react-router-dom";
import { FaDog, FaParking, FaMapMarkerAlt } from "react-icons/fa";
import { BsWifi2, BsFillTelephoneFill } from "react-icons/bs";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { IoMdMail } from "react-icons/io";
import Head from "../../common/Head";
import Heading from "../../typography/Heading";
import EnquiryForm from "../../enquiry/EnquiryForm";
import Modal from "../../layout/Modal";
import styles from "./AccommodationDetail.module.css";

const AccommodationDetail = ({
  id,
  name,
  subheading,
  cover_image,
  images,
  description,
  short_description,
  pets,
  breakfast,
  parking,
  wifi,
  price,
  address,
}) => {
  const [show, setShow] = useState(false);

  document.title = name;

  return (
    <>
      <Head
        title={name}
        addPostfixTitle={true}
        keywords="Bergen, Ulriksbanen, accommodation, hotel, guesthouse, bed&amp;breakfast"
        description={short_description}
      />
      <div className={styles.main}>
        <Heading title={name} />

        <div className={styles.flex}>
          <div className={styles.imageGalleryGrid}>
            <div>
              <img src={`${cover_image}`} alt={`${name}`} className={styles.mainImage} />
            </div>
            <div>
              <div className={styles.thumbnails}>
                {images.data.map((image, i) => (
                  <div key={i}>
                    <img src={`${image.attributes.formats.thumbnail.url}`} alt={name} className={styles.thumbnail} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.text}>
            <div>
              <h2>{subheading}</h2>
              <p>{description}</p>
            </div>

            <button className={styles.enquiryBtn} onClick={() => setShow(true)}>
              Reservation Enquiry
            </button>

            <Modal title="Enquiry" onClose={() => setShow(false)} show={show}>
              <EnquiryForm key={id} id={id} name={name} />
            </Modal>
          </div>
        </div>

        <div className={styles.horizontalLine}></div>
        <h3>Good to know</h3>
        <div className={styles.mainBottom}>
          <div>
            <p>
              {pets ? (
                <>
                  <FaDog className={styles.icons} /> Pets allowed{" "}
                </>
              ) : (
                " "
              )}
            </p>
            <p>
              {parking ? (
                <>
                  <FaParking className={styles.icons} /> Parking on the premises
                </>
              ) : (
                ""
              )}
            </p>
            <p>
              {wifi ? (
                <>
                  <BsWifi2 className={styles.icons} /> Wifi incl
                </>
              ) : (
                " "
              )}
            </p>
            <p>
              {breakfast ? (
                <>
                  <MdOutlineEmojiFoodBeverage className={styles.icons} /> Breakfast incl
                </>
              ) : (
                " "
              )}
            </p>
            <p className={styles.price}>From NOK {price},-/night</p>
          </div>
          <div className={styles.addressBox}>
            <p>
              <FaMapMarkerAlt className={styles.icons} />
              {address}
            </p>
            <p>
              <IoMdMail className={styles.icons} /> email@email.com
            </p>
            <p>
              <BsFillTelephoneFill className={styles.icons} /> 123 45 678
            </p>
            <div className={styles.center}>
              <button className={styles.enquiryBtn} onClick={() => setShow(true)}>
                Reservation Enquiry
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <Link to="/">Back to overview</Link>
        </div>
      </div>
    </>
  );
};

export default AccommodationDetail;
