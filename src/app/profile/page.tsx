'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  age: number;
  courses: {
    type: 'instrument' | 'workshop';
    instrument?: string;
    format: 'individual' | 'group';
    schedule: { [key: string]: string[] };
    workshop?: string;
    concert: boolean;
  }[];
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (!response.ok) {
          throw new Error('Erreur lors du chargement du profil');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Une erreur est survenue');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              Se déconnecter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Informations personnelles</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Nom complet</label>
                  <p className="text-white">{profile.firstName} {profile.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Email</label>
                  <p className="text-white">{profile.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Téléphone</label>
                  <p className="text-white">{profile.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Adresse</label>
                  <p className="text-white whitespace-pre-line">{profile.address}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Âge</label>
                  <p className="text-white">{profile.age} ans</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Mes Cours</h2>
              {profile.courses.length === 0 ? (
                <p className="text-gray-400">Aucun cours inscrit</p>
              ) : (
                <div className="space-y-4">
                  {profile.courses.map((course, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-medium text-white mb-2">
                        {course.type === 'instrument' ? 'Cours d\'instrument' : 'Atelier'}
                      </h3>
                      <div className="space-y-2">
                        {course.type === 'instrument' && (
                          <p className="text-gray-300">Instrument : {course.instrument}</p>
                        )}
                        {course.type === 'workshop' && (
                          <p className="text-gray-300">Atelier : {course.workshop}</p>
                        )}
                        <p className="text-gray-300">Format : {course.format}</p>
                        <p className="text-gray-300">Concert : {course.concert ? 'Oui' : 'Non'}</p>
                        <div>
                          <p className="text-gray-300 font-medium mb-1">Horaires :</p>
                          <ul className="list-disc list-inside text-gray-300">
                            {Object.entries(course.schedule).map(([day, times]) => (
                              <li key={day}>
                                {day} : {times.join(', ')}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 