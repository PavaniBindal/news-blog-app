const mongoose = require('mongoose');

const categoryModel = require('../models/Category');
const newsModel = require('../models/News');
const commentModel = require('../models/Comment');  
const userModel = require('../models/User');

const index = (req, res) => {
    res.render('index');
};

const articleByCategory = async (req, res) => {
    res.render('category');
};

const singleArticle = async (req, res) => {
    res.render('single');
};


const search = async (req, res) => {
    res.render('search');
};


const articleByAuthor = async (req, res) => {
    res.render('author');
};

const addComment = async (req, res) => { };

module.exports = {
    index,
    articleByCategory,
    singleArticle,
    search,
    articleByAuthor,
    addComment
}