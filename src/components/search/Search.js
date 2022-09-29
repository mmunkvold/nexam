import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { PRODUCTS_URL } from "../../constants/api";
import styles from "./Search.module.css";

const url = PRODUCTS_URL;

const Search = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [result, setResult] = useState("");
  const [showHits, setShowHits] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await axios.get(url);
        setData(results.data.data);
        setFiltered(results.data.data);
      } catch (err) {
        throw new Error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const results = filtered?.filter((results) => results.attributes.name.toLowerCase().includes(result));

    setData(results);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const onChange = (e) => {
    setResult(e.target.value);
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          aria-label="Search"
          type="text"
          placeholder="Search accommodation..."
          value={result}
          onChange={onChange}
          onFocus={() => setShowHits(true)}
          onBlur={() => setShowHits(false)}
        />
        <div className={styles.searchResults}>
          <div>
            {showHits ? (
              <div>
                {data.map((result, id) => (
                  <ul key={id}>
                    <li className={styles.searchLink}>
                      <Link to={`detail/${result.id}`} onMouseDown={(event) => event.preventDefault()}>
                        {result.attributes.name}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Search;
