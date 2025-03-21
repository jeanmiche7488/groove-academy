import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: "Token de vérification manquant" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token de vérification invalide ou expiré" },
        { status: 400 }
      );
    }

    // Mise à jour de l'utilisateur
    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email vérifié avec succès"
    });
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la vérification" },
      { status: 500 }
    );
  }
} 