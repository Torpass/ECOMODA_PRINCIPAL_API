import { Model, DataTypes} from 'sequelize'
import GarmentImg from '../interfaces/GarmentImg';
import { sequelize } from '../../config/db';

class GarmentImagenModel extends Model<GarmentImg> implements GarmentImg{
    
    public id!: number;
    public garment_id!: number;
    public URL!: string;
}

GarmentImagenModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        garment_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        URL: {
            type: DataTypes.STRING,
        }

    },
    {
        sequelize,
        tableName: "garment_imgs",
        timestamps: false,
    }
);


export default GarmentImagenModel;