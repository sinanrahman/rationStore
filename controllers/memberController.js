const Ration = require('../models/Ration');

exports.getMembers = async (req, res) => {
    try {
        const ration = await Ration.findOne({ rationNo: req.params.rationNo });
        res.render('members', { ration });
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

};

exports.addMember = async (req, res) => {
    try {
        const { memberName, relation } = req.body;

        await Ration.updateOne(
            { rationNo: req.params.rationNo },
            {
                $push: {
                    members: { name: memberName, relation }
                }
            }
        );

        res.redirect(`/members/${req.params.rationNo}`);
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

};
