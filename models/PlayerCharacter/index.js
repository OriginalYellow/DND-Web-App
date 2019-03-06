/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const R = require('ramda');
const { screamingToCamelCase } = require('../../util');

const abilityScoreSchema = require('./AbilityScore');
const skillSchema = require('./Skill');

// embedded documents:

const abilityScoreSubDocument = {
  type: abilityScoreSchema,
  default: abilityScoreSchema,
};

const abilityScores = {
  str: abilityScoreSubDocument,
  dex: abilityScoreSubDocument,
  con: abilityScoreSubDocument,
  int: abilityScoreSubDocument,
  wis: abilityScoreSubDocument,
  cha: abilityScoreSubDocument,
};

const skillSubdocument = {
  type: skillSchema,
  default: skillSchema,
};

const skills = {
  acrobatics: skillSubdocument,
  animalHandling: skillSubdocument,
  arcana: skillSubdocument,
  athletics: skillSubdocument,
  deception: skillSubdocument,
  history: skillSubdocument,
  insight: skillSubdocument,
  intimidation: skillSubdocument,
  investigation: skillSubdocument,
  medicine: skillSubdocument,
  nature: skillSubdocument,
  perception: skillSubdocument,
  performance: skillSubdocument,
  persuasion: skillSubdocument,
  religion: skillSubdocument,
  sleightOfHand: skillSubdocument,
  stealth: skillSubdocument,
  survival: skillSubdocument,
};

// parent schema:

const playerCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abilityScores,
  skills,
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

const getBonusTargets = R.pipe(
  R.prop('abilityScores'),
  R.values,
  R.map(R.prop('bonusTargets')),
  R.flatten,
);

const setBonusSources = playerCharacter => R.forEach(
  (bonusTarget) => {
    const skill = playerCharacter.skills[screamingToCamelCase(bonusTarget.targetName)];

    if (skill) {
      // eslint-disable-next-line prefer-destructuring
      const bonusSources = skill.bonusSources;
      const oldBonusSourceIndex = findBonusSourceIndex(bonusTarget)(bonusSources);

      // eslint-disable-next-line no-bitwise
      if (~oldBonusSourceIndex) {
        skill.bonusSources[oldBonusSourceIndex] = bonusTarget;
      } else {
        skill.bonusSources.push(bonusTarget);
      }
    }
  },
);

const findBonusSourceIndex = bonusTarget => R.findIndex(
  R.allPass([
    R.propEq('sourceName', bonusTarget.sourceName),
    R.propEq('sourceType', bonusTarget.sourceType),
  ]),
);

playerCharacterSchema.virtual('abilityScoreList').get(function () {
  return R.pipe(
    R.values,
    // for some reason there is an extra boolean element in abilityScores so i'm
    // removing it here:
    R.dropWhile(R.complement(R.is(Object))),
  )(this.abilityScores);
});

playerCharacterSchema.pre('save', function (next) {
  // MIKE: "isNew" is on every subdocument so you should be able to use it for
  // specific subdocuments in here as well

  if (this.isNew) {
    R.forEachObjIndexed(
      (_, key) => { this.abilityScores[key].name = R.toUpper(key); },
      this.abilityScores,
    );
  }

  R.pipe(
    getBonusTargets,
    setBonusSources,
  )(this);

  next();
});

playerCharacterSchema.set('toObject', { virtuals: true });
playerCharacterSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('PlayerCharacter', playerCharacterSchema);
