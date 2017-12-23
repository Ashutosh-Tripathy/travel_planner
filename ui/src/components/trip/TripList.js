import TripRow from './TripRow';
import React, { PropTypes } from 'react';

const TripList = ({ trips, onDeleteTrip }) => {
    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Destination</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Days remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {trips.map((trip, j) => <TripRow key={j} trip={trip} onDeleteTrip={onDeleteTrip} />)}
                </tbody>
            </table>
        </div>
    );
};

TripList.propTypes = {
    trips: PropTypes.array.isRequired,
    onDeleteTrip: PropTypes.func.isRequired
};


export default TripList;
