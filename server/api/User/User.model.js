import { Schema } from "mongoose";

var userSchema = Schema(
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

export var User = mongoose.model("User", userSchema);