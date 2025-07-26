import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  artType: { type: String },
  photoUrl: { type: String },
  bannerUrl: { type: String },
  genre: { type: String },
  stageName: { type: String },
  showcase: { type: mongoose.Schema.Types.Mixed },
  producerTag: { type: String },
  engineerTag: { type: String },
  directedBy: { type: String },
  designerStyle: { type: String },
  skitmakerName: { type: String },
  vixenName: { type: String },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Profile || mongoose.model('Profile', ProfileSchema); 