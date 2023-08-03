const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  // For Heroku deployment with JawsDB MySQL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // For local development or other deployment environments
  sequelize = new Sequelize(
    process.env.DATABASE_URL, // Use the Heroku PostgreSQL URL
    {
      dialect: 'postgres', // Use the PostgreSQL dialect
      protocol: 'postgres', // Use the PostgreSQL protocol
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Disable SSL verification
        }
      }
    }
  );
}

module.exports = sequelize;


// require('dotenv').config();

// const Sequelize = require('sequelize');

// const sequelize = process.env.JAWSDB_URL
//   ? new Sequelize(process.env.JAWSDB_URL)
//   : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//       host: 'localhost',
//       dialect: 'mysql',
//       dialectOptions: {
//         decimalNumbers: true,
//       },
//     });

// module.exports = sequelize;