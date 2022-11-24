import { useState, useEffect } from "react";
import axios from "axios";
import { BallSpinner } from "react-spinners-kit";
import CharacterCard from "../components/CharacterCard";
import ComicCard from "../components/ComicCard";

const Bookmark = ({ fav, removeFav }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://marvel-back.vercel.app/favorites",
          // "http://localhost:3200/favorites",
          {
            fav,
          }
        );
        setData(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [fav]);
  return isLoading ? (
    <BallSpinner size={30} color="#ed1d24" loading={isLoading} />
  ) : (
    <div id="favoris">
      <div
        className="body_wrapper"
        style={{
          height:
            window.innerHeight < window.screenTop ? "calc(100vh)" : "auto",
        }}
      >
        <div className="row bookmark_container">
          {data.map((elem, index) => {
            return index === 0 ? (
              elem.length > 0 ? (
                <div key={index}>
                  <div className="bookmark_character">
                    {elem.map((result) => (
                      // <div key={result._id} className="comics__inner">
                      //   <img
                      //     src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                      //     alt=""
                      //   />
                      //   <div className="comics_details">
                      //     <h3>{result.name}</h3>
                      //     {result.description !== null && (
                      //       <p>{result.description}</p>
                      //     )}
                      //   </div>
                      // </div>
                      <CharacterCard
                        key={result?._id}
                        result={result}
                        heart={false}
                        cross
                        removeFav={removeFav}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p key={index}>
                  <span>
                    Vous ne possédez pas de favoris dans la section Personnages
                  </span>
                </p>
              )
            ) : elem.length > 0 ? (
              <div key={index}>
                {elem.map((result) => (
                  //   <div key={result._id} className="comics__inner">
                  //     <img
                  //       src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
                  //       alt=""
                  //     />
                  //     <div className="comics_details">
                  //       <h3>{result.title}</h3>
                  //       {result.description !== null && (
                  //         <p>{result.description}</p>
                  //       )}
                  //     </div>
                  //   </div>
                  <ComicCard
                    key={result?._id}
                    result={result}
                    heart={false}
                    cross
                    removeFav={removeFav}
                  />
                ))}
              </div>
            ) : (
              <p key={index}>
                <span>
                  Vous ne possédez pas de favoris dans la section Comics
                </span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
