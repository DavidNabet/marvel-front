import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Cookies from "js-cookie";

const Comics = ({ title, addToFavorite }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(24);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://marvel-back-project.herokuapp.com/comics",
        {
          params: {
            title: title,
            limit: limit,
            skip: skip,
          },
        }
      );
      console.log(response.data);
      setData(response.data.results);
      setLimit(response.data.limit);
      setCount(response.data.count);
      setIsLoading(false);
    };
    fetchData();
  }, [title, skip, limit]);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="comics_wrapper">
      <div className="container comics_container">
        {data.map((result) => {
          return (
            <div key={result._id} className="comics__inner">
              <span id="pos_star" onClick={() => addToFavorite(result)}>
                <i className="far fa-star"></i>
              </span>
              <img
                src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                alt=""
              />
              <div className="comics_details">
                <h3>{result.title}</h3>
                {result.description !== null && <p>{result.description}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="characters_pagination">
        <Pagination limit={limit} count={count} skip={skip} setSkip={setSkip} />
      </div>
    </div>
  );
};

export default Comics;
