/* eslint-disable func-names */
const mongoose = require('mongoose');
const R = require('ramda');
const RA = require('ramda-adjunct');

// embedded documents:

const bonusSource = {
  explanation: {
    type: String,
    required: true,
  },
};

const abilityScore = {
  value: {
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
};

const abilityScores = {
  str: abilityScore,
  dex: abilityScore,
  con: abilityScore,
  int: abilityScore,
  wis: abilityScore,
  cha: abilityScore,
};

const skill = {
  value: {
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
};

// schema:

const playerCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abilityScores,
  skills: {
    acrobatics: skill,
    animalHandling: skill,
    arcana: skill,
    athletics: skill,
    deception: skill,
    history: skill,
    insight: skill,
    intimidation: skill,
    investigation: skill,
    medicine: skill,
    nature: skill,
    perception: skill,
    performance: skill,
    persuasion: skill,
    religion: skill,
    sleightOfHand: skill,
    stealth: skill,
    survival: skill,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// virtuals:

playerCharacterSchema.virtual('abilityScoreList').get(function () {
  return R.pipe(
    R.values,
    // for some reason there is an extra boolean element in abilityScores so i'm
    // removing it here:
    R.dropWhile(R.complement(R.is(Object))),
  )(this.abilityScores);
});

// MIKE: instead of using these crazy virtuals for embedded documents, use
// subdocuments and regular-ass virtuals (see
// https://mongoosejs.com/docs/subdocs.html)

const createNameVirtuals = (schema, path, nameProperty, transform) => R.forEachObjIndexed(
  (_, key) => {
    schema.virtual(`${path}.${key}.${nameProperty}`)
      .get(() => transform(key));
  },
);

const createModifierVirtuals = (schema, path, modifierProperty) => R.forEachObjIndexed(
  (_, key) => {
    schema.virtual(`${path}.${key}.${modifierProperty}`)
      .get(function () {
        return RA.floor((this[path][key].value - 10) / 2);
      });
  },
);

createNameVirtuals(playerCharacterSchema, 'abilityScores', 'name', R.toUpper)(abilityScores);
createModifierVirtuals(playerCharacterSchema, 'abilityScores', 'modifier')(abilityScores);

playerCharacterSchema.set('toObject', { virtuals: true });
playerCharacterSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('PlayerCharacter', playerCharacterSchema);
