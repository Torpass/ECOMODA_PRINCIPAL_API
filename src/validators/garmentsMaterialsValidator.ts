import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const GarmentsMaterialsValidator = [
    check('garment_id')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isInt().withMessage('Debe ser un número entero')
        .isLength({ min: 1, max: 10 }).withMessage('Debe contener entre 1-10 caracteres'),
    check('material_id')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isInt().withMessage('Debe ser un número entero')
        .isLength({ min: 1, max: 10 }).withMessage('Debe contener entre 1-10s caracteres'),
    check('quantity')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isFloat().withMessage('Debe ser un número'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next);
    }
];