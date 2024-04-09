import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';
import validationResults from '../utils/handleValidations';

export const GarmentsMaterialsValidator = [
    (req: Request, res: Response, next: NextFunction) => {
        const { garmentsMaterials } = req.body; 
        console.log(garmentsMaterials)
        if (!Array.isArray(garmentsMaterials)) {
            return res.status(422).json({ errors: [{ msg: 'El cuerpo debe contener un arreglo de objetos' }] });
        }
        
        garmentsMaterials.forEach((_: any, index: number) => {
            check(`garmentsMaterials.${index}.garment_id`)
                .exists()
                .notEmpty().withMessage('Este campo no puede estar vacío')
                .isInt().withMessage('Debe ser un número entero')
                .isLength({ min: 1, max: 10 }).withMessage('Debe contener entre 1-10 caracteres');
            
            check(`garmentsMaterials.${index}.material_id`)
                .exists()
                .notEmpty().withMessage('Este campo no puede estar vacío')
                .isInt().withMessage('Debe ser un número entero')
                .isLength({ min: 1, max: 10 }).withMessage('Debe contener entre 1-10 caracteres');
            
            check(`garmentsMaterials.${index}.quantity`)
                .exists()
                .notEmpty().withMessage('Este campo no puede estar vacío')
                .isFloat().withMessage('Debe ser un número');
        });

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        // Devuelve un valor en caso de que no haya errores de validación
        return next();
    },
    validationResults
];