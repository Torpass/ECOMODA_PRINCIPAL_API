import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
import validationResults from '../utils/handleValidations';

export const OrderValidator = [
    check('fecha_orden')
    .exists()
    .notEmpty()
    .isString(),
    check('unidad_de_medida')
    .exists()
    .notEmpty()
    .isString(),
    check('cantidad')
    .exists()
    .notEmpty(),

    (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next)
    }
];