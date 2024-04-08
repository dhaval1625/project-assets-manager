const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
   title: {
      type: String,
      required: true,
   },
   primaryUrl: String,
   figma: String,
   githubRepo: String,
   additionalDetails: [
      {
         title: String,
         description: String
      }
   ],
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
   },
})

module.exports = model('Project', projectSchema);