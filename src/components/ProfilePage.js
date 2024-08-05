import React from 'react';
import TableComponent from './TableComponent';

const ProfilePage = ({ users }) => {
  return (
    <div>
      <h1>Profiles</h1>
      <TableComponent users={users} deleteUser={() => {}} editUser={() => {}} />
    </div>
  );
};

export default ProfilePage;
