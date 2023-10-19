import { Link, useHistory } from "react-router-dom";
import useQuery from "../hooks/useQuery";

const PaginationControls = ({ hasNextPage, hasPrevPage }) => {
  const router = useHistory();
  const searchParams = useQuery();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "5";

  return (
    <div className="flex gap-2">
      <button
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        Page précédente
      </button>
      <span>
        {/* {Math.ceil(skip / limit) + 1} / {totalPage} pages */}
        {page} / {Math.ceil(10 / Number(per_page))}
      </span>
      <button
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        Page suivante
      </button>
    </div>
  );
};

export default PaginationControls;
