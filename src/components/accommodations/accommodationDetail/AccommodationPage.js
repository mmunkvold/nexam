import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { itemUrl } from "../../../constants/api";
import AccommodationDetail from "./AccommodationDetail";

const AccommodationPage = () => {
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate("/");
  }

  const url = itemUrl(id);

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const results = await response.json();

            setAccommodation(results.data);
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
    },
    [url]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occured: {error}</div>;
  }

  return (
    <>
      <AccommodationDetail
        key={id}
        name={accommodation.attributes.name}
        subheading={accommodation.attributes.subheading}
        cover_image={accommodation.attributes.cover_image.data.attributes.url}
        description={accommodation.attributes.description}
        short_description={accommodation.attributes.short_description}
        pets={accommodation.attributes.pets_allowed}
        parking={accommodation.attributes.parking}
        wifi={accommodation.attributes.wifi}
        breakfast={accommodation.attributes.breakfast_incl}
        address={accommodation.attributes.address}
        price={accommodation.attributes.price}
        images={accommodation.attributes.images}
      />
    </>
  );
};

export default AccommodationPage;
