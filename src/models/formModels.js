import { DataTypes } from 'sequelize';
import { sequelize } from '../db/database.js';

export const Formularies = sequelize.define('formularies', {
  formularyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullName: {
    type: DataTypes.STRING(60),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(75),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  status: {
    type: DataTypes.CHAR(1),
    defaultValue: 'P',
  },
  createdAt: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
});
