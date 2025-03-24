import Image from 'next/image';

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/about-hero.jpg"
            alt="À propos de Groove Academy"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-pink-500/90" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            À Propos de Groove Academy
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Notre histoire, notre mission et notre vision pour l'avenir de la musique rock
          </p>
        </div>
      </div>

      {/* Histoire Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px]">
              <Image
                src="/images/about-history.jpg"
                alt="Histoire de l'école"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Notre Histoire
              </h2>
              <p className="text-gray-300 mb-6">
                Groove Academy est née d'une passion partagée pour la musique rock et d'une vision : démocratiser l'accès à un enseignement musical de qualité.
              </p>
              <p className="text-gray-300 mb-6">
                Depuis notre création en 2020, nous avons accueilli des centaines d'étudiants, formé des dizaines de musiciens et créé une communauté vibrante de passionnés.
              </p>
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-400 mb-4">Notre Mission</h3>
                <p className="text-gray-300">
                  Offrir une formation musicale accessible, innovante et de qualité, tout en préservant l'esprit authentique du rock.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Équipe Section */}
      <div className="py-16 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Notre Équipe
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/30 p-6 rounded-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/images/team-1.jpg"
                  alt="Directeur"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Jean Dupont</h3>
              <p className="text-indigo-400 mb-2">Directeur</p>
              <p className="text-gray-300">
                Plus de 20 ans d'expérience dans l'enseignement musical
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/images/team-2.jpg"
                  alt="Directeur pédagogique"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Marie Martin</h3>
              <p className="text-indigo-400 mb-2">Directrice Pédagogique</p>
              <p className="text-gray-300">
                Spécialiste en pédagogie musicale innovante
              </p>
            </div>
            <div className="bg-black/30 p-6 rounded-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/images/team-3.jpg"
                  alt="Coordinateur artistique"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Pierre Dubois</h3>
              <p className="text-indigo-400 mb-2">Coordinateur Artistique</p>
              <p className="text-gray-300">
                Musicien professionnel et formateur passionné
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">
                Notre Vision
              </h2>
              <p className="text-gray-300 mb-6">
                Nous croyons en une approche moderne de l'enseignement musical, où tradition et innovation se rencontrent pour créer une expérience d'apprentissage unique.
              </p>
              <p className="text-gray-300 mb-6">
                Notre objectif est de former la prochaine génération de musiciens rock, en leur donnant les outils et la confiance nécessaires pour s'épanouir artistiquement.
              </p>
              <div className="bg-black/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-indigo-400 mb-4">Notre Engagement</h3>
                <p className="text-gray-300">
                  Nous nous engageons à offrir un enseignement de qualité, adapté à chaque étudiant, dans un environnement stimulant et créatif.
                </p>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/images/about-vision.jpg"
                alt="Vision de l'école"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Rejoignez Notre Histoire
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Faites partie de notre communauté et commencez votre voyage musical avec nous
          </p>
          <button
            onClick={() => window.location.href = '/cours'}
            className="bg-indigo-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-500 transition-colors"
          >
            Découvrir nos cours
          </button>
        </div>
      </div>
    </div>
  );
} 