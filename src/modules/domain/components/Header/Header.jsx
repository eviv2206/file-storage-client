import React from "react";
import s from './Header.module.scss';

const TITLE = 'File-Storage'

const Header = () => {
    return (
        <div className={s.Header}>
            <h1>{TITLE}</h1>
        </div>
    )
}

export default Header;