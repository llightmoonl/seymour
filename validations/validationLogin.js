import { body } from "express-validator";
import { Users } from "../models/userModels.js";

export const validationLogin = [
    body('email', 'Неверно указаны почта или пароль').custom(async value => {
        const email = await Users.findOne({email: value});

        if(!email){
            throw new Error('Неверно указаны почта или пароль');
        }
    }).isEmail().trim(),
    body('password', 'Неверно указаны почта или пароль').isLength({min: 5}).trim(),
]
