const express = require('express');
const router = express.Router();

const { loginPage, adminLogin, logout, dashboard, setting} = require('../controllers/adminController');
const { allUser, addUserPage, addUser, updateUserPage, updateUser, deleteUser } = require('../controllers/userController');
const { allCategory, addCategoryPage, addCategory, updateCategoryPage, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { allArticle, addArticlePage, addArticle, updateArticlePage, updateArticle, deleteArticle } = require('../controllers/articleController');
const { allComment } = require('../controllers/commentController');

const isLogin = require('../middleware/isLogin');
const isAdmin = require('../middleware/isAdmin');
const upload = require('../middleware/multer');

router.get('/', loginPage);
router.post('/index', adminLogin);
router.get('/logout', logout);
router.get('/dashboard',isLogin, dashboard);
router.get('/settings',isLogin,isAdmin, setting);


//user crud route
router.get('/users',isLogin,isAdmin, allUser);
router.get('/add-user',isLogin,isAdmin, addUserPage);
router.post('/add-user',isLogin,isAdmin, addUser);
router.get('/update-user/:id',isLogin,isAdmin, updateUserPage);
router.post('/update-user/:id',isLogin,isAdmin, updateUser);
router.delete('/delete-user/:id',isLogin,isAdmin, deleteUser);

//category crud route
router.get('/categories',isLogin,isAdmin, allCategory);
router.get('/add-category',isLogin,isAdmin, addCategoryPage);
router.post('/add-category',isLogin,isAdmin, addCategory);
router.get('/update-category/:id',isLogin,isAdmin, updateCategoryPage);
router.post('/update-category/:id',isLogin,isAdmin, updateCategory);
router.delete('/delete-category/:id',isLogin,isAdmin, deleteCategory);

//article crud route
router.get('/articles',isLogin, allArticle);
router.get('/add-article',isLogin, addArticlePage);
router.post('/add-article',isLogin,upload.single('image'), addArticle);
router.get('/update-article/:id',isLogin, updateArticlePage);
router.post('/update-article/:id',upload.single('image'),isLogin, updateArticle);
router.delete('/delete-article/:id',isLogin, deleteArticle);

//comment crud route
router.get('/comments',isLogin, allComment);

module.exports = router;