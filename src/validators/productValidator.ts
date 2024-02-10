// import { Request, Response, NextFunction } from 'express';
import {check} from 'express-validator';
// import validationResults from '../utils/handleValidations';

const ValidatorRegisterProduct = [
    check('id')
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 45 }),
    // (req:Request, res:Response, next:NextFunction) => {
    //     return validationResults(req, res, next)
    // }
];

export default ValidatorRegisterProduct;