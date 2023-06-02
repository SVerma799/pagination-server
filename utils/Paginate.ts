import _ from "lodash";
import { User } from "../types/user";

export const paginate = (
  items: User[],
  pageNumber: number,
  pageSize: number
) => {
  console.log("items", items);
  console.log("pageNumber", pageNumber);
  console.log("pageSize", pageSize);

  let startIndex = (pageNumber - 1) * pageSize;
  const endIndex = pageNumber * pageSize - 1;

  console.log("startIndex", startIndex);
  console.log("endIndex", endIndex);

  const arritems = _(items).slice(startIndex).take(pageSize).value();
  console.log("arritems", arritems);
  return arritems;
};
