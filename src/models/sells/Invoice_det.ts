import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Factura_det from '../interfaces/Invoice_det';


class Factura_det_Model extends Model<Factura_det> implements Factura_det {

    inventory_id!: number;
    invoice_id!: number;
    quantity!: number;
    price!: number;
    discount!: number;

    // Metodos personalizados
    
}

Factura_det_Model.init(
    {
        inventory_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        invoice_id: {
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
        tableName: "invoices_details",
        timestamps: false,
    }
);

export default Factura_det_Model;