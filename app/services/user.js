var User            = require('../models/users');
var bcrypt          = require('bcrypt-nodejs');

var UserServices = {

    /**
     * Método responsável por inserir um usuário de exemplo na base.
     */
    exampleUser: function() {
        var ewt = new User({
            name: "Ewerton Melo",
            gender: "Masculino",
            email: "ewt.melo@gmail.com",
            password: bcrypt.hashSync("123456"),
            level: 1,
            active: 1,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deletedAt: ""
        });

        ewt.save(function(err, ewt) {
            if (err) return console.log(err);
            console.dir(ewt);
        });
    },
}

module.exports = UserServices;