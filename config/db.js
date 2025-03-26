import dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement

import mongoose from 'mongoose';

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB() {
    // Vérification si MONGODB_URI est défini
    if (!process.env.MONGODB_URI) {
        console.error('❌ MONGODB_URI est manquante dans le fichier .env');
        process.exit(1); // Arrêter le programme si l'URI est manquante
    }

    console.log('✅ Connexion à MongoDB avec URI:', process.env.MONGODB_URI);

    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = { bufferCommands: false };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;