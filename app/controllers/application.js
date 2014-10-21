var bcrypt          = require('bcrypt-nodejs');
var User            = require('../models/users');
var fs              = require('fs');

var ApplicationController = {
    index: function(req,res) {
        if(req.user) {
            var returnData = {
                title: '4routes',
                userData: req.user,
            };
        }
        else
        {
            var returnData = {
                title: '4routes',
                userData: '',
            };
        }

        res.render('./site/index',returnData);
    },

    createAccount: function(req,res) {
        var error = 0;

        if(req.body.name.length < 4)
            error = 1;

        if(req.body.email.length < 6 || req.body.email.indexOf('@') == '-1')
            error = 1;

        if(req.body.password !== req.body.repassword)
            error = 1;

        if(error === 0)
        {
            var userSaved = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
                level: 1,
            });

            userSaved.save(function(err, userSaved) {
                if (err) return console.log(err);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({data: 'ok'}));
            });
        }

    },

    dashboard: function(req,res) {
        /**
         * In debugging env is possible to enable this method.
         * It insert one user on database.
         *
         */

        console.log(req);

        res.render('./app/index',{
            title: '4routes',
            userData: req.user,
        });
    },
}

module.exports = ApplicationController;