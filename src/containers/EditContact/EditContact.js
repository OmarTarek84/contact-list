import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Loader/Loader';
import * as contactActionCreators from '../../store/actions/Contact';
import withErrorHandler from '../../hoc/WithErrorHandler';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './EditContact.css';
import axios from '../../axios-contact';

class EditContact extends Component {
    state = {
        contactForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Contact Email"
                },
                value: '',
                validationRules: {
                    required: true,
                    isEmail: true
                },
                touched: false,
                valid: true
            },
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Contact Name"
                },
                value: '',
                validationRules: {
                    required: true
                },
                touched: false,
                valid: true
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: "Contact Number"
                },
                value: '',
                validationRules: {
                    required: true
                },
                touched: false,
                valid: true
            },
        },
        formIsValid: true,
        filteredContact: null
    }

    inputHandler = (event, inputIdentifier) => {
        const contactForm = {...this.state.contactForm};
        const stateElement = {...contactForm[inputIdentifier]};
        stateElement.value = event.target.value;
        stateElement.touched = true;
        stateElement.valid = this.checkValidity(stateElement.value, stateElement.validationRules);
        contactForm[inputIdentifier] = stateElement;
        let formIsValid = true;
        for (let key in contactForm) {
            formIsValid = contactForm[key].valid && formIsValid;
        }
        this.setState({contactForm: contactForm, formIsValid: formIsValid});
    }

    componentWillMount() {
        this.props.onFetch(this.props.token, this.props.userId);
    }

    componentDidMount() {
        const contactForm = {...this.state.contactForm};
        const theEmail = {...contactForm['email']};
        const theName = {...contactForm['name']};
        const theNumber = {...contactForm['number']};
        theEmail.value = localStorage.getItem('contactEmail');
        theNumber.value = localStorage.getItem('contactNumber');
        theName.value = localStorage.getItem('contactName');
        contactForm['email'] = theEmail;
        contactForm['number'] = theNumber;
        contactForm['name'] = theName;
        this.setState({contactForm: contactForm})
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    editForm = (event) => {
        event.preventDefault();
        let contactData = {};
        for (let key in this.state.contactForm) {
            contactData[key] = this.state.contactForm[key].value;
            contactData['userId'] = this.props.userId
        }
        this.props.onEdit(this.props.match.params.id, contactData, this.props.token, this.props.userId);
    }

    render() {
        let formArrayElements = [];
        for (let key in this.state.contactForm) {
            formArrayElements.push({
                id: key,
                config: this.state.contactForm[key]
            })
        }

        const filteredContact = this.props.contacts.filter(contact => {
            return contact.id === this.props.match.params.id;
        })

        filteredContact.map(contact => {
            localStorage.setItem('contactEmail', contact.email)
            localStorage.setItem('contactNumber', contact.number)
            localStorage.setItem('contactName', contact.name)
        })

        let form = (
            <form onSubmit={this.editForm}>
                <h1>Edit Contact</h1>
                {formArrayElements.map(formElement => {
                    return <Input elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                key={formElement.id}
                                touched={formElement.config.touched}
                                changed={(event) => this.inputHandler(event, formElement.id)}
                                invalid={!formElement.config.valid}
                                inputType={formElement.id} />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        )

        if (this.props.loading) {
            form = <Spinner />
        }

        if (this.props.purchased) {
            form = <Redirect to="/contacts" />
        }

        return (
            <div className="Input-Box">
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.contact.loading,
        contacts: state.contact.contacts,
        purchased: state.contact.purchased,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetch: (token, userId) => dispatch(contactActionCreators.successFetchedContacts(token, userId)),
        onEdit: (contactId, contactData, token, userId) => dispatch(contactActionCreators.editingSuccessFinal(contactId, contactData, token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(EditContact, axios));