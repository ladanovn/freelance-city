import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  title: String,
  prize: Number,
  content: String,
  category: {
    type: String,
    enum: ['itAndComputers',
           'design',
           'beautyAndHealth',
           'education',
           'events',
           'repairAndConstruction',
           'transport',
           'homeHelp',
           'careOfAnimals',
           'photoAndVideo',
           'legalAid',
           'other'] 
  },
  img:[{
    url: String
  }],
  date_created: Date,
  date_expired: Date,
  date_close: Date,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  executor:{
    type: Schema.Types.ObjectId,
    ref: 'User'    
  },
  active: {
    type: Boolean,
    default: false
  },
  views: Number,
  responsed_users:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

ProjectSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Project', ProjectSchema);
