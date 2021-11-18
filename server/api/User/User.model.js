import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var userSchema = mongoose.Schema(
    {
        name: {
            type: "string",
            required: true,
        },
        email: {
            type: "string",
            required: true,
            unique: true,
        },
        password: {
            type: "string",
            required: true,
        },
        isAdmin: {
            type: "boolean",
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePasswords = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export var User = mongoose.model("User", userSchema);
