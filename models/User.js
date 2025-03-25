import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    imageUrl: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
