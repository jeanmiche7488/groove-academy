'use client';

import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ReservationModal from '@/components/ReservationModal';
import Link from 'next/link';
import { useState } from 'react';

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
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href="/cours"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Découvrir nos cours
        </Link>
      </div>
    </main>
  );
}
