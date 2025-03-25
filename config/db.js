import mongoose from 'mongoose';

if (!global.mongoose) {
    global.mongoose = { connection: null, promise: null };
}
let cached = global.mongoose;

async function connectDB() {
    if (cached.connection) return cached.connection;

    if (!cached.promise) {
        console.log("📢 Tentative de connexion à MongoDB...");

        const opts = {
            dbName: "QuickCart", // Définir explicitement la base de données
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("✅ MongoDB connecté avec succès !");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ Erreur de connexion MongoDB :", err);
                throw err;
            });
    }

    cached.connection = await cached.promise;
    return cached.connection;
}

export default connectDB;