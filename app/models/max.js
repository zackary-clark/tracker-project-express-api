const mongoose = require('mongoose')

const toKG = require('../../lib/round').toKG
const fromKG = require('../../lib/round').fromKG

const maxSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  squat1RM: {
    type: Number,
    min: 0
  },
  bench1RM: {
    type: Number,
    min: 0
  },
  deadlift1RM: {
    type: Number,
    min: 0
  },
  press1RM: {
    type: Number,
    min: 0
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

maxSchema.virtual('total').get(function() {
  if (this.squat1RM && this.bench1RM && this.deadlift1RM) {
    return this.squat1RM + this.bench1RM + this.deadlift1RM
  } else {
    return false
  }
})

maxSchema.virtual('total_kg').get(function() {
  if (this.squat1RM && this.bench1RM && this.deadlift1RM) {
    return this.squat1RM_kg + this.bench1RM_kg + this.deadlift1RM_kg
  } else {
    return false
  }
})

maxSchema.virtual('squat1RM_kg')
  .get(function() {
    return this.squat1RM ? toKG(this.squat1RM) : false
  })
  .set(function(weightInKG) {
    this.set( 'squat1RM', fromKG(weightInKG))
  })

maxSchema.virtual('bench1RM_kg')
  .get(function() {
    return this.bench1RM ? toKG(this.bench1RM) : false
  })
  .set(function(weightInKG) {
    this.set( 'bench1RM', fromKG(weightInKG))
  })

  maxSchema.virtual('deadlift1RM_kg')
  .get(function() {
    return this.deadlift1RM ? toKG(this.deadlift1RM) : false
  })
  .set(function(weightInKG) {
    this.set( 'deadlift1RM', fromKG(weightInKG))
  })

  maxSchema.virtual('press1RM_kg')
  .get(function() {
    return this.press1RM ? toKG(this.press1RM) : false
  })
  .set(function(weightInKG) {
    this.set( 'press1RM', fromKG(weightInKG))
  })

module.exports = maxSchema
