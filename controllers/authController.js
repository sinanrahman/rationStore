exports.loginPage = (req, res) => {
    res.render('auth/Login');
};

exports.login = (req, res) => {
    try {
        const { username, password } = req.body;

        if (username === 'admin' && password === '1234') {
            res.redirect('/');
        } else {
            res.render('auth/Login', { error: 'Invalid credentials' });
        }
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }


};
