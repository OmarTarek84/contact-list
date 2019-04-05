import React from 'react';
import './Button.css';

const button = (props) => {
    return (
        <div>
            <button className={['Btn', props.btnType].join(' ')} disabled={props.disabled}>
                {props.children}
            </button>
        </div>
    )
};

export default button;