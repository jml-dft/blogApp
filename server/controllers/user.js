const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config(); // Load environment variables

const salt = bcrypt.genSaltSync(10);

// Remove the hardcoded secret and use the environment variable instead
const registerUser = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    console.log('Registering user:', username);
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
            isAdmin: isAdmin || false, // Default to non-admin
        });
        console.log('User created:', userDoc);
        res.json(userDoc);
    } catch (e) {
        console.error('Error during user registration:', e);
        res.status(400).json(e);
    }
};

const registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    console.log('Registering admin user:', username);

    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
            isAdmin: true, // Explicitly set isAdmin to true
        });
        console.log('Admin user created:', userDoc);
        res.json(userDoc);
    } catch (e) {
        console.error('Error during admin registration:', e);
        res.status(400).json(e);
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('Logging in user:', username);
    const userDoc = await User.findOne({ username });
    if (userDoc && bcrypt.compareSync(password, userDoc.password)) {
        // Use the secret from the environment variable
        const token = jwt.sign({ username, id: userDoc._id }, process.env.JWT_SECRET_KEY, {});
        console.log('User logged in:', username);
        res.cookie('token', token).json({
            id: userDoc._id,
            username,
            token
        });
    } else {
        console.log('Wrong credentials for user:', username);
        res.status(400).json('Wrong credentials');
    }
};

const getProfile = (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET_KEY, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
};

const logoutUser = (req, res) => {
    res.cookie('token', '').json('Logged out');
};

module.exports = {
    registerUser,
    registerAdmin,
    loginUser,
    getProfile,
    logoutUser,
};
