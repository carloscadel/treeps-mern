const mongoose = require('mongoose') // Erase if already required
const Schema = mongoose.Schema

// Declare the Schema of the Mongo model
var treepCollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    treeps: [{ type: Schema.Types.ObjectId, ref: 'Treep' }],
    _ownerId: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

//Export the model
module.exports = mongoose.model('TreepCollection', treepCollectionSchema)
