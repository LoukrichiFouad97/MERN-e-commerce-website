import mongoose from "mongoose";

export async function dbConnect() {
    try {
        var conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`connected to ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`erro: ${error}`.red.bold);
        process.exit(1);
    }
}
