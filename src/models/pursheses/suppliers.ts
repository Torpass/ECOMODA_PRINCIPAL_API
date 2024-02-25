import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import SuppliersInterface from '../interfaces/suppliers';


class SuppliersModel extends Model<SuppliersInterface> implements SuppliersInterface{
    public id!: number;
    public name!: string;
    public direction!: string;
    public phone!: string;
    public email!: string;
    public rif!: string

    // Metodos personalizados
    
}

SuppliersModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        direction: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        rif: {
            type: DataTypes.STRING,
        },
    },

    {
        sequelize,
        tableName: "suppliers",
        timestamps: false,
    }
);

export default SuppliersModel;