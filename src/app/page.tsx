"use client";

import { useEffect, useState } from "react";
import { User } from "../../types/user";
import Pagination from "./components/Pagination";
import { paginate } from "../../utils/Paginate";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;
  const paginatedUsers: User[] = paginate(users, currentPage, pageSize);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      setUsers(data);
    };
    getUsers();
  }, []);

  function deleteButtonClick(id: any) {
    console.log("Function not implemented.");
  }

  function PageChangeHanlder(page: number): void {
    setCurrentPage(page);
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
            {paginatedUsers.map((item, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      console.log("clicked");
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
        items={users}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={PageChangeHanlder}
      />
    </main>
  );
}
