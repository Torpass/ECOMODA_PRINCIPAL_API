import path from 'path';
import multer, { diskStorage } from 'multer';
import DestinationCallback from 'multer';
import { Request } from 'express';

const PUBLIC_URL = process.env['PUBLIC_URL'] || 'http://localhost:3000';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = diskStorage({
    destination: function (_req: Request, file: Express.Multer.File, cb: DestinationCallback) {
        if (file.fieldname === 'imagen') {
            cb(null, path.join(__dirname, '../../storage/garments/images/'));
        } else if (file.fieldname === 'pattern') {
            cb(null, path.join(__dirname, '../../storage/garments/pattern/'));
        } else {
            const error = new Error('Nombre de campo no válido');
            cb(error, '');        }
    },
    filename: function(req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        const url = `${PUBLIC_URL}/${filename}`;
        req.body.imagen = req.body.imagen ? req.body.imagen + ' ' + url : url;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

export default upload;