import Pagination from "../components/Pagination";
import CharacterCard from "../components/CharacterCard";
import { BallSpinner } from "react-spinners-kit";

const Characters = ({
  data,
  isLoading,
  skip,
  setSkip,
  limit,
  count,
  addFav,
  removeFav,
}) => {
  return isLoading ? (
    <BallSpinner size={30} color="#ed1d24" loading={isLoading} />
  ) : (
    <div className="body_wrapper">
      <div className="container characters_container">
        {data.map((result, i) => {
          return (
            <CharacterCard
              key={i}
              id={result._id}
              result={result}
              addFav={addFav}
              removeFav={removeFav}
              heart
            />
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
