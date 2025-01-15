import React from 'react';
import Styles from './profileHeader.module.scss';
import ProfileIcon from '../profileIcon';
import {ProfileMenu} from '../profileMenu';
import { useSelector } from 'react-redux';

function profileHeader() {
    const {data} = useSelector(state=>state.auth);
    const [isOpen, setIsOpen] = React.useState(false);
    
    const menuRef = React.useRef(null);

    return (
        <div className={Styles.profileHeader}>
            <ProfileIcon onClick = {()=>setIsOpen(!isOpen)} src = {data.user.avatarUrl} firstName = {data.user.firstName} lastName = {data.user.lastName}/>
            { isOpen ? (
                <ProfileMenu className = {Styles.profileHeader__menu} ref = {menuRef} avatarUrl = {data.user.avatarUrl} firstName = {data.user.firstName} lastName = {data.user.lastName} nickname = {data.user.shortUrl}/>
            ) : ""}
        </div>
    )
}

export default profileHeader;