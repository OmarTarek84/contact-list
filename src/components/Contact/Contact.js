import React from 'react';
import Arrow from '../../assets/sort-down.png';
import Delete from '../../assets/delete.png';
import Edit from '../../assets/edit.png';
import {Link} from 'react-router-dom';
import './Contact.css';

const contact = (props) => {
    return (
            <>
            <div>
                <div className="Contact-Component">
                    <div>
                        <h4>{props.name}</h4>
                        <div style={{display: 'inline', cursor: 'pointer'}} onClick={props.onShow}>
                            <img src={Arrow} alt="arrow_down" />
                        </div>
                    </div>
                    <div className="Contact-images">
                        <div>
                            <Link to={'/edit/' + props.id}>
                                <img src={Edit} alt="Edit" />
                            </Link>
                        </div>
                        <div>
                            <div style={{cursor: 'pointer'}} onClick={props.delete}>
                                <img src={Delete} alt="Delete" />
                            </div>
                        </div>
                    </div>
                </div>
                {props.children}
            </div>
            </>
    )
};

export default contact;