import React, { PropTypes } from 'react';

const DateInput = ({ name, label, onChange, value, error }) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input type="Date" name={name} className="form-controli" onChange={onChange}
                    value={value}
                />
            </div>
        </div>
    );
};

DateInput.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

export default DateInput;
