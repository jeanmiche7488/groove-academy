'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ReservationModal from './ReservationModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCourseTypeModalOpen, setIsCourseTypeModalOpen] = useState(false);
  const [selectedReservationType, setSelectedReservationType] = useState<'inscription' | 'trial' | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReservation = (path: 'inscription' | 'trial') => {
    setSelectedReservationType(path);
    setIsCourseTypeModalOpen(true);
  };

  const handleCourseTypeSelection = (courseType: 'instrument' | 'workshop') => {
    setIsCourseTypeModalOpen(false);
    setIsModalOpen(true);
    localStorage.setItem('reservationType', selectedReservationType || 'inscription');
    localStorage.setItem('courseType', courseType);
    localStorage.setItem('initialStep', courseType === 'workshop' ? 'workshop-choice' : 'instrument-choice');
  };

  const renderCourseTypeModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full p-8 relative">
        <button
          onClick={() => setIsCourseTypeModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {selectedReservationType === 'trial' ? 'Choisissez votre type d\'essai' : 'Choisissez votre type d\'inscription'}
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => handleCourseTypeSelection('instrument')}
            className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
          >
            {selectedReservationType === 'trial' ? 'Cours d\'essai Instruments' : 'Inscription Cours Instruments'}
          </button>
          <button
            onClick={() => handleCourseTypeSelection('workshop')}
            className="w-full p-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {selectedReservationType === 'trial' ? 'Ateliers d\'essai' : 'Inscription Ateliers'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white'
      }`}>
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-indigo-600">
                Groove Academy
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link 
                href="/cours" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/cours' 
                    ? 'text-indigo-600' 
                    : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                Cours et Ateliers
              </Link>
              <Link 
                href="/profs" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/profs' 
                    ? 'text-indigo-600' 
                    : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                Professeurs
              </Link>
              <Link 
                href="/concert" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/concert' 
                    ? 'text-indigo-600' 
                    : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                Concert
              </Link>
              <Link 
                href="/tarifs" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/tarifs' 
                    ? 'text-indigo-600' 
                    : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                Tarifs
              </Link>
              <Link 
                href="/ecole" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/ecole' 
                    ? 'text-indigo-600' 
                    : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                Notre École
              </Link>
              <Link 
                href="/about" 
                className={`text-sm font-medium transition-colors ${
                  pathname === '/about' 
                    ? 'text-indigo-600' 
                    : 'text-gray-900 hover:text-indigo-600'
                }`}
              >
                À propos
              </Link>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleReservation('trial')}
                  className="text-sm font-medium text-white bg-indigo-800 hover:bg-indigo-900 px-4 py-2 rounded-full transition-colors"
                >
                  Réserver un essai
                </button>
                <button
                  onClick={() => handleReservation('inscription')}
                  className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-full transition-colors"
                >
                  S'inscrire
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="text-gray-900 hover:text-indigo-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white"
            >
              <div className="space-y-1 px-2 pb-3 pt-2">
                <Link
                  href="/cours"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === '/cours'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Cours et Ateliers
                </Link>
                <Link
                  href="/profs"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === '/profs'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Professeurs
                </Link>
                <Link
                  href="/concert"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === '/concert'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Concert
                </Link>
                <Link
                  href="/tarifs"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === '/tarifs'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tarifs
                </Link>
                <Link
                  href="/ecole"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === '/ecole'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Notre École
                </Link>
                <Link
                  href="/about"
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    pathname === '/about'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-900 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  À propos
                </Link>
                <button
                  onClick={() => {
                    handleReservation('trial');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-indigo-800 hover:bg-indigo-900 rounded-md transition-colors"
                >
                  Réserver un essai
                </button>
                <button
                  onClick={() => {
                    handleReservation('inscription');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
                >
                  S'inscrire
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="pt-16">
        {children}
      </div>

      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {isCourseTypeModalOpen && renderCourseTypeModal()}
    </div>
  );
} 