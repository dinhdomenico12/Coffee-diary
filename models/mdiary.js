const mongoose = require('mongoose');

const diaryEntrySchema = new mongoose.Schema({
      Bean: String,
      Roast: String,
      Region: String,
      Ratio: String,
      Grind: String,
      Weight: Number,
      Water: Number,
      Review: String,
      }, {
      timestamps: true
      });

      const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      googleId: String,
      diaryEntries: [diaryEntrySchema]
      }, {
      timestamps: true
      });

      module.exports = mongoose.model('user', userSchema);