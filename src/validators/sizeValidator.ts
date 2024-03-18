import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const sizeValidator = [
    check('size')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isString().withMessage('Debe ser una cadena de texto')
        .isLength({ min: 1, max: 10 }).withMessage('Debe contener entre 1-10 caracteres'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next);
    }
];