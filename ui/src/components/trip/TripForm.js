import React from 'react';
import TextInput from '../common/TextInput';
import DateInput from '../common/DateInput';
import SelectInput from '../common/SelectInput';
import NumberInput from '../common/NumberInput';
import { getUser } from '../../actions/localStoreAction';


const TripForm = ({ trip, onSave, onChange, saving, errors }) => {
    var userIdInput = getUser().isAdmin ? <NumberInput name="user_id" label="User id" value={trip.user_id} onChange={onChange} defaultOption="End Date" error={errors.authorId} readonly={trip.user_id > 0} /> : '';

    return (
        <form>
            <h1>Manage Trip</h1>
            <div className="col-md-6 col-lg-6">
                <TextInput name="destination" label="Destination" value={trip.destination} onChange={onChange}
                    error={errors.title} />

                <DateInput name="startdate" label="Start Date" value={trip.startdate}
                    defaultOption="Select Start Date" onChange={onChange} options={[{ value: 'trip', text: 'Trip' }, { value: 'manager', text: 'Manager' }, { value: 'admin', text: 'Admin' }]}
                    error={errors.authorId} />

                <DateInput name="enddate" label="End Date" value={trip.enddate} onChange={onChange}
                    defaultOption="End Date" error={errors.authorId} />

                {userIdInput}
                <input
                    type="submit" disabled={saving} value={saving ? 'saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={onSave} />
            </div>
        </form>
    );
};

TripForm.propTypes = {
    trip: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default TripForm;


