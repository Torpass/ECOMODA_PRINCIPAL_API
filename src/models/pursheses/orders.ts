import {Model, DataTypes} from 'sequelize';
import { sequelize } from '../../config/db';
import Ordersinterface from '../interfaces/orders';


class Ordersmodels extends Model<Ordersinterface> implements Ordersinterface{
    public id_orden!: number;
    public fecha_orden!: string;
    public unidad_de_medida!: Enumerator;
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
            type: DataTypes.DATETIME,
        },
        unidad_de_medida: {
            type: DataTypes.STRING,
        },
        cantidad: {
            type: DataTypes.DECIMAL(10,0),
        },
        suplier_id: {
            type: DataTypes.STRING,
        
    },},

    {
        sequelize,
        tableName: "orders",
        timestamps: false,
    }
);

export default Ordersmodels;