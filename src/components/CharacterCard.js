import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarIcon from "./StarIcon";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <figure className="characters__inner">
      <span
        id="pos_star"
        onClick={(e) => {
          addToFavorite(e, "character", result);
          setFavoris(!favoris);
        }}
      >
        <StarIcon className={favoris ? "star" : "starRed"} />
      </span>
      <Link to={`/character/${result._id}`}>
        <img
          src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
          alt=""
        />
        <figcaption>
          <h3>{result.name}</h3>
          {result.description ? (
            <p>{result.description}</p>
          ) : (
            <p>Aucune description</p>
          )}
        </figcaption>
      </Link>
    </figure>
  );
};

export default CharacterCard;
