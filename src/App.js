import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import ProfilePage from './components/ProfilePage';

const App = () => {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = (index) => {
    const newUsers = users.filter((_, i) => i !== index);
    setUsers(newUsers);
  };

  const editUser = (index, updatedUser) => {
    const newUsers = users.map((user, i) => (i === index ? updatedUser : user));
    setUsers(newUsers);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={
            <>
              <FormComponent addUser={addUser} />
              <TableComponent users={users} deleteUser={deleteUser} editUser={editUser} />
              <Link to="/profiles">
                <button>Go to Profiles</button>
              </Link>
            </>
          } />
          <Route path="/profiles" element={<ProfilePage users={users} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
