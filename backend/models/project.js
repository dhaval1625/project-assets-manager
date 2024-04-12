const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
   {
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
            description: String,
         },
      ],
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
      },
      isCurrent: Boolean,
   },
   { timestamps: true }
);

projectSchema.index({ title: 'text' });

module.exports = model('Project', projectSchema);
