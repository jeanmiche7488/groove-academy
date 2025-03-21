'use client';

import { motion } from 'framer-motion';
import {
  MusicalNoteIcon,
  UserGroupIcon,
  UsersIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Cours personnalisés',
    description: 'Des cours adaptés à votre niveau et à vos objectifs, que vous soyez débutant ou avancé.',
    icon: MusicalNoteIcon,
  },
  {
    name: 'Professeurs expérimentés',
    description: 'Une équipe de professeurs passionnés et qualifiés pour vous guider dans votre apprentissage.',
    icon: UserGroupIcon,
  },
  {
    name: 'Pratique collective',
    description: 'Participez à des ateliers de groupe et des jam sessions pour développer votre musicalité en jouant avec d\'autres musiciens.',
    icon: UsersIcon,
  },
  {
    name: 'Salle de répétition',
    description: 'Accès à notre salle de répétition équipée pour pratiquer entre les cours.',
    icon: MapPinIcon,
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

export default function Features() {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Apprentissage musical</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour progresser
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Chez Groove Academy, nous mettons tout en œuvre pour vous offrir la meilleure expérience d'apprentissage musical.
          </p>
        </motion.div>
        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div 
                key={feature.name} 
                className="flex flex-col"
                variants={item}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
} 