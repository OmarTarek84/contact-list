import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import * as contactActionCreators from '../../store/actions/Contact';
import './AddContact.css';

class AddContact extends Component {
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
                valid: false
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
                valid: false
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
                valid: false
            },
        },
        formIsValid: false
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

    addFormSubmitted = (event) => {
        event.preventDefault();
        let contactData = {};
        for (let key in this.state.contactForm) {
            contactData[key] = this.state.contactForm[key].value;
            contactData['userId'] = this.props.userId
        }

        this.props.onAddContact(contactData, this.props.token);
        setTimeout(() => {
            this.props.history.replace('/contacts');
        }, 1500)
    }

    render() {
        let formArrayElements = [];
        for (let key in this.state.contactForm) {
            formArrayElements.push({
                id: key,
                config: this.state.contactForm[key]
            })
        }

        let form = (
            <form onSubmit={this.addFormSubmitted}>
                <h1>Add A Contact</h1>
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
        onAddContact: (contactData, token) => dispatch(contactActionCreators.addContactsSuccess(contactData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact);