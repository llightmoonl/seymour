import express from "express";
import { Users } from '../models/userModels.js';

import { validationLogin } from '../validations/validationLogin.js';
import { validationRegister } from '../validations/validationRegister.js';

import checkProfile from '../utils/checkProfile.js';

import { validationResult } from "express-validator";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/login", validationLogin, async (req, res) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array()
            })
        }
        const user = await Users.findOne({ email: req.body.email });

        if (!user) {
            return req.status(404).send({
                message: "Неверно указаны почта или пароль",
            })
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        
        if (!isValidPassword) {
            return req.status(404).send({
                message: "Неверно указаны почта или пароль",
            })
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        return res.status(200).send({
            user: {
                ...userData,
                token,
            }

        })
    }
    catch (err) {
        return res.status(500).send({
            error: err,
            message: "Не удалось авторизоваться",
        })
    }
})

router.post("/register", validationRegister, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({
                message: errors.array()
            })
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            passwordHash: hash,
            shortUrl: req.body.shortUrl,
            role: "Пользователь",
            avatarUrl: req.body.avatarUrl,
        })
        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d',
            }
        );

        const { passwordHash, ...userData } = user._doc;

        return res.status(200).send({
            user: {
                ...userData,
                token,
            }
        })
    }
    catch (err) {
        return res.status(500).send({
            message: "Не удалось зарегистрироваться",
        })
    }
})

router.get("/profile", checkProfile, async (req, res) => {
    try {
        const user = await Users.findById(req.userId);
        if (!user) {
            return req.status(404).send({
                message: "Пользователь отсутствует",
            })
        }

        const { passwordHash, ...userData } = user._doc;

        return res.status(200).send({
            user: userData
        })
    }
    catch (err) {
        return res.status(500).send({
            message: 'Нет доступа',
        })
    }
})



export default router;