import React from 'react';
import './Modal.css';

const modal = (props) => {
    return (
            <div className="Modal" style={{
                display: props.show ? 'block' : 'none'
            }}>
                <p className="TheError"  style={{
                transform: props.show ? 'translate(-50%, -50%)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
                }}>
                {props.children}
                </p>
            </div>
    )
};

export default modal;