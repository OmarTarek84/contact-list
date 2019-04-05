import React, { Component } from 'react';
import Contact from '../../components/Contact/Contact';
import ContactDetails from '../../components/Contact/Contact-details/Contact-details';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Loader/Loader';
import * as contactActionCreators from '../../store/actions/Contact';
import withErrorHandler from '../../hoc/WithErrorHandler';
import axios from '../../axios-contact';

class Contacts extends Component {
    state = {
        contactDetailsShow: false,
        index: null,
    }

    componentDidMount() {
        this.props.onFetch(this.props.token, this.props.userId);
    }

    onShowContactSliderHandler = (index) => {
        this.setState(prevState => {
            return {
                index: index,
                contactDetailsShow: !prevState.contactDetailsShow
            }
        });

    };

    onDeleteContact = (contactId) => {
        this.props.onDelete(contactId, this.props.token, this.props.userId);
        this.props.history.replace('/contacts');
    };

    render() {
        const h1style = {
            marginLeft: '40px',
            textDecoration: 'underline'
        };
        let contacts = <Spinner />;

        // if () {
        //     contacts = (<h1 style={{textAlign: 'center', marginTop: '50px'}}>You Have No Contacts Yet!!</h1>)
        // }

        if (this.props.loading) {
            contacts = <Spinner />
        } else {
            contacts = this.props.contacts.map((contact, index) => {
                return (
                    <Contact onShow={() => this.onShowContactSliderHandler(index)} 
                             key={index}
                             name={contact.name}
                             id={contact.id}
                             delete={() => this.onDeleteContact(contact.id)}>
                        <ContactDetails 
                                    show={this.state.contactDetailsShow && this.state.index === index}
                                    email={contact.email}
                                    number={contact.number}>
                        </ContactDetails>
                    </Contact>
                )
            })
            .reduce((prev, curr) => {
                return prev.concat(curr)
            }, [])
        }

        if (this.props.contacts.length <= 0) {
            contacts = (<h1 style={{textAlign: 'center', marginTop: '50px'}}>You Have No Contacts Yet!!</h1>)
        }

        return (
            <>
                <h1 style={h1style}>Contact <span style={{color: '#af3434'}}>List</span></h1>
                {contacts}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.contact.loading,
        contacts: state.contact.contacts,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(contactActionCreators.successFetchedContacts(token, userId)),
        onDelete: (id, token, userId) => dispatch(contactActionCreators.asyncDeleteContact(id, token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Contacts, axios));