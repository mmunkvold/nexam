import { useEffect, useState } from "react";
import Accommodations from "./Accommodations";
import { PRODUCTS_URL } from "../../../constants/api";
import styles from "../../home/HomePage.module.css";

const url = PRODUCTS_URL;

const AccommodationList = () => {
  const [accommodation, setAccommodation] = useState([]);
  const [filteredAccommodation, setfilteredAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //change color on button when clicked/active
  const [isHotel, setIsHotel] = useState(false);
  const [isGuesthouse, setIsGuesthouse] = useState(false);
  const [isBedBreakfast, setIsBedBreakfast] = useState(false);
  const [isAccommodation, setIsAccommodation] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const results = await response.json();
          setAccommodation(results.data);
          setfilteredAccommodation(results.data);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>An error occured: {error}</div>;
  }

  //Filtering buttons
  const hotel = accommodation.filter((e) => e.attributes.type.toLowerCase().match("hotel"));
  const guesthouse = accommodation.filter((e) => e.attributes.type.toLowerCase().match("guesthouse"));
  const bedBreakfast = accommodation.filter((e) => e.attributes.type.toLowerCase().match("bedandbreakfast"));

  function showHotel() {
    setfilteredAccommodation(hotel);
    setIsHotel(true);
    setIsGuesthouse(false);
    setIsBedBreakfast(false);
    setIsAccommodation(false);
  }

  function showGuesthouse() {
    setfilteredAccommodation(guesthouse);
    setIsGuesthouse(true);
    setIsBedBreakfast(false);
    setIsHotel(false);
    setIsAccommodation(false);
  }

  function showBedBreakfast() {
    setfilteredAccommodation(bedBreakfast);
    setIsBedBreakfast(true);
    setIsHotel(false);
    setIsGuesthouse(false);
    setIsAccommodation(false);
  }

  function showAll() {
    setfilteredAccommodation(accommodation);
    setIsAccommodation(true);
    setIsBedBreakfast(false);
    setIsHotel(false);
    setIsGuesthouse(false);
  }

  return (
    <>
      <div className={styles.center}>
        <div>
          <button className={isHotel ? styles.activeBtn : styles.button} onClick={() => showHotel()}>
            Hotels
          </button>
          <button className={isGuesthouse ? styles.activeBtn : styles.button} onClick={() => showGuesthouse()}>
            Guesthouses
          </button>
          <button className={isBedBreakfast ? styles.activeBtn : styles.button} onClick={() => showBedBreakfast()}>
            B&amp;B's
          </button>
          <button className={isAccommodation ? styles.activeBtn : styles.button} onClick={() => showAll()}>
            Show all
          </button>
        </div>
      </div>
      <div className={styles.gridContainer}>
        {filteredAccommodation &&
          filteredAccommodation.map((item) => {
            const { id } = item;
            const { name, price, cover_image, pets_allowed, parking, breakfast_incl, wifi, type } = item.attributes;
            return (
              <Accommodations
                key={id}
                id={id}
                name={name}
                price={price}
                cover_image={cover_image}
                pets={pets_allowed}
                parking={parking}
                breakfast={breakfast_incl}
                wifi={wifi}
                type={type}
              />
            );
          })}
      </div>
    </>
  );
};

export default AccommodationList;
