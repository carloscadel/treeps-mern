const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, default:""},
  email: {type: String, unique: true, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
  password: String,
  profImgPath: {type: String,  default:""},
  public_id: {type: String, default:""},
  confirmationCode: String,
  status: {type: String, enum: ["active", "inactive"], default: "inactive"},
  treeps: {  
    name: String,
    location: String,
    startDate: Date,
    endDate: Date,
    hideMe: Boolean 
  }
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
