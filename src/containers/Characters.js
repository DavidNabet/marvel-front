// import Pagination from "../components/OldPagination";
import PaginationControls from "../components/PaginationControls";
import CharacterCard from "../components/CharacterCard";
import { BallSpinner } from "react-spinners-kit";

const Characters = ({
  data,
  isLoading,
  // skip,
  // setSkip,
  // limit,
  // count,
  searchParams,
  addFav,
  removeFav,
}) => {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "5";

  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ...

  const entries = data.slice(start, end);

  return isLoading ? (
    <BallSpinner size={30} color="#ed1d24" loading={isLoading} />
  ) : (
    <div className="body_wrapper">
      <div className="container characters_container">
        {entries.map((result, i) => {
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
        {/* <Pagination limit={limit} count={count} skip={skip} setSkip={setSkip} /> */}
        <PaginationControls
          hasNextPage={end < data.length}
          hasPrevPage={start > 0}
        />
      </div>
    </div>
  );
};

export default Characters;
