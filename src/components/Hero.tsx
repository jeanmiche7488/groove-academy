'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroProps {
  onReservation: () => void;
}

export default function Hero({ onReservation }: HeroProps) {
  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:flex lg:px-8 lg:py-20">
        <motion.div 
          className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Apprenez la musique avec passion
          </motion.h1>
          <motion.p 
            className="mt-6 text-lg leading-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Découvrez nos cours de musique personnalisés pour tous niveaux. Guitare, piano, basse, chant - 
            trouvez votre instrument et commencez votre voyage musical aujourd'hui.
          </motion.p>
          <motion.div 
            className="mt-8 flex items-center gap-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={onReservation}
              className="rounded-xl bg-white px-5 py-3 text-base font-semibold text-indigo-600 shadow-lg hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              Réserver un cours d'essai
            </button>
            <Link
              href="/cours"
              className="text-base font-semibold leading-6 text-white hover:text-white/80 transition-colors duration-300 hover:scale-105 flex items-center"
            >
              Découvrir nos cours <span aria-hidden="true" className="ml-2 text-2xl">→</span>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div 
          className="mx-auto mt-8 flex max-w-2xl sm:mt-12 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none xl:ml-32"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <Image
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080&q=80"
              alt="Concert rock"
              width={1920}
              height={1080}
              className="aspect-[16/9] w-full max-w-[800px] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10 transform hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
    </div>
  );
} 