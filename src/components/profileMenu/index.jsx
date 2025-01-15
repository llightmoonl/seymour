import React from 'react';
import ProfileIcon from '../profileIcon';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlices';
import { useNavigate, Link } from 'react-router-dom';
import Styles from './profileMenu.module.scss';

export const ProfileMenu = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandle = () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
    }

    return (
        <div ref={ref} className={props.className ? `${Styles.profileMenu} ${props.className}` : Styles.profileMenu}>
            <div className={Styles.profileMenu__content}>
                <div className={Styles.profileMenu__information} onClick={()=> navigate("/profile")}>
                    <ProfileIcon src={props.avatarUrl} firstName = {props.firstName} lastName = {props.lastName}/>
                    <div className={Styles.profileMenu__profile}>
                        <div className={Styles.profileMenu__name}>{`${props.firstName} ${props.lastName}`}</div>
                        <div className={Styles.profileMenu__nickname}>{`@${props.nickname}`}</div>
                    </div>
                </div>
                <div className={Styles.profileMenu__controllers}>
                    <div className={Styles.controllers__item} onClick={()=>{navigate("/")}}>Настройки</div>
                    <div className={Styles.controllers__item} onClick={()=>{logoutHandle()}}>Выйти</div>
                </div>
            </div>
        </div>
    )
})