import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('burbujasDeAlgodonDB', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
})


/*
que la base de dato conecte deben crear la base de datos en gestor de base de daros
*/
