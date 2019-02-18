// MIKE: if you end up calling populate() a lot on entities, look in to the
// autopopulate mongoose plugin:
// http://plugins.mongoosejs.io/plugins/autopopulate

const mongoose = require('mongoose');

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

const PlayerCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }, 
  abilityScores: {
    str: abilityScore,
    dex: abilityScore,
    con: abilityScore,
    int: abilityScore,
    wis: abilityScore,
    cha: abilityScore,
  },
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

// // Create index to search on all fields of posts
// PostSchema.index({
//   '$**': 'text',
// });

module.exports = mongoose.model('PlayerCharacter', PlayerCharacterSchema);
