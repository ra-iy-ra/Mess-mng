const mongoose = require('mongoose');

const clusterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Cluster', clusterSchema);
