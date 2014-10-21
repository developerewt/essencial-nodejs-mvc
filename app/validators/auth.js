var AuthValidator = {
    storeSession: function(easySession){
        return this.mySessionn = easySession;
    },

    isLogged: function(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    },

    isOn: function(req, res, next) {
        if (req.user) {
            res.redirect('/dashboard');
        } else {
            next();
        }
    }
}

module.exports = AuthValidator;