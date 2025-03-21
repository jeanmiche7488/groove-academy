'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reservationId = searchParams.get('reservation_id');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-indigo-600 blur-3xl opacity-20"></div>
            <div className="relative">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Rock On ! 🎸
              </h1>
              <p className="text-xl md:text-2xl text-gray-300">
                Votre réservation est enregistrée !
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-indigo-500/20 mb-8">
            <div className="text-3xl mb-4">🎸</div>
            <p className="text-lg text-gray-300 mb-6">
              Nous avons bien reçu votre demande de réservation. Notre équipe va l'examiner et vous recontactera dans les plus brefs délais pour confirmer les détails.
            </p>
            <div className="text-sm text-indigo-400 mb-4">
              Référence : {reservationId}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400">
              En attendant, préparez-vous à faire vibrer les murs de notre école !
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 