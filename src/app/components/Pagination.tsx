import _ from "lodash";
import { FC } from "react";
import { User } from "../../../types/user";

interface PaginationProps {
  itemsLength: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  onNextPrevClick: (type: string) => void;
}

const Pagination: FC<PaginationProps> = ({
  itemsLength,
  pageSize,
  currentPage,
  onPageChanged,
  onNextPrevClick,
}) => {
  let pages = Array.from(
    { length: itemsLength / pageSize },
    (value, index) => 1 + index * 1
  );

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation example" className="mx-auto">
        <ul className="pagination">
          <li className="page-item">
            <a
              className="page-link"
              onClick={() => {
                onNextPrevClick("prev");
              }}
              style={{ cursor: "pointer" }}
            >
              Previous
            </a>
          </li>
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
          <li className="page-item">
            <a
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                onNextPrevClick("next");
              }}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
