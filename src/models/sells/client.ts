import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../../config/db';
import Client from '../interfaces/Clients';


class ClientModel extends Model<Client> implements Client {
    id!: number;
    name!: string;

    // Metodos personalizados
    
}

ClientModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        }
    },

    {
        sequelize,
        tableName: "inventories",
        timestamps: false,
    }
);

export default ClientModel;