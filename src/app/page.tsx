'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ReservationModal from '@/components/ReservationModal';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReservation = () => {
    setIsModalOpen(true);
  };

  return (
    <main>
      <Hero onReservation={handleReservation} />
      <Features />
      <ReservationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Contact Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Contactez-nous
            </h2>
            <p className="text-lg text-white/90 mb-12">
              Une question ? N'hésitez pas à nous contacter !
            </p>
          </div>
          <div className="mx-auto max-w-xl">
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    className="block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:ring-2 focus:ring-white/20 focus:border-transparent"
                    placeholder="Votre message..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:bg-white/90 transition-colors text-center text-lg"
                >
                  Envoyer le message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
