import express from "express";
import { Docs } from '../models/docsModels.js';
import { validationDocs } from "../validations/validationDocs.js";
import { validationResult } from "express-validator";
import lodash from "lodash";

const router = express.Router();

router.get("/categories", async(req, res)=>{
    try{
        const docs = await Docs.find({});
        const categories = lodash.uniq(docs.map(value => value.category).flat());
        
        return res.status(200).send({
            data: categories
        })
    }
    catch(err){
        return res.status(400).send({
            message: err
        })
    }
})

router.get("/", async(req, res)=>{
    try{
        const docs = await Docs.find({});
        
        return res.status(200).send({
            data: docs
        })
    }
    catch(err){
        return res.status(400).send({
            message: err
        })
    }
})

router.post("/", validationDocs, async (req, res)=>{
    try{
        const errors = validationResult(req);
        
        if(!errors.isEmpty()){
            return res.status(400).send({
                message: errors.array()
            })
        }

        const docs = await Docs.create({
            title: req.body.title,
            shortUrl: req.body.shortUrl,
            category: req.body.category,
            text: req.body.text
        }); 

        return res.status(200).send(docs);
    }
    catch(err){
        return res.status(400).send({
            message: err
        })
    }
})


router.get("/:shortUrl", async (req, res)=>{
    try{
        const {shortUrl} = req.params;
        const docs = await Docs.findOne({shortUrl: shortUrl});

        return res.status(200).json({
            data: docs
        })
    }
    catch(err){
        return res.status(400).send({
            message: err
        })
    }
})

router.delete("/:shortUrl", async(req, res)=>{
    try{
        const {shortUrl} = req.params;
        const docs = await Docs.findOneAndDelete({shortUrl: shortUrl});

        return res.status(200).send({
            message: "Успешно удалено"
        })
    }
    catch(err){
        return res.status(400).send({
            message: err
        })
    }
})

export default router;