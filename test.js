const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("EMAIL_USER:", process.env.EMAIL_USER);

// Run the script
// 