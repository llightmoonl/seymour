import { body } from "express-validator";
import { Docs } from "../models/docsModels.js";

export const validationDocs = [
    body('title', 'Это поле должно быть заполнено').isLength({min: 1}).trim(),
    body('shortUrl', 'Некорректный адрес страницы').isLength({min: 1}).custom(async value => {
        const url = await Docs.findOne({shortUrl: value});
        
        if(url){
            throw new Error('Адрес уже существует');
        }
    }).matches(/^[0-9a-zA-Z]+$/).trim(),
    body('category', 'Это поле должно быть заполнено').isLength({min: 1}).trim(),
    body('text', 'Это поле должно быть заполнено').isLength({min: 1}).trim(),
]