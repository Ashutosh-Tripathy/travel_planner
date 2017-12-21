import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserRow = ({ user, onDeleteUser }) => {
    return (
        <tr>
            <td><Link to={'/user/' + user.id}>{user.name}</Link></td>
            {/* <td><label>{user.name}</label></td> */}
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
