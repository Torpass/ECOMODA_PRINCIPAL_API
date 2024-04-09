import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
import validationResults from '../utils/handleValidations';

export const clientvalt = [
    check('id')
    .exists()
    .notEmpty()
    .isNumeric()
    .isLength({ min:1, max: 45 }),
    check('name').exists().notEmpty().isString().isLength({min:1, max:256}),
    (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next)
    }

];