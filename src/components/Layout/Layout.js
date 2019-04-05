import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Layout.css';

const layout = (props) => {
    return (
        <>
            <NavigationItems />
            <div className="layout">
                {props.children}
            </div>
        </>
    )
};

export default layout;