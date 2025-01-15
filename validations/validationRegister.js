import { body } from "express-validator";
import { Users } from "../models/userModels.js";

export const validationRegister = [
    body('firstName', 'Пожалуйста, укажите имя').isLength({min: 2}).trim(),
    body('lastName', 'Пожалуйста, укажите фамилию').isLength({min: 2}).trim(),
    body('email', 'Пожалуйста, укажите корректный email').custom(async value => {
        const email = await Users.findOne({email: value});
        
        if(email){
            throw new Error('Пожалуйста, укажите корректный email');
        }
    }).isEmail().trim(),
    body('password', 'Пожалуйста, укажите более надежный пароль').isLength({min: 5}).trim(),
    body('shortUrl', 'Некорректный адрес страницы').custom(async value => {
        const url = await Users.findOne({shortUrl: value});
        
        if(url){
            throw new Error('Адрес уже занят');
        }
    }).matches(/^[0-9a-zA-Z]+$/).trim(),
    body('avatarUrl', 'Не удалось загрузить фотографию').optional().isURL()

]