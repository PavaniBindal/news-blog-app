const isAdmin = (req,res,next) => {
    if(req.role !== 'admin'){
        res.redirect('/admin/dashboard');
    }
    else{
        next();
    }
}

module.exports = isAdmin;

