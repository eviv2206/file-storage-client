import React, {useState} from "react";
import s from "./SignIn.module.scss";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {useToasters} from "../../../../common/ui/contexts/ToastersContext";
import {ReCAPTCHA} from 'react-google-recaptcha';

const LOGIN = 'Логин';
const PASSWORD = 'Пароль';
const SUBMIT = 'Войти';
const TOKEN = 'Токен';
const SIGN_UP = 'Зарегистрироваться';
const KEY = '6LeF6AwmAAAAABNMmHKuOGJcnOgO5Psf_qV0DWFc';

const SignIn = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isToken, setIsToken] = useState(false);
    const [passedCaptcha, setPassedCaptcha] = useState(false);
    const {showToasterError, showToasterSuccess} = useToasters();
    const navigate = useNavigate();

    const onSubmit = (event) => {
        event.preventDefault();
        if (isToken) {
            axios.post('http://localhost:8080/api/v1/auth/login', {
                login: name,
                password: password,
                token: token,
            })
                .then((response) => {
                    localStorage.setItem('Authorization', `Bearer ${response.data.accessToken}`);
                    showToasterSuccess("Вход произведен успешно");
                    navigate('/domain/files');
                })
                .catch((e) => {
                    showToasterError(e.response.data.message || e.response.data.error);
                })
        } else {
            axios.post('http://localhost:8080/api/v1/auth/login-token', {
                login: name,
                password: password,
            })
                .then(() => {
                    showToasterSuccess("Введите токен из письма на почте")
                    setIsToken(true);
                })
                .catch((e) => showToasterError(e.response.data.message || e.response.data.error));
        }
    }

    const onChange = () => {
        setPassedCaptcha(true);
    }

    return (
        <div className={s.SignIn_Containter}>
            <form className={s.SignIn} onSubmit={(event) => onSubmit(event)}>
                <label htmlFor='loginInput'>{LOGIN}</label>
                <input type='text' id='loginInput' onChange={(e) => setName(e.target.value)}/>
                <label htmlFor='passwordInput'>{PASSWORD}</label>
                <input type={"password"} id='passwordInput' onChange={(e) => setPassword(e.target.value)}/>
                {isToken && <label htmlFor='tokenInput'>{TOKEN}</label>}
                {isToken && <input type={'text'} id={'tokenInput'} onChange={(e) => setToken(e.target.value)}/>}
                <ReCAPTCHA sitekey={KEY} onChange={onChange}/>
                <input type='submit' className={s.SignIn_submit} value={SUBMIT} disabled={!passedCaptcha}/>
            </form>
            <div>
                <Link to={'./../sign-up'}>
                    <p>{SIGN_UP}</p>
                </Link>
            </div>
        </div>
    )

}

export default SignIn;