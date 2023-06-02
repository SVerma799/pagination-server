"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/user";
import Pagination from "./components/Pagination";
import { paginate } from "../../utils/Paginate";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  let [usersCount, setUsersCount] = useState<number>(0);
  const pageSize = 10;
  useEffect(() => {
    getUsers(currentPage, pageSize);
    getUsersCount();
  }, []);

  const getUsersCount = async () => {
    const response = await fetch(`/api/users/count`);
    const data = await response.json();
    setUsersCount(data.usersCount);
  };

  const getUsers = async (pagenumber: number = 0, limit: number = 0) => {
    const response = await fetch(
      `/api/users?page=${pagenumber}&limit=${limit}`
    );
    const data = await response.json();
    setUsers(data);
  };

  function deleteButtonClick(id: any) {
    console.log("Function not implemented.");
  }

  function PageChangeHanlder(page: number): void {
    setCurrentPage(page);
    getUsers(page, pageSize);
  }

  function onNextPrevClick(type: string): void {
    if (type === "prev") {
      if (currentPage === 1) return;
      setCurrentPage(currentPage - 1);
      getUsers(currentPage - 1, pageSize);
    } else {
      if (currentPage === usersCount / pageSize) return;
      setCurrentPage(currentPage + 1);
      getUsers(currentPage + 1, pageSize);
    }
  }

  return (
    <main>
      <h2 className="text-center my-5">Pagination World</h2>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th> Password</th>
              <th> Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      //deleteButtonClick(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        itemsLength={usersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={PageChangeHanlder}
        onNextPrevClick={onNextPrevClick}
      />
    </main>
  );
}
