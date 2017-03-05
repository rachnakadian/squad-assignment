var express = require('express');
var router = express.Router();

var api = require('../libs/users/api');

router.get('/:email', function(req, res, next) {
    try {
        api.findOne({email: req.params.email}, {}, {}, function(err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(response);
            }
        });
    } catch (e) {
        console.log(e.stack);
        res.status(500).send(e);
    }
});

router.post('/addOrUpdate', function(req, res, next) {
    try {
    	var data = req.body;
    	api.findOne({email: data.email}, {}, {}, function(err, user) {
    		if(err) {
    			res.status(500).send(err);
    		} else {
    			console.log(user, user.data);
    			if(user.data && Object.keys(user.data).length) {
    				api.updateCount({_id: user.data._id}, function(err, response) {
		                if (err) {
		                    res.status(500).send(err);
		                } else {
		                    res.status(200).send(response);
		                }
		            });
    			} else {
			        api.add(data, function(err, response) {
			            if (err) {
			                res.status(500).send(err);
			            } else {
			                res.status(200).send(response);
			            }
			        });
    			}
    		}
    	})
    } catch (e) {
        console.log(e.stack);
        res.status(500).send(e);
    }
});

router.put('/update', function(req, res, next) {
    try {
        var data = req.body;
        if (Object.keys(data).length && data.updations && Object.keys(data.updations).length) {
            api.update(data.query || {}, data.updations, data.options || {}, function(err, response) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send(response);
                }
            });
        } else {
            res.status(422).send({
                "message": "No updations"
            });
        }
    } catch (e) {
        console.log(e.stack);
        res.status(500).send(e);
    }
});

module.exports = router;