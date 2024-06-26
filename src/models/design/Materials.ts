import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/db';
import Material from '../interfaces/Materials';

class MaterialModel extends Model<Material> implements Material {
    public id!: number;
    public material!: string;
    public unit!: 'meters' | 'unit';
    public description?: string;
    public activo!: boolean;
}

MaterialModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        material: {
            type: DataTypes.STRING,
        },
        unit: {
            type: DataTypes.ENUM('meters', 'unit'),
        },
        description: {
            type: DataTypes.TEXT,
        },
        activo:{
            type: DataTypes.BOOLEAN
        }
    },
    {
        sequelize,
        tableName: 'materials',
        timestamps: false
    }
);

export default MaterialModel;
