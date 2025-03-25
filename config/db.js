import mongoose from 'mongoose';

if (!global.mongoose) {
    global.mongoose = { connection: null, promise: null };
}
let cached = global.mongoose;

async function connectDB() {
    if (cached.connection) return cached.connection;
    if (!cached.promise) {
        const opts = { bufferCommands: false };

        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/QuickCart`, opts)
            .then((mongoose) => {
                console.log("MongoDB connected");
                return mongoose;
            })
            .catch((err) => {
                console.error("MongoDB connection error:", err);
                throw err;
            });
    }
    cached.connection = await cached.promise;
    return cached.connection;
}

export default connectDB;