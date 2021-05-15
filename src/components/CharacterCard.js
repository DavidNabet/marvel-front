import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CharacterCard = ({ id, result, addToFavorite }) => {
  const [favoris, setFavoris] = useState("star");

  useEffect(() => {
    if (localStorage.getItem("favoris") !== null) {
      if (localStorage.getItem("favoris").includes(result._id)) {
        if (result._id === id) {
          setFavoris(!favoris);
        }
      }
    } else {
      localStorage.removeItem("favoris");
    }
  }, [id]);

  return (
    <figure className="characters__inner">
      <span
        id="pos_star"
        className={favoris ? "star" : "starRed"}
        onClick={() => {
          addToFavorite(result);
          setFavoris(!favoris);
        }}
      >
        <i className="far fa-star"></i>
      </span>
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
};

export default CharacterCard;
