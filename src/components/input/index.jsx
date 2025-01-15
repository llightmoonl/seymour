import React from 'react';
import Styles from './input.module.scss';

function input(props) {
    return (
        <div className={Styles.input}>
            <input className={props.className} value={props.value} onChange={props.onChange} type={props.type} placeholder=' ' />
            <div className={props.error ? `${Styles.title} ${Styles.title__error}` : `${Styles.title}`}>{props.title}</div>
            {
                props.error ? (
                    <div className={Styles.error}>{props.error}</div>
                ) : ""
            }
        </div>
    )
}

export default input;