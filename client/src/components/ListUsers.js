import React, { Fragment, useState, useEffect } from "react";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const request = await fetch("http://localhost:5000/runners");
      //console.log(request);
      const jsonData = await request.json();

      setUsers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteUser = async (userID) => {
    try {
      const request = await fetch(`http://localhost:5000/runners/${userID}`, {
        method: "DELETE",
      });

      setUsers(users.filter((user) => user.runner_id !== userID));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <Fragment>
      <h1 className="text-center mt-5">All Marathon Registered Users</h1>
      <table title="Registered Users" className="table text-center mt-5">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.runner_id}>
              <td>{user.name}</td>
              <td>{user.dateofbirth}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteUser(user.runner_id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-5">
        <a href="/">
          <button className="btn btn-primary">
            Register for Marathon Here!
          </button>
        </a>
      </div>
    </Fragment>
  );
};

export default ListUsers;
