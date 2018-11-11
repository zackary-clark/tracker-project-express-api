// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')
const ObjectId = require('mongodb').ObjectID

const User = require('../models/user')

// we'll use this to intercept any errors that get thrown and send them
// back to the client with the appropriate status code
const handle = require('../../lib/error_handler')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `res.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
router.get('/maxes', requireToken, (req, res) => {
    User.findById(req.user.id)
        .then(handle404)
        .then(user => user.maxes.map( max => max.toObject() ))
        .then(maxes => res.status(200).json({ maxes: maxes }))
        .catch(err => handle(err, res))
})

// CREATE
router.post('/maxes', requireToken, (req, res) => {
    User.findOneAndUpdate(
        {
            _id: ObjectId(req.user.id)
        }, {
            $push: {
                maxes: req.body.max
            }
        }, {
            new: true,
            fields: 'maxes',
            projection: 'maxes'
        },
            (err, success) => {
                err ? handle(err, res) : res.status(201).json({ max: success.maxes.slice(-1)[0] })
    })
})

module.exports = router