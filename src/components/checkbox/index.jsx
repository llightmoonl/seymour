import React from 'react';
import Styles from './checkbox.module.scss';

function checkbox(props) {
  return (
    <div className={ props.className ? `${Styles.checkbox} ${props.className}`: Styles.checkbox}>
        <input id = "checkbox" checked = {props.checked} onChange={props.onChange} className={Styles.checkbox__input} type='checkbox'/>
        <label htmlFor = "checkbox" className={Styles.checkbox__text}>{props.text}</label>
    </div>
  )
}

export default checkbox;