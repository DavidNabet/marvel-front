import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import CharacterCard from "../components/CharacterCard";

const Characters = ({
  data,
  isLoading,
  skip,
  setSkip,
  limit,
  count,
  addToFavorite,
}) => {
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="body_wrapper">
      <div className="container characters_container">
        {data.map((result, i) => {
          return (
            <CharacterCard
              key={i}
              id={result._id}
              result={result}
              addToFavorite={addToFavorite}
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

export default Characters;
