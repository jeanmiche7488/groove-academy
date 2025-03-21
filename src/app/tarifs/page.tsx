'use client';

import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function TarifsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
      <main className="py-8 flex flex-col">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              Nos Tarifs
            </h1>
            <div className="flex flex-col items-center space-y-4">
              <div className="inline-flex items-center space-x-2 text-indigo-400 font-medium">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>33 cours par an</span>
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-gray-300 text-sm max-w-2xl">
                <span className="inline-flex items-center bg-gray-800/30 rounded-full px-4 py-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  De septembre à juin
                </span>
                <span className="inline-flex items-center bg-gray-800/30 rounded-full px-4 py-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Paiement mensuel
                </span>
                <span className="inline-flex items-center bg-gray-800/30 rounded-full px-4 py-1">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Fermé pendant les vacances scolaires
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Tarifs Instruments */}
            <motion.div
              variants={item}
              className="bg-gray-800/50 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Cours d'Instruments</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Cours Individuel</h3>
                    <p className="text-sm text-gray-400">1h par semaine</p>
                  </div>
                  <span className="text-xl font-bold text-indigo-400">140€/mois</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Cours Duo/Trio</h3>
                    <p className="text-sm text-gray-400">1h par semaine</p>
                  </div>
                  <span className="text-xl font-bold text-indigo-400">95€/mois</span>
                </div>
              </div>
            </motion.div>

            {/* Tarifs Ateliers */}
            <motion.div
              variants={item}
              className="bg-gray-800/50 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Ateliers Collectifs</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Atelier Seul</h3>
                    <p className="text-sm text-gray-400">1h30 par semaine</p>
                  </div>
                  <span className="text-xl font-bold text-indigo-400">90€/mois</span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-700 pb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">En complément</h3>
                    <p className="text-sm text-gray-400">1h30 par semaine</p>
                  </div>
                  <span className="text-xl font-bold text-indigo-400">50€/mois</span>
                </div>
              </div>
            </motion.div>

            {/* Cotisations et Réductions */}
            <motion.div
              variants={item}
              className="bg-gray-800/50 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Cotisations & Réductions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Cotisations Annuelles</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <p className="text-sm text-gray-300">Cotisation école</p>
                      <span className="text-lg font-semibold text-indigo-400">40€/an</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-700 pb-2">
                      <p className="text-sm text-gray-300">Concert fin d'année <span className="text-indigo-400">(Optionnel)</span></p>
                      <span className="text-lg font-semibold text-indigo-400">45€</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Réduction Famille</h3>
                  <p className="text-sm text-gray-300">
                    -5% pour chaque membre d'une même famille
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
} 