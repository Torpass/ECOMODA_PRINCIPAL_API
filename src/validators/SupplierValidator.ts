import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
import validationResults from '../utils/handleValidations';

export const SupplierValidator = [
    check('name')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 256 }),
    check('direction')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 256 }),
    check('phone')
    .exists()
    .notEmpty()
    .isLength({ min: 12, max: 16 }),
    check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 3, max: 45 }),
    check('rif')
    .exists()
    .notEmpty()
    .isLength({ min: 9, max: 13 }),

    (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next)
    }
];

export const SupplierValidatorUpdate = [
    check('name')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 256 }),
    check('direction')
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 3, max: 256 }),
    check('phone')
    .exists()
    .notEmpty()
    .isLength({ min: 12, max: 16 }),
    check('email')
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 3, max: 45 }),
    check('rif')
    .exists()
    .notEmpty()
    .isLength({ min: 9, max: 13 }),

    (req:Request, res:Response, next:NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next)
    }
];