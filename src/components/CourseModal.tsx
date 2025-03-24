'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription: string;
}

interface CourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservation: () => void;
  course: Course;
}

export default function CourseModal({ isOpen, onClose, onReservation, course }: CourseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-b from-gray-900 to-indigo-900 rounded-2xl p-6 max-w-4xl w-full relative flex flex-col h-[90vh] border border-indigo-500/30 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-40 mb-6 rounded-lg overflow-hidden border-2 border-indigo-500/30">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <h2 className="absolute bottom-3 left-3 text-3xl font-bold text-white">
            Cours de {course.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto pr-2">
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">Techniques de base et avancées</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Travail des gammes et des modes
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Techniques de picking et tapping
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Effets et pédales
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Son et équipement
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">Travail du rythme et du son</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Précision rythmique
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Différents types d'accords
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Création de riffs
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Techniques de palm muting
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">Répertoire varié</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Rock classique et moderne
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Metal et Hard Rock
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Blues et Jazz
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Composition personnelle
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4 border border-indigo-500/20">
              <h3 className="text-xl font-semibold text-white mb-3">Préparation à la scène</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Techniques de performance
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Gestion du stress
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                  Interaction avec le groupe
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-indigo-500/30">
          <div className="flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-base font-semibold text-indigo-400 bg-indigo-900/50 rounded-lg hover:bg-indigo-900/70 transition-colors duration-300 border border-indigo-500/30"
            >
              Fermer
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 