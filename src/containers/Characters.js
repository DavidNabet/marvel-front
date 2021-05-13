import { Link } from "react-router-dom";

const Characters = ({ data, isLoading }) => {
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="characters_wrapper">
      <div className="container characters_container">
        {data.results.map((result) => {
          return (
            <figure key={result._id} className="characters__inner">
              <Link to="/">
                <img
                  src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                  alt=""
                />
                <figcaption>
                  <h3>{result.name}</h3>
                  <p>{result.description}</p>
                </figcaption>
              </Link>
            </figure>
          );
        })}
      </div>
      <div className="characters_pagination">
        <button>Suivant</button>
      </div>
    </div>
  );
};

export default Characters;
