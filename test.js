const dotenv = require('dotenv');
const dbConfig = require('./src/db/dbConfig');
// Load environment variables from .env file
dotenv.config();
dbConfig();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("PORT:", process.env.PORT);

// Run the script
// 

