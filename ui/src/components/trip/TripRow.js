import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const TripRow = ({ trip, onDeleteTrip }) => {
    return (
        <tr>
            <td><Link to={'/trip/' + trip.id}>{trip.destination}</Link></td>
            {/* <td><label>{trip.name}</label></td> */}
            <td><label>{trip.startdate}</label></td>
            <td><label>{trip.enddate}</label></td>
            <td><input type="button" className="btn btn-sm btn-danger" value="remove" id={trip.id} onClick={onDeleteTrip} /></td>
        </tr>
    );
};

TripRow.propTypes = {
    trip: PropTypes.object.isRequired,
    onDeleteTrip: PropTypes.func.isRequired
};
export default TripRow;
