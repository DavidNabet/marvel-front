import { useState, useEffect } from "react";
import StarIcon from "./StarIcon";

const ComicCard = ({ id, result, addToFavorite }) => {
  const [favoris, setFavoris] = useState("star");
  const text = result.description?.slice(0, 100) + "...";

  useEffect(() => {
    if (localStorage.getItem("favorisComics") !== null) {
      // Si l'id du résultat existe dans le localStorage
      if (localStorage.getItem("favorisComics").includes(result._id)) {
        if (result._id === id) {
          // Alors on peut changer la valeur
          setFavoris(!favoris);
        }
      }
    } else {
      localStorage.removeItem("favorisComics");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div key={result._id} className="comics__inner">
      <span
        id="pos_star"
        onClick={(e) => {
          addToFavorite(e, "comics", result);
          setFavoris(!favoris);
        }}
      >
        <StarIcon className={favoris ? "star" : "starRed"} />
      </span>
      <img
        src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
        alt=""
      />
      <div className="comics_details">
        <h3>{result.title}</h3>
        {result.description ? (
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        ) : (
          <p style={{ textAlign: "center" }}>Aucune description</p>
        )}
      </div>
    </div>
  );
};

export default ComicCard;
