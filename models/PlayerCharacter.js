// MIKE: if you end up calling populate() a lot on entities, look in to the
// autopopulate mongoose plugin:
// http://plugins.mongoosejs.io/plugins/autopopulate

const mongoose = require('mongoose');

const PlayerCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  abilityScores: [
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      proficient: {
        type: Boolean,
        required: true,
      },
      bonusSources: [
        {
          explanation: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
  skills: [
    {
      name: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      proficient: {
        type: Boolean,
        required: true,
      },
      bonusSources: [
        {
          explanation: {
            type: String,
            required: true,
          },
        },
      ],
    },
  ],
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
