import React from 'react';
import Styles from './errorInput.module.scss';
function errorInput(props) {
  return (
    <div className={ props.className ? `${Styles.error} ${props.className}` : Styles.error}>{props.title}</div>
  )
}

export default errorInput