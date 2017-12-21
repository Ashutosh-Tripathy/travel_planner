import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import TripList from './TripList';
import toastr from 'toastr';
import * as tripAction from '../../actions/tripAction';
toastr.options.preventDuplicates = true;

class Trip extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            trips: this.props.trips || []
        };
        this.initialState = { trips: [] };
        this.deleteTrip = this.deleteTrip.bind(this);
        this.redirectToAddTripPage = this.redirectToAddTripPage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(() => ({ trips: nextProps.trips }));
    }

    redirectToAddTripPage() {
        browserHistory.push('/trip');
    }

    deleteTrip(event) {
        let id = event.target.id;
        let trips = Object.assign({}, this.state.trips);
        this.props.actions.deleteTrip(id, trips)
            .catch((error) => {
                toastr.error(error);
                this.setState({ saving: false });
            });
        // this.state.dispatch(deleteTrip(id));
        // toastr.success('Trip deleted successfuly');
        // return this.setState((prevState, props) => {
        //     return { trips: prevState.trips.filter(trip => trip.id != id) };
        // });
    }

    render() {
        const { trips } = this.state;
        return (
            <div>
                <div>
                    <h1>Trips</h1>
                    <input type="submit" value="Add Trip" className="btn btn-primary" onClick={this.redirectToAddTripPage} />
                </div>
                <div className="row">
                    <div className="col-sm-8 col-md-8 col-lg-8">{<TripList trips={trips} onDeleteTrip={this.deleteTrip} />}</div>
                </div>
            </div>
        );
    }
}


Trip.propTypes = {
    trips: PropTypes.array.isRequired
};

Trip.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        trips: state.trips
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(tripAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Trip);
