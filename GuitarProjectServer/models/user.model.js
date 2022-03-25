const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    ID: { type: Number, required: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    has_access: { type: Boolean, required: true, default: false },
    role: { type: String, default: "user" },
  },
  { versionKey: false }
);
const userModel = model("user", userSchema);

const insertAdmin = async () => {
  const admin = new userModel({
    first_name: "Michael",
    last_name: "Koinov",
    email: "crazierlattice@gmail.com",
    ID: "206645269",
    password: "$2y$10$2P.pVDOiczhnI/iYCMh/ke1gIahEeA7s4jYgBJakd6i8mpQdR8GmW",
    city: "Bat-Yam",
    street: "Hertzel",
    role: "admin",
  });
  await admin.save();
};

module.exports = { userModel, insertAdmin };
