const mongoose = require('mongoose')
const Schema = mongoose.Schema

const treepSchema = new Schema(
  {
    name: String,
    location: String,
    startDate: Date,
    endDate: Date,
    formattedDates: String,
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

const Treep = mongoose.model('Treep', treepSchema)
module.exports = Treep
