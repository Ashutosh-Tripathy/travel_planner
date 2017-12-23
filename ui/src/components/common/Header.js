import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';
import { getUser } from '../../actions/localStoreAction'

// if (getUser().isAdmin) || getUser().isManager)
const Header = ({ loading }) => {
    var usernav = "";
    if (!getUser()) {
	return <div></div>;
	}
    if (getUser().isAdmin || getUser().isManager) {
        usernav = <IndexLink to="/users" activeClassName="active">Users</IndexLink>;
    }
    return (
	<div>
	<h3> Welcome {getUser().name} </h3>
        <nav>
            <IndexLink to="/" activeClassName="active">Trips</IndexLink>
            {" | "}
            {usernav}
	    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;	    
            <IndexLink to="/authenticate" activeClassName="active">Logout</IndexLink>
            {loading && <LoadingDots interval={100} dots={20} />}
        </nav>
       </div>
    );
};

Header.propTypes = {
    loading: PropTypes.bool.isRequired
};
export default Header;
