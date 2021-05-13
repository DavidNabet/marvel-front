import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const Characters = ({ data, isLoading, skip, setSkip, limit, count }) => {
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="characters_wrapper">
      <div className="container characters_container">
        {data.map((result) => {
          return (
            <figure key={result._id} className="characters__inner">
              <Link to={`/character/${result._id}`}>
                <img
                  src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                  alt=""
                />
                <figcaption>
                  <h3>{result.name}</h3>
                  {result.description && <p>{result.description}</p>}
                </figcaption>
              </Link>
            </figure>
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
