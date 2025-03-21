'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Workshop {
  id: string;
  title: string;
  description: string;
  image: string;
  longDescription: string;
}

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReservation: () => void;
  workshop: Workshop;
}

export default function WorkshopModal({ isOpen, onClose, onReservation, workshop }: WorkshopModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-2xl w-full relative flex flex-col h-[80vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
          <Image
            src={workshop.image}
            alt={workshop.title}
            fill
            className="object-cover"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">{workshop.title}</h2>
        
        <div className="text-gray-600 whitespace-pre-line overflow-y-auto text-sm flex-1">
          {workshop.longDescription}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={onReservation}
            className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors duration-300"
          >
            Réserver un atelier
          </button>
        </div>
      </motion.div>
    </div>
  );
} 