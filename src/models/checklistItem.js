import mongoose from 'mongoose';

const ChecklistItemSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  price: {
    type: Number,
    default: 0.0,
    min: 0
  }
}, { timestamps: true });

export default mongoose.model('ChecklistItem', ChecklistItemSchema);