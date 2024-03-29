import path from 'path';
import multer, { diskStorage } from 'multer';
import DestinationCallback from 'multer';
import { Request } from 'express';

const PUBLIC_URL = process.env['PUBLIC_URL'] || 'http://localhost:3000';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const getGarmentPath = (entity: string) => {
    switch (entity) {
        case 'garmentPattern':
            return path.join(__dirname, '../../storage/garments/patterns');
        case 'garmentImages':
            return path.join(__dirname, '../../storage/garments/images');
        default:
            return path.join(__dirname, '../../storage');
    }
};

const storage = diskStorage({
    destination: function (req: Request, _file: Express.Multer.File, cb: DestinationCallback) {
        const { direction = '' } = req.params;
        const pathStorage = getGarmentPath(direction);
        console.log(pathStorage);
        cb(null, pathStorage);
    },
    filename: function(req:Request, file:Express.Multer.File, cb:FileNameCallback){
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        let url = `${PUBLIC_URL}/${filename}`;
        if (!req.body.imagen) {
          req.body.imagen = '';
        }
        req.body.imagen += url + ' ';
        cb(null, filename);
    }
});

const uploadMiddleware = multer({ storage: storage });

export default uploadMiddleware;