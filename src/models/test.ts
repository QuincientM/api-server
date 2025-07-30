import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("✅ Connected");
    process.exit(0);
  } catch (e) {
    console.error("❌ Connection error", e);
    process.exit(1);
  }
})();