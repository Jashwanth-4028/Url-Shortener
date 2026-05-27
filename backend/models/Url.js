import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    customAlias: {
      type: String,
      default: null,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    qrCode: {
      type: String,
      default: null,
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    lastVisited: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

urlSchema.index({ userId: 1, createdAt: -1 });

const Url = mongoose.model('Url', urlSchema);
export default Url;
