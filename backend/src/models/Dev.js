const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

const DevSchema = new mongoose.Schema({
  avatar_url: String,
  bio: String,
  github_username: String,
  location: {
    type: PointSchema,
    index: '2dsphere'
  },
  name: String,
  skills: [String],
});

module.exports = mongoose.model('Dev', DevSchema);