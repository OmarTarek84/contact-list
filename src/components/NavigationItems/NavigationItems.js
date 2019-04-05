import React, {Component} from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import Logo from '../../assets/smartphone.png';
import './NavigationItems.css';
import {connect} from 'react-redux';

class NavigationItems extends Component {
    render() {
        return (
            <div className="navigation">
                <div className="Logo">
                    <img src={Logo} alt="Logo" className="Logo-img" />
                </div>
                <nav className="navlinks">
                    <ul>
                        <NavigationItem link="/home">Home</NavigationItem>
                        {this.props.isAuth ? <NavigationItem link="/add">Add</NavigationItem> : null}
                        {this.props.isAuth ? <NavigationItem link="/contacts">My Contacts</NavigationItem> : null}
                        {!this.props.isAuth ? <NavigationItem link="/signup">Sign Up</NavigationItem> : null}
                        {!this.props.isAuth ? <NavigationItem link="/signin">Sign In</NavigationItem> : null}
                        {this.props.isAuth ? <NavigationItem link="/logout">LogOut</NavigationItem> : null}
                    </ul>
                </nav>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(NavigationItems);