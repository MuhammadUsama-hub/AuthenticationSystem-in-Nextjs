import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "please provide user name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide Password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});
// this is because schema doesn't knows that it first time making connection with db or olaready connected .
// so se set the condition that if model is already is created give us it's ref and if not created so created it.
const User =
  mongoose.models.emonusers || mongoose.model("emonusers", userSchema);

export { User };
