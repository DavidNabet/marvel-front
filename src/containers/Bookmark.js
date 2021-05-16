const Bookmark = () => {
  //Si les données du localStorage sont supprimé alors on renvoie un message
  let characters = localStorage.getItem("favoris")
    ? JSON.parse(localStorage.getItem("favoris"))
    : [];
  let comics = localStorage.getItem("favorisComics")
    ? JSON.parse(localStorage.getItem("favorisComics"))
    : [];
  return (
    <div id="favoris">
      <div
        className="body_wrapper"
        style={{
          height:
            window.innerHeight < window.screenTop ? "calc(100vh)" : "auto",
        }}
      >
        <div className="row bookmark_container">
          <div className="bookmark_character">
            {characters.length > 0 ? (
              characters.map((result) => (
                <div key={result._id} className="comics__inner">
                  <img
                    src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                    alt=""
                  />
                  <div className="comics_details">
                    <h3>{result.name}</h3>
                    {result.description !== null && <p>{result.description}</p>}
                  </div>
                </div>
              ))
            ) : characters === null || characters.length === 0 ? (
              <p>
                <span>
                  Vous ne possédez pas de favoris dans la section Personnages
                </span>
              </p>
            ) : null}
          </div>
          <div className="bookmark_comics">
            {comics.length > 0 ? (
              comics.map((result) => (
                <div key={result._id} className="comics__inner">
                  <img
                    src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                    alt=""
                  />
                  <div className="comics_details">
                    <h3>{result.title}</h3>
                    {result.description !== null && <p>{result.description}</p>}
                  </div>
                </div>
              ))
            ) : comics === null || comics.length === 0 ? (
              <p>
                <span>
                  Vous ne possédez pas de favoris dans la section Personnages
                </span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
