// app/routes/account.js
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/is-authenticated', (req, res) => {
    res.json({ isAuthenticated: !!req.session.user });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to log out' });
        }
        res.redirect('/');
    });
});

router.post('/signup', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if (!password || !email || !name) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }
  
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: "Passwords do not match" });
    }
  
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        req.session.user = newUser;
        res.json({ success: true, message: "Account registered" });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(409).json({ success: false, message: "Email already exists" });
        } else {
            res.status(500).json({ success: false, message: "Server error", error: err.message });
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Auth failed: User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Auth failed: Incorrect password' });
        }
        req.session.user = user;
        res.json({ success: true, message: 'Login successful' });  
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server error' });  
    }
});

module.exports = router;
