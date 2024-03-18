import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const materialValidator = [
    check('material')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isString().withMessage('Debe ser una cadena de texto')
        .isLength({ min: 1, max: 45 }).withMessage('Debe contener entre 1-45 caracteres'),
    check('unit')
        .exists()
        .notEmpty().withMessage('Este campo no puede estar vacío')
        .isString().withMessage('Debe ser una cadena de texto')
        .isIn(['meters', 'unit']).withMessage('El valor debe estar dentro de los permitidos ("meters" o "unit")'), // Verifica que el valor esté dentro de los permitidos ('meters' o 'unit')
    check('description')
        .optional() // Es opcional ya que puede que no siempre se da una descripción
        .isString().withMessage('Debe ser una cadena de texto')
        .isLength({ max: 255 }).withMessage('Debe contener un máximo de 255 caracteres'),
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next);
    }
];