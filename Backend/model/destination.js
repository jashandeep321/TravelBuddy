import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bannerImage: { type: String }, 
  baseImages: [{ type: String }], 
  category: { type: String },
  location: { type: String },


  placesToVisit: [{ type: String }], 
  foodToTry: [{ type: String }],     
  languages: [{ type: String }],     
  whenNotToVisit: { type: String },  
  bestTimeToVisit: { type: String },
  transportation: [{ type: String }],
  stars: { type: String },
  price: { type: String },
  slug: { type: String }
}, {
  timestamps: true
});

export default mongoose.model('Destination', destinationSchema);
