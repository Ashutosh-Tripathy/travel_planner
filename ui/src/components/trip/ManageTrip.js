import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tripAction from '../../actions/tripAction';
import TripList from './TripList';
import TripForm from './TripForm';
import toastr from 'toastr';

class ManageTrip extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            trip: Object.assign({}, this.props.trip),
        };
        this.updateTripState = this.updateTripState.bind(this);
        this.saveTrip = this.saveTrip.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.trip.id != nextProps.trip.id) {
            this.setState({ trip: Object.assign({}, nextProps.trip) });
        }
    }

    updateTripState(event) {
        const field = event.target.name;
        let trip = Object.assign({}, this.state.trip);
        trip[field] = event.target.value;
        return this.setState({ trip: trip });
    }

    saveTrip(event) {
        event.preventDefault();
        this.setState({ saving: true });
        this.props.actions.saveTrip(this.state.trip)
            .then(() => this.redirect())
            .catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
    }

    redirect() {
        this.setState({ saving: false });
        this.context.router.push('/trips');
    }

    render() {
        return (
            <TripForm trip={this.state.trip}
                onChange={this.updateTripState} onSave={this.saveTrip} errors={this.state.errors}
                saving={this.state.saving} errors={this.state.errors || {}} />
        );
    }
}

ManageTrip.propTypes = {
    trip: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function getTripById(trips, id) {
    const trip = trips.filter(trip => trip.id == id);
    if (trip.length) return trip[0];
    return null;

}
ManageTrip.contextTypes = {
    router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
    const tripId = ownProps.params.id;
    let trip = { id: '', destination: '', startdate: '', enddate: '' };
    if (tripId && state.trips.length) {
        trip = getTripById(state.trips, tripId) || trip;
    }

    return {
        trip: trip,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tripAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTrip);
