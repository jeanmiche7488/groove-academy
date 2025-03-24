'use client';

import Image from 'next/image';

const profs = [
  {
    nom: 'Luna Laurent',
    instrument: 'Piano',
    description: '🎹 Diplômée du Conservatoire de Paris, Luna enseigne le piano depuis plus de 15 ans. Elle a joué dans plusieurs formations jazz et classiques.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80'
  },
  {
    nom: 'Axel Dubois',
    instrument: 'Guitare',
    description: '🎸 Guitariste professionnel, Axel a tourné avec plusieurs groupes rock et jazz. Il enseigne la guitare électrique et acoustique.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80'
  },
  {
    nom: 'Zoe Martin',
    instrument: 'Batterie',
    description: '🥁 Batteuse de formation jazz, Zoe enseigne la batterie et les percussions. Elle a joué dans de nombreux festivals en France et à l\'étranger.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80'
  },
  {
    nom: 'Kai Bernard',
    instrument: 'Basse',
    description: '🎸 Bassiste professionnel, Kai enseigne la basse électrique et la contrebasse. Il a accompagné de nombreux artistes en studio et sur scène.',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80'
  }
];

export default function ProfsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-2">
              Nos Professeurs
            </h1>
            <p className="text-lg text-indigo-400">
              Une équipe de musiciens passionnés et expérimentés
            </p>
          </div>

          {/* Grid des Profs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {profs.map((prof, index) => (
              <div key={index} className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-indigo-500/50 transition-all duration-300">
                <div className="relative h-40">
                  <Image
                    src={prof.image}
                    alt={prof.nom}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold text-white">{prof.nom}</h2>
                    <span className="px-2 py-0.5 bg-indigo-600/20 text-indigo-400 rounded-full text-xs font-semibold uppercase tracking-wider">
                      {prof.instrument}
                    </span>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{prof.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Prêt à commencer votre voyage musical ?</h2>
            <p className="text-gray-300 mb-4">
              Réservez votre cours d'essai avec l'un de nos professeurs
            </p>
            <a
              href="/cours"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-500 transition-colors text-sm uppercase tracking-wider"
            >
              Réserver un cours
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 