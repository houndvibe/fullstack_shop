import { Sequelize, DataTypes, Model } from "sequelize";
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
});
export class User extends Model {
}
User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
}, {
    sequelize,
    modelName: "user",
});
export default sequelize;