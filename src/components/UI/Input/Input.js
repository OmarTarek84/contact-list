import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    let validationError = null;
    let passwordError;
    const inputClasses = ['Input-field'];
    if (props.invalid && props.touched) {
        inputClasses.push('invalid');
        validationError = (<p className="Validation-Error">Please enter a valid {props.inputType}</p>);
        passwordError = (<p className="Validation-Error">Password should be at least 6 characters</p>);
    }
    switch (props.elementType) {

        case 'input':
            inputElement = 
            (
                <div className="Input-Group">
                <label>{props.label}</label>
                <input className={inputClasses.join(' ')} 
                                    {...props.elementConfig} 
                                    value={props.value}
                                    onChange={props.changed}
                                    onBlur={props.changed} />
                {validationError}
                </div>
            )
            break;
        case 'input-password':
            inputElement = 
            (
                    <div className="Input-Group">
                        <label>{props.label}</label>
                        <input className={inputClasses.join(' ')} 
                                            {...props.elementConfig} 
                                            value={props.value}
                                            onChange={props.changed}
                                            onBlur={props.changed} />
                        {passwordError}
                    </div>
            )    
            break;
        default:
            inputElement = 
            (
                <div className="Input-Group">
                    <label>{props.label}</label>
                    <input className={inputClasses.join(' ')} 
                                            {...props.elementConfig} 
                                            value={props.value}
                                            onChange={props.changed}
                                            onBlur={props.changed} />
                    {validationError}
                </div>
            )
    }

    return inputElement;
};

export default input;