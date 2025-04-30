import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    category: { type: String },
    location :{type:String},
}, {
    timestamps: true
});

export default mongoose.model('Destination', destinationSchema);