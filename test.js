const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
console.log("PORT:", process.env.PORT);

// Run the script
// 