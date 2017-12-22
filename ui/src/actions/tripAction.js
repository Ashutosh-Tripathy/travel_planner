import * as types from './actionTypes';
// import tripApi from '../api/tripApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import toastr from 'toastr';
import { ucs2 } from 'punycode';
import { getToken } from '../actions/localStoreAction';

const headers = {
    'x-access-token': getToken(), 'Accept': 'application/json',
    'Content-Type': 'application/json'
};

// import { start } from 'repl';


export function loadTripsSuccess(trips) {
    return { type: types.LOAD_TRIPS_SUCCESS, trips };
}

export function loadTripSuccess(trip) {
    return { type: types.LOAD_TRIP_SUCCESS, trip };
}

export function deleteTripSuccess(trips) {
    return { type: types.DELETE_TRIP_SUCCESS, trips };
}

export function updateTripSuccess(trips) {
    return { type: types.UPDATE_TRIP_SUCCESS, trips };
}

export function createTripSuccess(trips) {
    return { type: types.CREATE_TRIP_SUCCESS, trips };
}


export function getTrips() {
    return function (dispatch, getState) {
        var state = getState();
        var url = "http://52.230.121.175/api/trips";
        dispatch(beginAjaxCall());
        return fetch(url, { headers })
            .then(function (result) {
                if (result.status === 200) {
                    return result.json();
                }
                throw "request failed";
            })
            .then(function (jsonResult) {
                dispatch(loadTripsSuccess(jsonResult));
            })
            .catch(function (err) {
                dispatch(ajaxCallError());
                throw (err);
                // sweetAlert("Oops...", "Couldn't fetch repos for trip: " + state.trip, "error");
            });
    }
}


export function deleteTrip(id, trips) {
    //    let id = event.target.id;
    // this.state.dispatch(deleteTrip(id));

    return function (dispatch, getState) {
        var state = getState();
        var url = 'http://52.230.121.175/api/trip/' + id;
        dispatch(beginAjaxCall());
        return fetch(url, {
            method: "DELETE",
            headers
        })
            .then(function (result) {
                if (result.status === 200) {
                    return result.json();
                }
                throw "request failed";
            })
            .then(function (jsonResult) {
                debugger;
                dispatch(deleteTripSuccess(state.trips.filter(trip => trip.id != id)));
                toastr.success('Trip deleted successfuly');

                // dispatch(deleteTripSuccess(jsonResult));
            })
            .catch(function (err) {
                dispatch(ajaxCallError());
                throw (err);
                // sweetAlert("Oops...", "Couldn't fetch repos for trip: " + state.trip, "error");
            });
    }
}


export function saveTrip(trip) {
    return function (dispatch, getState) {
        var url = 'http://52.230.121.175/api/trip';
        var state = getState();
        if (trip.destination.length < 1) {
            throw (`Title must be at least 1 characters.`);
        }
        dispatch(beginAjaxCall());
        if (trip.id) {
            url += "/" + trip.id;
            console.log(`Patch trip: ${trip.id}, url: ${url}, destination: ${trip.destination}, startdate: ${trip.startdate}, enddate: ${trip.enddate}`);
            if (!trip.destination) delete trip.destination;
            if (!trip.startdate) delete trip.startdate;
            if (!trip.enddate) delete trip.enddate;
            return fetch(url, {
                method: "PATCH",
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
                headers,
                body: JSON.stringify(trip)
            })
                .then(function (result) {
                    if (result.status === 200) {
                        return result.json();
                    }
                    throw "request failed";
                })
                .then(function (jsonResult) {
                    let tripIndex = state.trips.findIndex((obj => obj.id == trip.id));
                    let trips = JSON.parse(JSON.stringify(state.trips));
                    trips[tripIndex] = trip;
                    dispatch(updateTripSuccess(trips));
                    toastr.success('Trip updated successfuly');

                    // dispatch(deleteTripSuccess(jsonResult));
                })
                .catch(function (err) {
                    dispatch(ajaxCallError());
                    throw (err);
                    // sweetAlert("Oops...", "Couldn't fetch repos for trip: " + state.trip, "error");
                });
        } else {
            //Just simulating creation here.
            //The server would generate ids and watchHref's for new trips in a real app.
            //Cloning so copy returned is passed by value rather than by reference.
            //	    console.log(`Post trip: ${id}, url: ${url}, destination: ${destination}, startdate: ${textstartdate}, enddate: ${enddate}`);

            return fetch(url, {
                method: "POST",
                // headers: {
                //     'Accept': 'application/json',
                //     'Content-Type': 'application/json'
                // },
                headers,
                body: JSON.stringify(trip)
            })
                .then(function (result) {
                    if (result.status === 200) {
                        return result.json();
                    }
                    throw "request failed";
                })
                .then(function (jsonResult) {
                    debugger;
                    let trips = JSON.parse(JSON.stringify(state.trips));
                    trips.push(jsonResult);
                    dispatch(createTripSuccess(trips));
                    toastr.success('Successfuly created trip.');

                    // dispatch(deleteTripSuccess(jsonResult));
                })
                .catch(function (err) {
                    dispatch(ajaxCallError());
                    throw (err);
                    // sweetAlert("Oops...", "Couldn't fetch repos for trip: " + state.trip, "error");
                });
        }
    };
}
        // return function (dispatch) {
        //     dispatch(beginAjaxCall());
        //     return tripApi.getAllTrips().then(trips => {
        //         dispatch(loadTripsSuccess(trips));
        //     }).catch(error => {
        //         throw (error);
        //     });
        // };
