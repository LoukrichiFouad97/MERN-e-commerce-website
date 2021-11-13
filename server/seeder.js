import mongoose from "mongoose";
import colors from "colors";
import dotenv from "dotenv";
import { dbConnect } from "./config/dbConnect.js";

// Data
import users from "./data/users.js";
import products from "./data/products.js";

// Data Models
import { User } from "./api/User/User.model.js";
import { Product } from "./api/Product/Product.model.js";
import { Order } from "./api/Order/Order.model.js";

dotenv.config();
dbConnect();

async function importData() {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log("db Cleaned before imprting".green.inverse);

        var createdUsers = await User.insertMany(users);
        console.log("Users imported successfully".green.inverse);

        var admin = createdUsers[0]._id;
        var sampleProducts = products.map(function insertProductByAdmin(
            product
        ) {
            return { ...product, user: admin };
        });

        await Product.insertMany(sampleProducts);
        console.log("Products imported successfully".green.inverse);
        process.exit(0);
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

async function destroyData() {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Data destroyed successfully".green.inverse);
    } catch (error) {
        console.log(`${error}`.red.inverse);
        process.exit(1);
    }
}

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
