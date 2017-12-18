import React, { PropTypes } from 'react';

const UserRow = ({ user, onDeleteUser }) => {
    return (
        <tr>
            <td><label>{user.name}</label></td>
            <td><label>{user.role}</label></td>
            <td><input type="button" className="btn btn-sm btn-danger" value="remove" id={user.id} onClick={onDeleteUser} /></td>
        </tr>
    );
};

UserRow.propTypes = {
    user: PropTypes.object.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};
export default UserRow;
