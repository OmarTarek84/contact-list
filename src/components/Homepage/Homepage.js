import React, {Component} from 'react';
import './Homepage.css';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import AppImg from '../../assets/bosch-contact.jpg';

class Homepage extends Component {
    render() {
        let linkButton = (
            <div className="Link-div">
                <Link to="/signup" className="Link-homepage">Sign Up</Link>
            </div>
        );

        if (this.props.isAuth) {
            linkButton = (
                <div className="Link-div">
                    <Link to="/contacts" className="Link-homepage">Go To Your Contacts</Link>
                </div>
            )
        }
        return (
            <div className="Homepage">
                <div className="backImage">
                    <img src={AppImg} alt="HomePage" />
                </div>
                <h1>Welcome To My <span>Contact-list</span> App</h1>
                <p>This is the app where you can store, create, edit and delete all your contact for free!!</p>
                {linkButton}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Homepage);