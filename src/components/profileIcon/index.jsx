import React from 'react';
import Styles from './profileIcon.module.scss';

function profileIcon(props) {
    return (
        <div onClick={props.onClick} className={Styles.profileIcon}>
            <div className={Styles.profileIcon__icon}>
                { props.src ? (<img className={Styles.profileIcon__image} src={props.src} />) 
                : props.firstName[0] + props.lastName[0]}
            </div>
        </div>
    )
}

export default profileIcon;