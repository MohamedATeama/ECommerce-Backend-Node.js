import { model, Schema } from "mongoose";
import { Users } from "../interfaces/usersInterface";
import bcrypt from 'bcryptjs';

const userSchema: Schema = new Schema<Users>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, enum: ["manager", "admin", "user"], default: "user" },
  image: String,
  phone: String,
  active: { type: Boolean, default: true },
  resetCode: String,
  passwordChangedAt: Date,
  resetCodeExpireTime: Date,
  resetCodeVerify: Boolean,
}, { timestamps: true });

userSchema.pre<Users>("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

export default model<Users>('users', userSchema);