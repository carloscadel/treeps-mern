const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const treepSchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  treepName: String,
  treepLocation: String,
  treepStartDate: Date,
  treepEndDate: Date,
  hideMe: Boolean
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Treep = mongoose.model('Treep', treepSchema);
module.exports = Treep;
