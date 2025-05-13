// import mongoose from 'mongoose';

// const packageSchema = new mongoose.Schema({
//   title: { type: String, required: true },               // Package name
//   description: { type: String, required: true },         // Overview of the package
//   destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination' }, // Link to a destination
//   duration: { type: String, required: true },            // e.g., "5 Days, 4 Nights"
//   price: { type: Number, required: true },               // Total cost
//   category: { type: String },                            // e.g., "Adventure", "Romantic", etc.

//   // 🌟 Details included in the package
//   inclusions: [{ type: String }],                        // e.g., "Hotel stay", "Meals", "Sightseeing"
//   exclusions: [{ type: String }],                        // e.g., "Personal expenses", "Travel insurance"
//   itinerary: [{                                          // Day-by-day breakdown
//     day: Number,
//     title: String,
//     activities: String
//   }],
//   travelMode: { type: String },                          // e.g., "By Air", "By Train", "Bus"
//   accommodationDetails: { type: String },                // Hotel names or types
//   mealPlan: { type: String },                            // e.g., "Breakfast only", "All meals included"
//   bookingDeadline: { type: Date },                       // Last date to book
//   availableDates: [{ type: Date }],                      // Upcoming slots
//   slug: { type: String, unique: true },                  // For URL-friendly routing
//   image: { type: String },                               // Banner or main image for the package
// }, {
//   timestamps: true
// });

// export default mongoose.model('Packages', packageSchema);
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


