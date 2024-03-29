import path from 'path';
import multer, { diskStorage } from 'multer';
import DestinationCallback from 'multer';
import { Request } from 'express';

const PUBLIC_URL = process.env['PUBLIC_URL'] || 'http://localhost:3000';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage = diskStorage({
    destination: function (req: Request, _file: Express.Multer.File, cb: DestinationCallback) {
        const pathStorage = path.join(__dirname, '../../storage/garments/pattern');
        console.log(pathStorage);
        cb(null, pathStorage);
    },
    filename: function(req: Request, file: Express.Multer.File, cb: FileNameCallback) {
        const ext = file.originalname.split('.').pop();
        const filename = `file-${Date.now()}.${ext}`;
        const url = `${PUBLIC_URL}/${filename}`;
        req.body.imagen = req.body.imagen ? req.body.imagen + ' ' + url : url;
        cb(null, filename);
    }
});

const uploadPattern = multer({ storage: storage });

export default uploadPattern;