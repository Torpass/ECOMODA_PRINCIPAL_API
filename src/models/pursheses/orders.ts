import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../../config/db';
import Ordersinterface from '../interfaces/orders';


class Ordersmodels extends Model<Ordersinterface> implements Ordersinterface{
    public id_orden!: number;
    public fecha_orden!: string;
    public unidad_de_medida!: string;
    public cantidad!: string;
    

    // Metodos personalizados
    
}

Ordersmodels.init(
    {
        id_orden: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fecha_orden: {
            type: DataTypes.DATE,
        },
        unidad_de_medida: {
            type: DataTypes.ENUM('kg', 'lt', 'un')
        },
        cantidad: {
            type: DataTypes.DECIMAL(10,0),
        },
    },
    {
        sequelize,
        tableName: "orders",
        timestamps: false,
    }
);

export default Ordersmodels;