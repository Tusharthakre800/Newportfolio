const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Admin = require("./models/Admin");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  const username = "Tusharthakre800";
  const plain = "";
  const hash = await bcrypt.hash(plain, 10);

  // upsert so duplicate se error na ho
  await Admin.findOneAndUpdate(
    { username },
    { username, passwordHash: hash },
    { upsert: true, new: true }
  );
  

  console.log("Admin seeded");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
