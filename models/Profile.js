import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String,
    required: true
  },
  bio: { 
    type: String,
    default: ''
  },
  artType: { 
    type: String,
    default: ''
  },
  photoUrl: { 
    type: String,
    default: ''
  },
  bannerUrl: { 
    type: String,
    default: ''
  },
  genre: { 
    type: String,
    default: ''
  },
  stageName: { 
    type: String,
    default: ''
  },
  showcase: { 
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  producerTag: { 
    type: String,
    default: ''
  },
  engineerTag: { 
    type: String,
    default: ''
  },
  directedBy: { 
    type: String,
    default: ''
  },
  designerStyle: { 
    type: String,
    default: ''
  },
  skitmakerName: { 
    type: String,
    default: ''
  },
  vixenName: { 
    type: String,
    default: ''
  },
  resetToken: { 
    type: String,
    default: null
  },
  resetTokenExpiry: { 
    type: Date,
    default: null
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

// Update the updatedAt field before saving
ProfileSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Ensure the model is only created once
const Profile = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

export default Profile; 