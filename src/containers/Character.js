import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BallSpinner } from "react-spinners-kit";

const Character = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://marvel-back.vercel.app/comics/${id}`
        // `http://localhost:3200/comics/${id}`
      );
      console.log(response);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  // Au chargement de la page, on affiche un loader, si les données sont bien chargées on affiche la page
  return isLoading ? (
    <BallSpinner size={30} color="#ed1d24" loading={isLoading} />
  ) : (
    <div className="body_wrapper" style={{ height: "100vh" }}>
      <div className="container character_container">
        <div className="character_image">
          <img
            src={`${data?.thumbnail.path}.${data?.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="character_details">
          <div className="character_title">
            <h3>{data?.name}</h3>
          </div>
          <div className="character_desc">
            {data?.description ? (
              <>
                <h5>Description</h5>
                <p>{data?.description}</p>
              </>
            ) : (
              <p>Pas de description lié à ce personnage</p>
            )}
          </div>
          <div
            className="character_comics"
            style={{ overflowY: data?.comics.length > 1 ? "scroll" : "hidden" }}
          >
            {data.comics.length > 1 ? (
              <div className="comic_tab">
                {data.comics.map((comic, i) => (
                  <div key={i}>
                    <img
                      style={{ width: 100, verticalAlign: "middle" }}
                      src={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                      alt=""
                    />
                    <span>{comic?.title}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>Pas de Comics affilié à ce personnage</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
