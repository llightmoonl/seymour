import express from "express";
import { checkParityNumber} from "../utils/algorithmsLearning.js";
import lodash from 'lodash';

const router = express.Router();

let w = Array.from({ length: 15 }, () => lodash.random(0, 1, true));

router.post("/hebba", async (req, res) => {
    w = checkParityNumber(req.body.x, w, req.body.parityNumber);

    res.status(200).send({w});
})

export default router;