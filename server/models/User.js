const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true, match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
    password: String,
    profImgName: { type: String, default: '' },
    profImgPath: { type: String, default: 'https://res.cloudinary.com/carloscadel/image/upload/v1551778962/treeps/user_generic.svg' },
    previousUserStatus: { type: String, default: '' },
    userStatus: { type: String, default: '' },
    dob: { type: Date, required: true },
    confirmationCode: String,
    confirmed: { type: Boolean, default: false }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

const User = mongoose.model('User', userSchema)
module.exports = User
