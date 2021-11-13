import bcryptjs from "bcryptjs";

var users = [
    {
        name: "admin",
        email: "admin@admin.com",
        password: bcryptjs.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "user",
        email: "user@user.com",
        password: bcryptjs.hashSync("123456", 10),
    },
    {
        name: "fouad",
        email: "fouad@fouad.com",
        password: bcryptjs.hashSync("123456", 10),
    },
];

export default users;
