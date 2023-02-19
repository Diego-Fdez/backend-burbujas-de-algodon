import { DataTypes } from 'sequelize'
import { sequelize } from '../db/database.js'


export const Formularies = sequelize.define('formularies', {
  formularyId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(75),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  state: {
    type: DataTypes.CHAR(2)
  }
})



