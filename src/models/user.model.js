import mongoose ,{ Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email:{
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String, // cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "please enter password"],
      minlength: [5, "password must be at least 5 characters"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next()

    this.password = bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.methods.generateToken = function(){
    const payload = {
        _id : this._id,
        email: this.email,
        userName: this.userName
    }
    return jwt.sign(payload, TOKEN_SECRET_KEY,{expiresIn:process.env.TOKEN_EXPIRY})
}
userSchema.methods.generateRefreshToken = function(){
    const payload = {
        _id : this._id,
    }
    return jwt.sign(payload, REFRESH_TOKEN_SECRET_KEY,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", userSchema);
