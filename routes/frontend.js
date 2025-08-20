const express = require('express');
const router = express.Router();

const {
    index,
    articleByCategory,
    singleArticle,
    search,
    articleByAuthor,
    addComment
} = require('../controllers/siteController');

router.get('/', index);
router.get('/category/:name', articleByCategory);
router.get('/single/:id', singleArticle);
router.get('/search', search);
router.get('/author/:name', articleByAuthor);
router.post('/single/:id', addComment);

module.exports = router;