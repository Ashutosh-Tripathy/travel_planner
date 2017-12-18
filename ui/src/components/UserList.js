import UserRow from './UserRow';
import React, { PropTypes } from 'react';

const UserList = ({ users, onDeleteUser }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, j) => <UserRow key={j} user={user} onDeleteUser={onDeleteUser} />)}
                </tbody>
            </table>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.array.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};


export default UserList;