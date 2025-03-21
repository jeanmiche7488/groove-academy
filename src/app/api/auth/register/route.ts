import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';
import crypto from 'crypto';
import { sendVerificationEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { email, password, firstName, lastName, phone, address, age } = body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Un compte avec cet email existe déjà" },
        { status: 400 }
      );
    }

    // Génération du token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 heures

    // Création de l'utilisateur
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      age: parseInt(age),
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
    });

    // Envoi de l'email de vérification
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({
      message: "Inscription réussie. Veuillez vérifier votre email.",
      userId: user._id,
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'inscription" },
      { status: 500 }
    );
  }
} 