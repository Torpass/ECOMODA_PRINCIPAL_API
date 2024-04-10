import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Size from '../interfaces/Size';

class SizeModel extends Model<Size> implements Size {
    public id!: number;
    public size!: string;
    public activo!: boolean;

    // Metodos personalizados
    
}

SizeModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        size: {
            type: DataTypes.STRING,
        },
        activo:{
            type: DataTypes.BOOLEAN
        }
    },

    {
        sequelize,
        tableName: "sizes",
        timestamps: false,
    }
);

export default SizeModel;