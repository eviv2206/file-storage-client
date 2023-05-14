import React from "react";
import {Link} from "react-router-dom";
import s from './Auth.module.scss'

const REGISTRATION = 'Зарегистрироваться';
const SIGN_IN = 'Войти';

const Auth = () => {
    return (
        <div className={s.Auth}>
            <Link to={'sign-up'} className={s.Auth_link}>
                <button>
                    {REGISTRATION}
                </button>
            </Link>
            <Link to={'sign-in'} className={s.Auth_link}>
                <button>
                    {SIGN_IN}
                </button>
            </Link>
        </div>
    )

}

export default Auth;