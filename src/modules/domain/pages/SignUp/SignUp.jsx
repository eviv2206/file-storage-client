import React, {useState} from "react";
import s from './SignUp.module.scss';
import {Link} from "react-router-dom";
import axios from "axios";
import {useToasters} from "../../../../common/ui/contexts/ToastersContext";

const LOGIN = 'Логин';
const PASSWORD = 'Пароль';
const EMAIL = 'Электронная почта';
const SUBMIT = 'Зарегистрироваться';
const SIGN_IN = 'Уже зарегистрирован?';
const CHECK_EMAIL = 'Проверьте почту для подтверждения аккаунта';

const SignUp = () => {
    const { showToasterError, showToasterSuccess } = useToasters();
    const [isEmail, setIsEmail] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8080/api/v1/auth/sign-up', {
            login: name,
            email: email,
            password: password,
        })
            .then(() => {
                showToasterSuccess(CHECK_EMAIL)
                setIsEmail(true)
            })
            .catch((e) => {
                e.response.data.message?.map(message => showToasterError(message));
                showToasterError(e.response.data.error);
            })
    }

    return (
        <div className={s.SignUp_Containter}>
            <form className={s.SignUp} onSubmit={(event) => onSubmit(event)}>
                <label htmlFor='loginInput'>{LOGIN}</label>
                <input type='text' id='loginInput' onChange={(e) => setName(e.target.value)}/>
                <label htmlFor='emailInput'>{EMAIL}</label>
                <input type='email' id='emailInput' onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor='passwordInput'>{PASSWORD}</label>
                <input type={"password"} id='passwordInput' onChange={(e) => setPassword(e.target.value)}/>
                <input type='submit' className={s.SignUp_submit} value={SUBMIT} disabled={isEmail}/>
            </form>
            <div>
                <Link to={'./../sign-in'}>
                    <p>{SIGN_IN}</p>
                </Link>
            </div>
        </div>
    )

}

export default SignUp;