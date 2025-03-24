'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
              Notre Histoire
            </h1>
            <p className="text-xl text-indigo-400">
              Une passion familiale pour la musique
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Marie et Pierre</h2>
                <p className="text-gray-300 mb-4">
                  Frère et sœur passionnés de musique, Marie et Pierre ont grandi dans une famille où la musique était au cœur de tout. 
                  Leur rêve était de créer un lieu où la musique serait accessible à tous, dans un esprit de partage et de convivialité.
                </p>
                <p className="text-gray-300">
                  En 2020, ils ont fondé Groove Academy avec une vision simple : 
                  transmettre leur passion pour la musique dans un environnement chaleureux et bienveillant.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-4">Notre Philosophie</h2>
                <p className="text-gray-300 mb-4">
                  Chez Groove Academy, nous croyons que la musique est avant tout un plaisir à partager. 
                  Notre approche pédagogique est basée sur :
                </p>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Le plaisir d'apprendre</li>
                  <li>La pratique collective</li>
                  <li>L'expression personnelle</li>
                  <li>Le partage d'expérience</li>
                </ul>
              </div>
            </div>

            <div className="relative h-[600px] rounded-lg overflow-hidden border border-gray-700">
              <Image
                src="/images/about/family.jpg"
                alt="Marie et Pierre"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">Passion</h3>
              <p className="text-gray-300">
                Notre amour pour la musique guide chaque aspect de notre enseignement
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">Partage</h3>
              <p className="text-gray-300">
                La musique est une expérience collective qui nous rassemble
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg text-center border border-gray-700">
              <h3 className="text-xl font-bold text-indigo-400 mb-4">Progression</h3>
              <p className="text-gray-300">
                Chaque élève évolue à son rythme dans un environnement bienveillant
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Rejoignez l'Aventure</h2>
            <p className="text-gray-300 mb-8">
              Venez découvrir notre école et partager notre passion pour la musique
            </p>
            <a
              href="/cours"
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-500 transition-colors"
            >
              Découvrir nos cours
            </a>
          </div>
        </div>
      </main>
    </div>
  );
} 