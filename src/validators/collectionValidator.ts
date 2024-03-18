import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const collectionValidator = [
    check('collection')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isString().withMessage('Debe ser una cadena de texto')
        .isLength({ min: 1, max: 45 }).withMessage('Debe contener entre 1-45 caracteres'),
        check('standard_quantity')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isInt().withMessage('Debe ser un valor entero')
        .isLength({ min: 1, max: 15 }).withMessage('Debe contener entre 1-15 caracteres'),
        check('createdAt')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isDate().withMessage('La fecha debe ser válida'),
        check('updatedAt')
        .optional()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isDate().withMessage('La fecha debe ser válida'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next);
    }
];