const mongoose = require('mongoose');
const commentModel = require('../models/Comment');

const allComment = async (req, res) => {
    try {
        const comments = await commentModel.find();
        res.render('admin/comments/index', { comments , role: req.role });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    allComment
};