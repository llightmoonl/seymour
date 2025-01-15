import React from 'react';
import Styles from './logo.module.scss'
import { Link } from 'react-router-dom';

function logo(props) {
    return (
        <div className={props.className ? `${Styles.logo} ${props.className}` : `${Styles.logo}`}>
            <Link className={Styles.logo__text} to="/">{props.title}</Link>
        </div>
    )
}

export default logo 