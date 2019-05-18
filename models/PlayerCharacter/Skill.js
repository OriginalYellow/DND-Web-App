/* eslint-disable func-names */
const mongoose = require('mongoose');
const R = require('ramda');

const bonusSource = require('./BonusSource');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'UNSET',
  },
  baseValue: {
    type: Number,
    required: true,
    default: 0,
  },
  proficient: {
    type: Boolean,
    required: true,
    default: false,
  },
  bonusSources: [bonusSource],
});

const calcBonuses = R.pipe(
  R.prop('bonusSources'),
  R.map(R.prop('value')),
  R.sum,
);

skillSchema.virtual('value').get(function () {
  return this.baseValue + calcBonuses(this);
});


module.exports = skillSchema;
