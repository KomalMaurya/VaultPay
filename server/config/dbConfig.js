const mongoose = require('mongoose');
require('dotenv').config(); // 👈 Load .env first

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI is undefined. Please check your .env file.");
  process.exit(1); // Stop the server if DB URI is missing
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB database.");
})
.catch((err) => {
  console.error("❌ Error connecting to MongoDB:", err.message);
});
