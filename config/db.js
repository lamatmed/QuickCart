import mongoose from 'mongoose';
let cashed = global.mongoose;
if (!cashed) {
    cashed = global.mongoose = {
        connection: null,
        promise: null,
    };
}
async function connectDB() {
    if (cashed.connection) return cashed.connection;
    if (!cashed.promise) {
        const opts = {
            bufferCommands: false,

        };
        cashed.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcart`, opts).then(
            mongoose => {
                return mongoose;
            }
        );
    }
    cashed.connection = await cashed.promise
    return cashed.connection;
}
export default connectDB;