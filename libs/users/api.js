var userDb = require("./schema.js");

module.exports = {
    findOne: function(query, projection, options, callback) {
        try {
            userDb.findOne(query, projection, options, function(err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    result = {
                        data: result,
                        status: 200
                    };
                    callback(null, result);
                }
            });
        } catch (e) {
            console.log(e);
            callback(e, null);
        }
    },
    add: function(userObj, callback) {
        try {
            userDb.create(userObj, function(err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    delete result.password;
                    callback(null, result);
                }
            });
        } catch (e) {
            console.log(e);
            callback(e, null);
        }
    },
    updateCount: function(query, callback) {
        try {
            userDb.update(query, {$inc: {login_count: 1}}, function(err, result) {
                if (err) {
                    callback(err, null);
                } else {
                    callback(null, result);
                }
            });
        } catch (e) {
            console.log(e);
            callback(e, null);
        }
    }
}