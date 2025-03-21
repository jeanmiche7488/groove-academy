import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: "Déconnexion réussie" });
  
  // Suppression du cookie de session
  response.cookies.set('session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return response;
} 