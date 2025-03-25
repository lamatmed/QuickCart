import mongoose from "mongoose";
import connectDB from "./config/db.js";


const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    imageUrl: String
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

(async() => {
    try {
        await connectDB();
        console.log("✅ Connexion réussie à MongoDB !");

        // Création d'un utilisateur test
        const newUser = await User.create({
            _id: "test123",
            name: "Test User",
            email: "test@example.com",
            imageUrl: "https://example.com/test.jpg"
        });

        console.log("🎉 Utilisateur créé :", newUser);
    } catch (error) {
        console.error("❌ Erreur MongoDB :", error);
    } finally {
        mongoose.connection.close();
    }
})();