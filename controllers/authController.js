const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
       console.log("modelchane",password)
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        const existingUser = await User.findOne({ username });
        console.log("existingUser",existingUser)
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const password_hash = await bcrypt.hash(password, 10);
        console.log("------------",password_hash)
        const user = new User({ username, password_hash, role });
        console.log("userxxxxx",user)
        await user.save();
        console.log("user",user)
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error registering user' });
    }
};

// Login and issue JWT
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Error logging in' });
    }
};
