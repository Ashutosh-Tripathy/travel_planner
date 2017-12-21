import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function tripReducer(state = initialState.trips, action) {
    switch (action.type) {
        case types.LOAD_TRIPS_SUCCESS:
            return action.trips;

        case types.LOAD_TRIP_SUCCESS:
            return action.trip;

        case types.DELETE_TRIP_SUCCESS:
            return action.trips;

        case types.UPDATE_TRIP_SUCCESS:
            return action.trips;

        case types.CREATE_TRIP_SUCCESS:
            return action.trips;

        default:
            return state;
    }
}
