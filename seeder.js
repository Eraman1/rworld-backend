const User = require("./src/model/user.model")
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db.config");

dotenv.config();

async function seedAdminUser() {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: "admin@example.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      mongoose.connection.close();
      return;
    }

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password", 10);

    const admin = new User({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      isAdmin: true,
    });

    await admin.save();

    console.log("Users seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding users:", error);
    mongoose.connection.close();
  }
}

seedAdminUser();
