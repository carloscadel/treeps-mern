const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const treepSchema = new Schema({
  _owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: String,
  location: String,
  startDate: Date,
  endDate: Date,
  formattedDates: String,
  hideMe: Boolean
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Treep = mongoose.model('Treep', treepSchema);
module.exports = Treep;
