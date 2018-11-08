import React, {Component} from 'react';
import classes from './Auth.css'
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import is from 'is_js'
import axios from 'axios';


export default class Auth extends Component{

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
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const respomse = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBnZ7qn5ZelWawYsxfWAKxGOe_wU_cDC0E', authData)
            console.log(respomse.data)
        } catch (e) {
            console.log(e)
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };

        try {
            const respomse = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBnZ7qn5ZelWawYsxfWAKxGOe_wU_cDC0E', authData)
            console.log(respomse.data)
        } catch (e) {
            console.log(e)
        }
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