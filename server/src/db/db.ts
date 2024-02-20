import { Sequelize, DataTypes, Model, CreationOptional } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
  }
);

export class User extends Model {
  declare id: string;
  declare email: string;
  declare password: string;
  declare role: CreationOptional<"USER" | "ADMIN">;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export class Device extends Model {
  declare id: string;
  declare title: string;
  declare brand: string;
  declare price: number;
}

Device.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    brand: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "device",
  }
);

export default sequelize;
