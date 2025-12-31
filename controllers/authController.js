const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Auth")

exports.showLoginPage = (req, res) => {
    res.render("auth/login")
}

exports.createAdmin = async (req, res) => {
    try {
        await Admin.create({
            username: "admin",
            password: await bcrypt.hash("123", 10)
        })

        res.send("Admin created")
    } catch (err) {
        res.status(500).send("Admin creation failed")
    }
}

// exports.login = async (req, res) => {
//   const { username, password } = req.body

//   const admin = await Admin.findOne({ username })
//   if (!admin)
//     return res.render("auth/login", { error: "User not found" })

//   const isMatch = await bcrypt.compare(password, admin.password)
//   if (!isMatch)
//     return res.render("auth/login", { error: "Password incorrect" })

//   const token = jwt.sign(
//     { id: admin._id },
//     process.env.JWT_SECRET,
//     { expiresIn: "1d" }
//   )

//   res.cookie("token", token, {
//     httpOnly: true
//   })

//   return res.redirect("/")
// }



const maxAttempts = 3;
const lockTime = 10 * 60 * 1000;

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
        return res.render("auth/login", {
            error: "Invalid Username Or Password"
        });
    }

    if (admin.lockUntil >= Date.now()) {
        return res.render("auth/login", {
            error: "Limit exceeded. Try again later."
        });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
        admin.loginAttempts += 1;

        if (admin.loginAttempts >= maxAttempts) {
            admin.lockUntil = Date.now() + lockTime;
        }

        await admin.save();

        const left = maxAttempts - admin.loginAttempts;

        return res.render("auth/login", {
            error:
                left > 0
                    ? `Wrong password. ${left} attempts left`
                    : "Limit exceeded. Try again later."
        });
    }

    admin.loginAttempts = 0;
    admin.lockUntil = null;
    await admin.save();

    const token = jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.redirect("/");
};

exports.logout = (req, res) => {
    res.clearCookie("token")
    res.redirect("/login")
}
