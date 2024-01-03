module.exports = {
  client: 'sqlite3',
  connection: {
    filename: 'C:/Programacion/Proyectos/ProyectoAPI/BDSQLite/APIFrasesBD/BDFrases.db', // Update the path accordingly
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/infrastructure/migrations', // Create this directory
  },
  seeds: {
    directory: './src/infrastructure/seeds', // Create this directory
  },
};