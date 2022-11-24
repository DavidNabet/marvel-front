import StarIcon from "./StarIcon";

const ComicCard = ({ id, result, addFav, removeFav, heart, cross }) => {
  const url = result?.thumbnail?.path + "." + result?.thumbnail?.extension;
  const text = result?.description?.slice(0, 250) + "...";

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
      <>
        <img src={url} alt="comics" />
        <figcaption>
          <h3>{result?.title}</h3>
          {result?.description ? (
            <p dangerouslySetInnerHTML={{ __html: text }} />
          ) : (
            <p style={{ textAlign: "center" }}>Aucune description</p>
          )}
        </figcaption>
      </>
    </figure>
  );
};

export default ComicCard;
