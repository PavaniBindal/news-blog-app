const newsModel = require('../models/News');
const categoryModel = require('../models/Category');

const allCategory = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/categories/index', {categories, role: req.role});
};
const addCategoryPage = (req, res) => {
    res.render('admin/categories/create', {role: req.role});
};

const addCategory = (req, res) => {
    try{
        categoryModel.create(req.body);
        res.redirect('/admin/categories');
    }catch(err){
        console.log(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const updateCategoryPage = async (req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        res.render('admin/categories/update', {role: req.role, category});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const updateCategory = async (req, res) => {
    try{
        const category = await categoryModel.findById(req.params.id);
        category.name = req.body.name;
        category.description = req.body.description;
        await category.save();
        res.redirect('/admin/categories');
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    try{
        const category = await categoryModel.findByIdAndDelete(id);
        if(!category){
            return res.status(404).json({message: 'Category not found'});
        }
        res.json({success: true});
    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Internal server error'});
    }
};

module.exports = {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory
};