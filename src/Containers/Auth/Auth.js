import React, {Component} from 'react';
import classes from './Auth.css'
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import is from 'is_js'
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

class Auth extends Component{

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный Email',
                valid: false,
                touched: false,
                validation : {
                    required: true,
                    email: true
                }
            },

            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите корректный Пароль',
                valid: false,
                touched: false,
                validation : {
                    required: true,
                    minLength: 6
                }
            },
        }
    };

    renderInputs () {
       return Object.keys(this.state.formControls).map((controlName, index) => {
           const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        });

    }

    validateControl(value, validation) {
      let isValid = true;

      if (!value) {
          return true;
      }

      if(validation.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (validation.email) {
        isValid = is.email(value) && isValid;
      }

      if (validation.minLength) {
         isValid = value.length >= validation.minLength && isValid;
      }

      return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = { ...formControls[controlName] };
        let isFormValid = true;

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;
        Object.keys(formControls).forEach(name => {
           isFormValid = formControls[name].valid && isFormValid
        });


        this.setState({ formControls, isFormValid });
    };

    loginHandler =  async () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    registerHandler =  () => {

        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHadler = (event) => {
        event.preventDefault()
    };

    render() {
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHadler} className={classes.AuthForm}>

                        {this.renderInputs()}

                        <Button
                            type='success'
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>
                        <Button
                            type='primary'
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}     
                        >
                            Зарегистрироваться
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}



function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch( auth( email, password, isLogin ))
    }
}

export default connect(null, mapDispatchToProps)(Auth)