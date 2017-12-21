import React from 'react';
import TextInput from './common/TextInput';
import SelectInput from './common/SelectInput';
import PasswordInput from './common/PasswordInput';

const UserForm = ({ user, onSave, onChange, saving, errors }) => {
    return (
        <form>
            <h1>Manage User</h1>
            <div className="col-md-6 col-lg-6">
                <TextInput name="name" label="Name" value={user.name} onChange={onChange}
                    error={errors.title} />

                <SelectInput name="role" label="Role" value={user.role}
                    defaultOption="Select Role" onChange={onChange} options={[{ value: 'user', text: 'User' }, { value: 'manager', text: 'Manager' }, { value: 'admin', text: 'Admin' }]}
                    error={errors.authorId} />

                <PasswordInput name="password" label="Password" value={user.password} onChange={onChange}
                    defaultOption="Password" error={errors.authorId} />
                <input
                    type="submit" disabled={saving} value={saving ? 'saving...' : 'Save'}
                    className="btn btn-primary"
                    onClick={onSave} />
            </div>
        </form>
    );
};

UserForm.propTypes = {
    user: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    saving: React.PropTypes.bool,
    errors: React.PropTypes.object
};

export default UserForm;


