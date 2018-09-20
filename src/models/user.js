import mongoose from 'mongoose';
import { pickProps, omitProps } from '../helpers/object'
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  full_name: String,
  avatar: {
    type: String,
    default: 'default.jpg'
  },
  rating:{
    all: Number,
    as_executor: Number,
    as_employer: Number
  },
  name: String,
  login: String, 
  email: {
    type: String,
    index: { unique: true }
  },
  role: {
    type: String,
    enum: ['user' ,'admin'],
    default: 'user'
  },
  confirmed_email: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    index: { unique: true }
  },
  confirmed_mobile:{
    type: Boolean,
    default: false
  },
  privateData: ['mobile'],
  data_born: Date,
  date_reg: Date,
  projects : [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }]
});

UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, function(err, hash) {
    if (err) return next(err);

    this.password = hash;
    next();
  }.bind(this));
});

UserSchema.methods.getTokenData = function() {
  return {
    id: this.id
  }
};

UserSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

UserSchema.methods.equals = function(user) {
  return this._id.toString() == user._id.toString();
};

UserSchema.methods.haveFullAccessFor = function(object) {
  return this.equals(object) ||
    (object.author && object.author == this.id) ||
    this.role == "admin";
};

UserSchema.methods.getShortUserData = function() {
  return pickProps(this, ['_id', 'name', 'avatar', 'rating'])
};

UserSchema.methods.getFullUserData = function(object){
  if (!object) return {}

  if (!object.haveFullAccessFor(this)) {
    return omitProps(omitProps(this, ['password', 'mobile']), this.privateData)
  } else {
    return this
  }
}

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);
