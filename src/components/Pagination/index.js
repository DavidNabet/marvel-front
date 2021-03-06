import React from "react";
import "./index.css";

const Pagination = ({ limit, count, setSkip, skip }) => {
  const totalPage = Math.ceil(count / limit);
  const nbrePage = totalPage * limit - limit;

  const nextPage = () => {
    if (skip < count) {
      setSkip(skip + limit);
    }
  };

  const prevPage = () => {
    if (skip > 0) {
      setSkip(skip - limit);
    }
  };

  return (
    <>
      <button className="" onClick={() => setSkip(0)}>
        Première Page
      </button>
      <button className="" onClick={prevPage}>
        Précédent
      </button>
      <span>
        {Math.ceil(skip / limit) + 1} / {totalPage} pages
      </span>
      <button className="" onClick={nextPage}>
        Suivant
      </button>
      <button className="" onClick={() => setSkip(nbrePage)}>
        Dernière Page
      </button>
    </>
  );
};

export default Pagination;
