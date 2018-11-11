const mongoose = require('mongoose')

const toKG = require('../../lib/round').toKG
const fromKG = require('../../lib/round').fromKG

const bodyweightSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    bodyweight: {
        type: Number,
        min: 0,
        required: true
    },
    notes: {
        type: String
    }
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
    }
})

bodyweightSchema.virtual('bodyweight.kg')
    .get(function() {
        return toKG(this.bodyweight)
    })
    .set(function(weightInKG) {
        this.set( 'bodyweight', fromKG(weightInKG))
    })

module.exports = bodyweightSchema
