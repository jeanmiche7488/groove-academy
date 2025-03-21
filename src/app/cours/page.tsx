'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import CourseModal from '@/components/CourseModal';
import WorkshopModal from '@/components/WorkshopModal';
import ReservationModal from '@/components/ReservationModal';

const courses = [
  {
    id: 'guitare',
    title: 'Guitare',
    description: 'Du rock au metal, maîtrisez les riffs et solos qui font vibrer les foules.',
    image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Nos cours de guitare sont conçus pour vous faire progresser rapidement :

• Techniques de base et avancées
      - Travail des gammes et des modes
      - Techniques de picking et tapping
      - Effets et pédales
      - Son et équipement

• Travail du rythme et du son
      - Précision rythmique
      - Différents types d'accords
      - Création de riffs
      - Techniques de palm muting

    • Répertoire varié
      - Rock classique et moderne
      - Metal et Hard Rock
      - Blues et Jazz
      - Composition personnelle

    • Préparation à la scène
      - Techniques de performance
      - Gestion du stress
      - Interaction avec le groupe
      
    Cours d'essai gratuit pour découvrir notre méthode d'enseignement et rencontrer nos professeurs passionnés.`
  },
  {
    id: 'basse',
    title: 'Basse',
    description: 'Créez les lignes de basse qui font groover le groupe et bouger le public.',
    image: 'https://images.unsplash.com/photo-1619558041249-0523903712e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    longDescription: `Devenez le pilier rythmique de votre groupe avec nos cours de basse :

    • Techniques fondamentales
      - Jeu aux doigts et au médiator
      - Slap et tapping
      - Position et ergonomie
      - Son et amplification

    • Groove et feeling
      - Construction de lignes de basse
      - Patterns rythmiques
      - Walking bass
      - Interaction avec la batterie

    • Théorie appliquée
      - Gammes et arpèges
      - Harmonie fonctionnelle
      - Lecture de grilles
      - Ear training

    • Styles musicaux
      - Rock et Metal
      - Funk et Soul
      - Jazz et Latin
      - Composition originale
      
    Commencez avec un cours d'essai gratuit et découvrez comment nous pouvons vous aider à développer votre style.`
  },
  {
    id: 'piano',
    title: 'Piano',
    description: 'Du classique au rock progressif, explorez toutes les possibilités du clavier.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Découvrez toute la puissance du piano dans le rock et au-delà :

    • Techniques avancées
      - Technique classique et moderne
      - Coordination des mains
      - Utilisation des pédales
      - Vélocité et expressivité

    • Piano dans le rock
      - Accords et voicings
      - Riffs et solos
      - Synthétiseurs et effets
      - Sound design

    • Improvisation
      - Gammes et modes
      - Patterns mélodiques
      - Accompagnement
      - Création de parties

    • Styles et répertoire
      - Rock progressif
      - Piano rock
      - Fusion et contemporain
      - Compositions personnelles
      
    Réservez votre cours d'essai gratuit pour explorer les possibilités infinies du piano rock.`
  },
  {
    id: 'chant',
    title: 'Chant',
    description: 'Développez votre voix et votre présence scénique pour devenir un frontman charismatique.',
    image: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Développez votre voix et votre charisme de chanteur rock :

    • Technique vocale
      - Respiration et soutien
      - Placement de la voix
      - Registres et passages
      - Protection vocale

    • Interprétation
      - Expression et émotion
      - Phrasé et articulation
      - Styles vocaux
      - Personnalisation

    • Performance scénique
      - Présence et charisme
      - Gestion de l'espace
      - Communication avec le public
      - Gestion du stress

    • Styles rock
      - Rock classique et moderne
      - Metal et Hard Rock
      - Blues et Soul
      - Création de mélodies
      
    Découvrez votre vraie voix avec un cours d'essai gratuit et laissez-nous vous guider vers votre plein potentiel.`
  }
];

const workshops = [
  {
    id: 'jam',
    title: 'Jam Sessions',
    description: "Développez votre musicalité en jouant avec d'autres musiciens dans un cadre décontracté.",
    image: 'https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Rejoignez nos Jam Sessions hebdomadaires !

Un espace de liberté musicale où vous pourrez :
• Jouer avec d'autres musiciens
• Développer votre sens de l'improvisation
• Découvrir de nouveaux styles
• Partager votre passion
• Progresser en groupe

Tous les niveaux sont les bienvenus, l'objectif est de prendre du plaisir à jouer ensemble.`
  },
  {
    id: 'impro',
    title: 'Improvisation',
    description: 'Apprenez à créer spontanément et à interagir musicalement en temps réel.',
    image: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Développez l'art de l'improvisation musicale.

Dans cet atelier, vous apprendrez à :
• Maîtriser les gammes et modes
• Comprendre l'harmonie
• Développer votre oreille musicale
• Créer vos propres solos
• Interagir avec d'autres musiciens
• Explorer différents styles d'improvisation

Un voyage passionnant au cœur de la création musicale spontanée.`
  },
  {
    id: 'compo',
    title: 'Composition',
    description: 'Créez vos propres morceaux en groupe et développez votre identité musicale.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Apprenez l'art de la composition musicale.

Cet atelier vous guidera dans :
• L'écriture de mélodies
• La construction harmonique
• L'arrangement musical
• La structure des morceaux
• L'utilisation des technologies d'enregistrement
• Le développement de votre style personnel

De l'idée initiale jusqu'à l'enregistrement final, découvrez toutes les étapes de la création musicale.`
  },
  {
    id: 'concert',
    title: 'Préparation Concerts',
    description: 'Préparez-vous à monter sur scène avec des répétitions en conditions réelles.',
    image: 'https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    longDescription: `Préparez-vous à briller sur scène !

Cet atelier vous permettra de :
• Gérer le trac et le stress
• Travailler votre présence scénique
• Maîtriser la sonorisation
• Interagir avec le public
• Organiser vos répétitions
• Préparer votre setlist

Tout ce dont vous avez besoin pour réussir vos performances live.`
  }
];

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

export default function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedWorkshop, setSelectedWorkshop] = useState<string | null>(null);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [selectedInstrumentForReservation, setSelectedInstrumentForReservation] = useState<string | null>(null);

  const handleReservation = (instrumentId: string) => {
    setSelectedInstrumentForReservation(instrumentId);
    setSelectedCourse(null);
    setSelectedWorkshop(null);
    setIsReservationModalOpen(true);
  };

  const handleWorkshopReservation = (workshopId: string) => {
    setSelectedInstrumentForReservation(null);
    setSelectedCourse(null);
    setSelectedWorkshop(null);
    setIsReservationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-900">
      <main className="py-8 flex flex-col">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">
              Nos Cours
            </h1>
            <div className="flex justify-center items-center gap-8 text-gray-300 mb-8">
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cours d'1h
              </span>
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Tous Niveaux
              </span>
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Cours individuels ou collectifs
              </span>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {courses.map((course) => (
              <motion.div
                key={course.id}
                variants={item}
                className="relative overflow-hidden rounded-2xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={800}
                    height={400}
                    className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                  <p className="text-gray-300 flex-1">{course.description}</p>
                  <button
                    onClick={() => setSelectedCourse(course.id)}
                    className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    En savoir plus
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-24 text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4">Ateliers Collectifs</h2>
            <div className="flex justify-center items-center gap-8 text-gray-300 mb-8">
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Cours 1h30
              </span>
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Tous Niveaux
              </span>
              <span className="flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                En complément d'un cours ou à la carte
              </span>
            </div>
            <p className="text-gray-300 max-w-3xl mx-auto mb-12">
              Vivez l'expérience unique de la musique en groupe. Nos ateliers sont conçus pour vous faire 
              progresser tout en développant votre créativité et votre capacité à jouer avec d'autres musiciens.
            </p>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {workshops.map((workshop) => (
                <motion.div
                  key={workshop.id}
                  variants={item}
                  className="relative overflow-hidden rounded-2xl bg-gray-800/50 hover:bg-gray-800/70 transition-colors duration-300 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={workshop.image}
                      alt={workshop.title}
                      width={800}
                      height={400}
                      className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white mb-2">{workshop.title}</h3>
                    <p className="text-gray-300 flex-1">{workshop.description}</p>
                    <button
                      onClick={() => setSelectedWorkshop(workshop.id)}
                      className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-indigo-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                      En savoir plus
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>

      {selectedCourse && (
        <CourseModal
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
          onReservation={() => handleReservation(selectedCourse)}
          course={courses.find(c => c.id === selectedCourse)!}
        />
      )}

      {selectedWorkshop && (
        <WorkshopModal
          isOpen={true}
          onClose={() => setSelectedWorkshop(null)}
          onReservation={() => handleWorkshopReservation(selectedWorkshop)}
          workshop={workshops.find(w => w.id === selectedWorkshop)!}
        />
      )}

      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        initialInstrument={selectedInstrumentForReservation || undefined}
      />
    </div>
  );
} 