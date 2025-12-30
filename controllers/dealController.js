const Ration = require('../models/Ration');

exports.dealPage = async (req, res) => {
    try {
        const ration = await Ration.findOne({ rationNo: req.params.rationNo });
        if (!ration) return res.send('Not Found');

        res.render('deals', { ration });
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

};

exports.purchasePage = async (req, res) => {
    try {
        const ration = await Ration.findOne({ rationNo: req.params.rationNo });
        if (!ration) return res.send('Not Found');

        res.render('purchase', { ration });
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

};


// try{

//     }  catch (e){
//         console.log(e)
//         res.redirect('/')
//     }