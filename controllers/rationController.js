const Ration = require('../models/Ration');

exports.getUsers = async (req, res) => {
    try {
        const rationList = await Ration.find();
        res.render('users', { rationList });
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

};

exports.addUserPage = (req, res) => {
    res.render('addUsers');
};

exports.addUser = async (req, res) => {
    const { name, houseName, rationNo, category } = req.body;

    try {
        await Ration.create({
            name,
            houseName,
            rationNo,
            category,
            members: []
        });

        res.redirect('/');
    } catch (e) {
        console.log(e)
        res.send('Ration number already exists');
    }
};

exports.goodsPage = (req, res) => {
    res.render('goods');
};
