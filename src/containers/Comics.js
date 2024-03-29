import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import ComicCard from "../components/ComicCard";
import { BallSpinner } from "react-spinners-kit";

const Comics = ({ title, addFav, removeFav }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(24);
  //On affiche les données des comics
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://marvel-back.vercel.app/comics",
        // "http://localhost:3200/comics",
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
    <BallSpinner size={30} color="#ed1d24" loading={isLoading} />
  ) : (
    <div className="body_wrapper">
      <div className="container page_container">
        {data.map((result) => {
          return (
            <ComicCard
              heart
              key={result?._id}
              id={result?._id}
              result={result}
              addFav={addFav}
              removeFav={removeFav}
            />
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
