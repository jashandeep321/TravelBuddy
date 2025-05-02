import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bannerImage: { type: String }, // Store path of the banner image
  baseImages: [{ type: String }], // Array to store multiple base image paths
  category: { type: String },
  location: { type: String },

  // 🌟 New fields
  placesToVisit: [{ type: String }], // Bullet-list style rendering in frontend
  foodToTry: [{ type: String }],     // Array of famous dishes
  languages: [{ type: String }],     // Languages spoken
  whenNotToVisit: { type: String },  // e.g., "Mid-July to August due to heavy rain"
  bestTimeToVisit: { type: String },
  transportation: [{ type: String }],
  stars: { type: String },
  price: { type: String },
  slug: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Destination', destinationSchema);
