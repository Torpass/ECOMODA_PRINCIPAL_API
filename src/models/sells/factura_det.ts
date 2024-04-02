import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Factura_det from '../interfaces/Factura_det';


class Factura_det_Model extends Model<Factura_det> implements Factura_det {

    product_ID!: number;
    venta_cab!: number;
    quantity!: number;
    price!: number;
    discount!: number;

    // Metodos personalizados
    
}

Factura_det_Model.init(
    {
        product_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        venta_cab: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        price: {
            type: DataTypes.DECIMAL,
        },
        discount: {
            type: DataTypes.TINYINT,
        }

    },

    {
        sequelize,
        tableName: "factura_detalle",
        timestamps: false,
    }
);

export default Factura_det_Model;