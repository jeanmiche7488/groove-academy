'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const instruments = [
  {
    name: 'Guitare',
    description: 'Apprenez la guitare acoustique ou électrique, du débutant au niveau avancé.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/cours#guitare',
  },
  {
    name: 'Piano',
    description: 'Découvrez le piano classique ou jazz, avec une méthode adaptée à votre niveau.',
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/cours#piano',
  },
  {
    name: 'Basse',
    description: 'Maîtrisez la basse électrique et devenez le pilier de votre groupe.',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/cours#basse',
  },
  {
    name: 'Chant',
    description: 'Développez votre voix et votre confiance en vous avec nos cours de chant.',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    href: '/cours#chant',
  },
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

export default function Instruments() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos instruments</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Découvrez nos cours d'instruments et trouvez celui qui vous correspond le mieux.
          </p>
        </motion.div>
        <motion.div 
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {instruments.map((instrument) => (
            <motion.article 
              key={instrument.name} 
              className="flex flex-col items-start"
              variants={item}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full overflow-hidden rounded-2xl">
                <Image
                  src={instrument.image}
                  alt={instrument.name}
                  className="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2] transform hover:scale-105 transition-transform duration-500"
                  width={2432}
                  height={1442}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white">{instrument.name}</h3>
                </div>
              </div>
              <div className="max-w-xl mt-6">
                <p className="text-base leading-7 text-gray-600">{instrument.description}</p>
                <Link
                  href={instrument.href}
                  className="mt-4 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  En savoir plus <span aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 