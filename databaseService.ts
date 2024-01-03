// databaseService.ts
import knex from 'knex';
import path from 'path';

const config = require(path.join(__dirname, './knexfile.js')); // Adjust the path accordingly
const database = knex(config);

export default database;
