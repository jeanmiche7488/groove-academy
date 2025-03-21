import { Schema, model, models, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  age: number;
  isEmailVerified: boolean;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  stripeCustomerId?: string;
  courses: {
    type: 'instrument' | 'workshop';
    instrument?: string;
    format: 'individual' | 'group';
    schedule: { [key: string]: string[] };
    workshop?: string;
    concert: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 1,
    max: 120,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  stripeCustomerId: String,
  courses: [{
    type: {
      type: String,
      enum: ['instrument', 'workshop'],
      required: true,
    },
    instrument: String,
    format: {
      type: String,
      enum: ['individual', 'group'],
      required: true,
    },
    schedule: {
      type: Map,
      of: [String],
      required: true,
    },
    workshop: String,
    concert: {
      type: Boolean,
      default: false,
    },
  }],
}, {
  timestamps: true,
});

// Hash du mot de passe avant la sauvegarde
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User: Model<IUser> = models.User || model<IUser>('User', userSchema); 