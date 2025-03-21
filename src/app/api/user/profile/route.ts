import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { User } from '@/models/User';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Récupération de l'ID utilisateur depuis les headers
    const userId = request.headers.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      );
    }

    // Recherche de l'utilisateur
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la récupération du profil" },
      { status: 500 }
    );
  }
} 