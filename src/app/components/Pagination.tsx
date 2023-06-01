import _ from "lodash";
import { FC } from "react";
import { User } from "../../../types/user";

interface PaginationProps {
  items: User[];
  pageSize: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  items,
  pageSize,
  currentPage,
  onPageChanged,
}) => {
  const pagesCount = items.length / pageSize;
  const pages = Array.from(
    { length: (pageSize - 1) / 1 + 1 },
    (value, index) => 1 + index * 1
  );

  console.log("pages", pages);
  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example" className="mx-auto">
        <ul className="pagination">
          {pages.map((page: number, idx: number) => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item "
              }
              key={idx}
            >
              <a
                className="page-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  onPageChanged(page);
                }}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
