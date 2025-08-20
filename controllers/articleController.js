const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const newsModel = require('../models/News');
const categoryModel = require('../models/Category');

const allArticle = async (req, res) => {
    try{
        let articles;
        if(req.role === 'admin'){
            articles = await newsModel.find().populate('category', 'name').populate('author', 'fullname');
        }
        else{
            articles = await newsModel.find({author: req.id}).populate('category', 'name').populate('author', 'fullname');
        }
        res.render('admin/articles/index', {role: req.role, articles});
    }catch(error){
        console.error(error);
        res.status(500).render('error500');
    }
};

const addArticlePage = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/articles/create', {role: req.role , categories});
};


const addArticle = async (req, res) => {
    try{
        const {title , content , category} = req.body;
        const article = new newsModel({
            title ,
            content,
            category,
            author : req.id,
            image: `uploads/${req.file.filename}`
        });
        await article.save();
       res.redirect('/admin/articles');
    }
    catch(err){
        console.error(err);
        res.status(500).send({message: 'Internal server error'});
    }
};

const updateArticlePage = async (req, res) => {
    try{
        const article = await newsModel.findById(req.params.id).populate('category', 'name').populate('author', 'fullname');
        const categories = await categoryModel.find();

        if(req.role === 'author'){
            if(req.id !== article.author._id){
                return res.status(403).send({message: 'Forbidden'});
            }
        }

        res.render('admin/articles/update', {role: req.role, article, categories});
    }catch(err){
        console.error(err);
        res.status(500).send({message: 'Internal server error'});
    }
};
const updateArticle = async (req, res) => {
    try{
        const article = await newsModel.findById(req.params.id);
        if(!article){
            return res.status(404).send({message: 'Article not found'});
        }
        article.title = req.body.title;
        article.content = req.body.content;
        article.category = req.body.category;
        if(req.file){
            article.image = `uploads/${req.file.filename}`
        }
        await article.save();
        res.redirect('/admin/articles');
    }
    catch(err){
        console.error(err);
        res.status(500).send({message: 'Internal server error'});
    }
};

const deleteArticle = async (req, res) => {
    try{
        const article = await newsModel.findById(req.params.id);
        if(!article){
            return res.status(404).send({message: 'Article not found'});
        }

        if(req.role === 'author'){
            if(req.id !== article.author._id){
                return res.status(403).send({message: 'Forbidden'});
            }
        }

        // Build the image path (since you saved `images/filename.png`)
        const imagePath = path.join(__dirname, '..', 'public', article.image);

        // Delete image if it exists
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        await newsModel.findByIdAndDelete(req.params.id);
        res.json({success: true});
    }
    catch(err){
        console.error(err);
        res.status(500).send({message: 'Internal server error'});
    }
};

module.exports = {
    allArticle,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle
};



