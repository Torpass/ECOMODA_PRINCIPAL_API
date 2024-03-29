import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const garmentValidator = [
    check('garment')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isString().withMessage('Debe ser una cadena de texto')
        .isLength({ min: 1, max: 45 }).withMessage('Debe contener entre 1-45 caracteres'),
    check('collection_id')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isInt().withMessage('Debe ser un número entero'),
    check('garment_type_id')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isInt().withMessage('Debe ser un número entero'),
    check('size_id')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isInt().withMessage('Debe ser un número entero'),
    check('pattern')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isString().withMessage('Debe ser una cadena de texto')
        .isLength({ max: 500 }).withMessage('Debe contener un máximo de 500 caracteres'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next);
    }
];