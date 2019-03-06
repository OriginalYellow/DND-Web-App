const sourceTypes = [
  'ABILITY_SCORE',
  'USER_OVERRIDE',
];

const sourceNames = [
  'STR',
  'DEX',
  'CON',
  'INT',
  'WIS',
  'CHA',
];

const bonusSource = {
  sourceName: {
    type: String,
    enum: sourceNames,
    required: true,
  },
  sourceType: {
    type: String,
    enum: sourceTypes,
    required: true,
  },
  targetName: {
    type: String,
    required: true,
  },
  targetType: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
};

module.exports = bonusSource;
