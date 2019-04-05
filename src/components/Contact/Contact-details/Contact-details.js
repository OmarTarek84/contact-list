import React from 'react';
import './Contact-details.css';

const contactDetails = (props) => {
    const style = {
        display: props.show ? 'block' : 'none',
    };
    return (
        <div className="Contact-Slider" style={style}>
            <div>
                <p>Email: <span style={{fontWeight: 'bolder', color: '#af3434'}}>{props.email}</span></p>
            </div>
            <div>
                <p>Phone Number: <span style={{fontWeight: 'bolder', color: '#af3434'}}>{props.number}</span></p>
            </div>
        </div>
    )
};

export default contactDetails;