const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
  playerCharacters: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'PlayerCharacter',
  },
  notes: String,
});

module.exports = mongoose.model('Campaign', CampaignSchema);
