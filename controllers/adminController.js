const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const userModel = require('../models/User');

const loginPage = (req, res) => {
    res.render('admin/login' , { layout: false});
};

const adminLogin = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await userModel.findOne({username});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: 'Password is incorrect'});
        }

        const jwtData = {id: user._id ,fullname: user.fullname, role: user.role};
        const token = jwt.sign(jwtData, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
        res.cookie('token', token, {httpOnly: true, maxAge: 60*60*1000});
        res.redirect('/admin/dashboard');    
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }    
};


const dashboard = (req, res) => {
    res.render('admin/dashboard', {role: req.role});
};

const setting = (req, res) => {
    res.render('admin/settings', {role: req.role});
};



const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/admin');
};

module.exports = { loginPage, adminLogin, logout, dashboard, setting};