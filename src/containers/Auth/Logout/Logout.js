import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as authActionCreators from '../../../store/actions/Auth';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogOut()
    }

    render() {
        return (
            <Redirect to="/home" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut: () => dispatch(authActionCreators.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);