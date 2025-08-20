const jwt = require('jsonwebtoken');

const isLogin = (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.redirect('/admin');    
        }
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.id = tokenData.id;
        req.role = tokenData.role;
        req.fullname = tokenData.fullname
        next();
    }catch(err){
        return res.status(500).json({message: 'Internal server error'});
    }    
};

module.exports = isLogin;
