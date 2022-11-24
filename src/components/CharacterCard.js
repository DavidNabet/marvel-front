import { Link } from "react-router-dom";
import StarIcon from "./StarIcon";

const CharacterCard = ({ id, result, addFav, removeFav, heart, cross }) => {
  const url = result?.thumbnail?.path + "." + result?.thumbnail?.extension;
  return (
    <figure className="characters__inner">
      {heart ? (
        <span className="pos_star" onClick={() => addFav(id)}>
          <StarIcon className="starRed" />
        </span>
      ) : cross ? (
        <span className="pos_star" onClick={() => removeFav(id)}>
          <StarIcon className="star" />
        </span>
      ) : null}
      <Link to={`/character/${id}`}>
        <img src={url} alt="character" />
        <figcaption>
          <h3>{result?.name}</h3>
          {result?.description ? (
            <p>{result?.description}</p>
          ) : (
            <p>Aucune description</p>
          )}
        </figcaption>
      </Link>
    </figure>
  );
};

export default CharacterCard;
