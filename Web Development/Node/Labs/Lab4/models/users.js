const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 8,
      maxLength: 20,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 15,
      required: true
    },
    dob: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          return value <= new Date();
        },
        message: 'Date of birth cannot be in the future.'
      }
    }
  },
  {timestamps: true}
);

usersSchema.pre('save', function save() {
  this.password = bcrypt.hashSync(this.password, 10);
  return this;
});

usersSchema.pre(
  ['updateOne', 'findOneAndUpdate', 'updateMany'],
  function update() {
    const update = this.getUpdate();

    if (update.password) {
      update.password = bcrypt.hashSync(update.password, 10);
    }
  }
);

usersSchema.set('toJSON', {
  transform: (doc, {__v, password, createdAt, updatedAt, ...rest}, options) =>
    rest
});

const Users = mongoose.model('Users', usersSchema);

module.exports = Users;
