import mongoose from 'mongoose'; 

const packageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },

  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
  itinerary: [{
    day: Number,
    title: String,
    activities: String
  }],
  travelMode: { type: String },
  accommodationDetails: { type: String },
  mealPlan: { type: String },
  bookingDeadline: { type: Date },
  availableDates: [{ type: Date }],
  slug: { type: String, unique: true },

  image: { type: String }, // 🌟 Main banner image (hero image)

  // 🌟 Structured image object
  images: {
    sightseeing: { type: [String], default: [] },
    hotel: { type: [String], default: [] },
    restaurant: { type: [String], default: [] }
  }

}, {
  timestamps: true
});


export default mongoose.model('Packages', packageSchema);


