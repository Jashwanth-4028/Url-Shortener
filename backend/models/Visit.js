import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Url',
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    browser: {
      type: String,
      default: 'Unknown',
    },
    device: {
      type: String,
      default: 'Unknown',
    },
    ipAddress: {
      type: String,
      default: null,
    },
  },
  { timestamps: false }
);

visitSchema.index({ urlId: 1, timestamp: -1 });

const Visit = mongoose.model('Visit', visitSchema);
export default Visit;
