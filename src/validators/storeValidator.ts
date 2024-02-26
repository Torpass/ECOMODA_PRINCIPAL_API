import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
import validationResults from '../utils/handleValidations';

export const storevalidator = [
    check('name')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min:1, max: 45 }),
    (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next)
    }
];