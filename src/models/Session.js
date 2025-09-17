const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  userIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  activeFileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Session', sessionSchema);