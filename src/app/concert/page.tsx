'use client';

import Image from 'next/image';

export default function ConcertPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="relative h-[50vh] w-full mb-12">
            <Image
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
              alt="Concert Groove Academy"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
              <div className="p-8 w-full">
                <h1 className="text-5xl font-bold text-white mb-4">Nos Concerts</h1>
                <p className="text-xl text-indigo-400 max-w-2xl">Vivez l'expérience live de la musique dans une ambiance rock et professionnelle</p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Section Événement */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50">
                <h2 className="text-3xl font-bold text-white mb-6">L'Événement</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Chaque année, nous organisons un grand concert de fin d'année dans des conditions professionnelles. 
                  C'est l'occasion pour tous nos élèves de monter sur scène et de partager leur passion pour la musique.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl text-indigo-400 font-bold mb-4">Scène Professionnelle</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">⚡</span>
                        Éclairage scénique
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🎵</span>
                        Son professionnel
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🎚️</span>
                        Techniciens experts
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl text-indigo-400 font-bold mb-4">Médiatisation</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">📸</span>
                        Photos du concert
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🎥</span>
                        Vidéos HD
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🌐</span>
                        Diffusion sur réseaux sociaux
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Galerie */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
                    alt="Artistes sur scène"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">Artistes sur scène</h3>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
                    alt="Public en concert"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">Public en concert</h3>
                    </div>
                  </div>
                </div>
                <div className="relative h-64 rounded-xl overflow-hidden group">
                  <Image
                    src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80"
                    alt="Ambiance live"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white">Ambiance live</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Participation */}
            <div className="lg:col-span-4">
              <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 sticky top-8">
                <h2 className="text-3xl font-bold text-white mb-6">Comment Participer</h2>
                <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                  Tous nos élèves sont invités à participer, quel que soit leur niveau. 
                  Nous préparons ensemble les morceaux pendant les cours et organisons des répétitions en groupe.
                </p>
                <div className="space-y-6">
                  <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-xl text-indigo-400 font-bold mb-4">Expérience Unique</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🎭</span>
                        Découvrir la scène
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🎸</span>
                        Jouer en groupe
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">💫</span>
                        Partager sa passion
                      </li>
                      <li className="flex items-center">
                        <span className="text-indigo-400 mr-2">🚀</span>
                        Progresser rapidement
                      </li>
                    </ul>
                  </div>
                  <a
                    href="/cours"
                    className="block w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-colors text-center text-lg"
                  >
                    Découvrir nos cours
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 