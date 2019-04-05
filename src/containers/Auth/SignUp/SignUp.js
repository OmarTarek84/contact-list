import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import * as authActionCreators from '../../../store/actions/Auth';
import {connect} from 'react-redux';
import Spinner from '../../../components/UI/Loader/Loader';
import {Redirect} from 'react-router-dom';
import './SignUp.css';

class SignUp extends Component {

    state = {
        signupForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                valid: '',
                validationRules: {
                    isEmail: true,
                    required: true
                },
                touched: false,
                formIsValid: false
            },
            password: {
                elementType: 'input-password',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                valid: '',
                validationRules: {
                    required: true,
                    minLength: 6
                },
                touched: false,
                formIsValid: false
            },
            birthDate: {
                elementType: 'input',
                elementConfig: {
                    type: 'date',
                    placeholder: 'Your Birth Date'
                },
                value: '',
                valid: '',
                validationRules: {
                    required: true
                },
                touched: false,
                formIsValid: false
            },
        }
    }

    formHandlerChanged = (event, inputIdentifier) => {
        const signupForm = {...this.state.signupForm};
        const stateElement = {...signupForm[inputIdentifier]};
        stateElement.value = event.target.value;
        stateElement.touched = true;
        stateElement.valid = this.checkValidity(stateElement.value, stateElement.validationRules);
        signupForm[inputIdentifier] = stateElement;

        let formIsValid = true;
        for (let key in signupForm) {
            formIsValid = signupForm[key].valid && formIsValid
        }
        this.setState({signupForm: signupForm, formIsValid: formIsValid});
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

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid;
    }

    signUpHandler = (event) => {
        event.preventDefault();
        this.props.onSignUp(this.state.signupForm.email.value, this.state.signupForm.password.value);
    }

    render() {

        let formElementArray = [];
        for (let key in this.state.signupForm) {
            formElementArray.push({
                id: key,
                config: this.state.signupForm[key]
            })
        }

        let errorMessage;
        if (this.props.error) {
            errorMessage = <p className="ErrorMessage">{this.props.error.message}</p>;
        } else {
            errorMessage = null;
        }
        
        let form = (
            <form onSubmit={this.signUpHandler}>
                <h1>Sign Up</h1>
                {errorMessage}
                {formElementArray.map(element => {
                    return <Input elementType={element.config.elementType}
                                  key={element.id}
                                  elementConfig={element.config.elementConfig}
                                  value={element.config.value}
                                  invalid={!element.config.valid}
                                  touched={element.config.touched}
                                  changed={(event) => this.formHandlerChanged(event, element.id)}
                                  inputType={element.id}
                                  label={'Your ' + element.id} />
                })}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        )

            if (this.props.loading) {
                form = <Spinner />
            }

            if (this.props.signed) {
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
        loading: state.auth.loading,
        signed: state.auth.signed,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (email, password) => dispatch(authActionCreators.authSignUp(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);