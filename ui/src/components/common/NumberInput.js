import React, { PropTypes } from 'react';

const NumberInput = ({ name, label, onChange, value, error, readonly = false }) => {
    let wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += " " + 'has-error';
    }
    return (
        <div className={wrapperClass}>
            <label htmlFor={name}>{label}</label>
            <div className="field">
                <input type="number" name={name} className="form-controli" onChange={onChange}
                    value={value} readonly={readonly}
                />
            </div>
        </div>
    );
};

NumberInput.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    error: PropTypes.string
};

export default NumberInput;
