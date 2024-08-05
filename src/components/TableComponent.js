import React, { useState } from 'react';

const TableComponent = ({ users, deleteUser, editUser }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>DOB</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.dob}</td>
              <td>{user.city}</td>
              <td>{user.district}</td>
              <td>{user.province}</td>
              <td>{user.country}</td>
              <td>
                {user.profilePicture && user.profilePicture instanceof Blob ? (
                  <img
                    src={URL.createObjectURL(user.profilePicture)}
                    alt="Profile"
                    width="50"
                    height="50"
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <button onClick={() => editUser(index)}>Edit</button>
                <button onClick={() => deleteUser(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {currentPage > 1 && <button onClick={handlePreviousPage}>Previous</button>}
        {indexOfLastUser < users.length && <button onClick={handleNextPage}>Next</button>}
      </div>
    </div>
  );
};

export default TableComponent;
