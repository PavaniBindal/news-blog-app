const userModel = require('../models/User');

const allUser = async (req, res) => {
    const users = await userModel.find();
    res.render('admin/users/index', { users , role: req.role });
};

const addUserPage = async (req, res) => {
    res.render('admin/users/create', {role: req.role});
};
const addUser = async (req, res) => {
    await userModel.create(req.body);
    res.redirect('/admin/users'); 
};

const updateUserPage = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.render('admin/users/update', { user , role: req.role});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    const id  = req.params.id;
    try {
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullname = req.body.fullname;
        if(req.body.password) user.password =  req.body.password;
        user.role = req.body.role;
        await user.save();

        res.redirect('/admin/users');
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try{
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        res.json({success: true});
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    allUser,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser
};