import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const materialValidator = [
    check('material')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 1, max: 45 }),
    check('unit')
        .exists()
        .notEmpty()
        .isString()
        .isIn(['meters', 'unit']), // Verifica que el valor esté dentro de los permitidos ('meters' o 'unit')
    check('description')
        .optional() // Marca como opcional, ya que puede que no siempre se proporcione una descripción
        .isString()
        .isLength({ max: 255 }), // Establece una longitud máxima para la descripción
    (req: Request, res: Response, next: NextFunction) => {
        console.log(req.body)
        return validationResults(req, res, next);
    }
];