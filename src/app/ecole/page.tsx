import Image from 'next/image';
import Link from 'next/link';

export default function EcolePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80"
            alt="École de musique rock"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-pink-500/90" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Notre École de Musique Rock
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Un lieu unique au cœur de la Haute-Savoie pour vivre votre passion du rock
          </p>
        </div>
      </div>

      {/* Présentation Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Un Lieu Exceptionnel
              </h2>
              <p className="text-gray-300 mb-4">
                Située au cœur de la Haute-Savoie, Groove Academy vous accueille dans un espace de 150m² entièrement dédié à la musique rock. Notre école est un lieu vivant et chaleureux, conçu pour stimuler la créativité et l'apprentissage.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/50 p-3 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-1">4</h3>
                  <p className="text-gray-300 text-sm">Salles de cours</p>
                </div>
                <div className="bg-black/50 p-3 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-1">150m²</h3>
                  <p className="text-gray-300 text-sm">Surface totale</p>
                </div>
              </div>
            </div>
            <div className="relative h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80"
                alt="Intérieur de l'école"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Galerie Section */}
      <div className="py-12 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Découvrez Nos Espaces
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80"
                alt="Salle de cours"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80"
                alt="Studio d'enregistrement"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&q=80"
                alt="Salle de répétition"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative h-[200px]">
              <Image
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80"
                alt="Espace commun"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Équipements Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Des Équipements Haut de Gamme
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Instruments Premium</h3>
              <p className="text-gray-300 text-sm">
                Guitares, basses, batteries et pianos de marques reconnues.
              </p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Studio d'Enregistrement</h3>
              <p className="text-gray-300 text-sm">
                Équipement professionnel pour vos enregistrements.
              </p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <div className="w-10 h-10 bg-indigo-600/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Système Audio</h3>
              <p className="text-gray-300 text-sm">
                Sonorisation professionnelle pour une expérience immersive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ambiance Section */}
      <div className="py-12 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80"
                alt="Ambiance de l'école"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Une Ambiance Unique
              </h2>
              <p className="text-gray-300 mb-4">
                Au cœur de la Haute-Savoie, notre école est un lieu vivant où la passion du rock se partage. Les espaces communs sont conçus pour favoriser les échanges et la créativité.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 p-3 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-1">6/7</h3>
                  <p className="text-gray-300 text-sm">Jours d'ouverture</p>
                </div>
                <div className="bg-black/50 p-3 rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-1">24/7</h3>
                  <p className="text-gray-300 text-sm">Accès répétition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoignez Notre École
          </h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Découvrez notre espace unique et commencez votre voyage musical avec nous
          </p>
          <Link
            href="/cours"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-500 transition-colors"
          >
            Découvrir nos cours
          </Link>
        </div>
      </div>
    </div>
  );
} 