'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Step = 
  | 'initial'
  | 'course-type'
  | 'instrument-choice'
  | 'level-choice'
  | 'format-choice'
  | 'schedule'
  | 'workshop-choice'
  | 'concert'
  | 'summary'
  | 'personal-info'
  | 'confirmation'
  | 'workshop-selection';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInstrument?: string;
}

const levelConfigs = {
  guitare: {
    min: "Débutant",
    max: "Django Reinhardt",
    steps: ["Intermédiaire"]
  },
  piano: {
    min: "Débutant",
    max: "Chopin",
    steps: ["Intermédiaire"]
  },
  batterie: {
    min: "Débutant",
    max: "John Bonham",
    steps: ["Intermédiaire"]
  },
  basse: {
    min: "Débutant",
    max: "Marcus Miller",
    steps: ["Intermédiaire"]
  },
  chant: {
    min: "Mon Prof de Maths sous la douche",
    max: "Céline Dion aux JO",
    steps: ["Intermédiaire"]
  }
};

const timeSlots = {
  individual: {
    start: 10,
    end: 17,
  },
  group: {
    start: 17,
    end: 21,
  }
};

const days = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];

const stepLabels: { [key in Step]: string } = {
  'initial': 'Accueil',
  'course-type': 'Type de cours',
  'instrument-choice': 'Instrument',
  'level-choice': 'Niveau',
  'format-choice': 'Format',
  'schedule': 'Disponibilités',
  'workshop-choice': 'Atelier complémentaire',
  'concert': 'Concert',
  'summary': 'Récapitulatif',
  'personal-info': 'Informations personnelles',
  'confirmation': 'Confirmation',
  'workshop-selection': 'Sélection de l\'atelier'
};

const getSteps = (selectedPath: 'inscription' | 'trial' | null, selectedCourseType: 'instrument' | 'workshop' | null): Step[] => {
  if (selectedCourseType === 'workshop') {
    // Pour les ateliers
    const baseSteps: Step[] = ['instrument-choice', 'workshop-choice', 'level-choice', 'schedule'];
    
    if (selectedPath === 'inscription') {
      // Pour l'inscription à un atelier
      return [...baseSteps, 'concert', 'summary', 'personal-info', 'confirmation'];
    } else {
      // Pour un atelier d'essai
      return [...baseSteps, 'summary', 'personal-info', 'confirmation'];
    }
  } else {
    // Pour les cours d'instrument
    const baseSteps: Step[] = ['instrument-choice', 'level-choice', 'schedule'];
    
    if (selectedPath === 'inscription') {
      // Pour l'inscription à un cours
      return [...baseSteps, 'workshop-choice', 'concert', 'summary', 'personal-info', 'confirmation'];
    } else {
      // Pour un cours d'essai
      return [...baseSteps, 'summary', 'personal-info', 'confirmation'];
    }
  }
};

interface PersonalInfo {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phone: string;
  address: string;
  familyMemberFirstName?: string;
  familyMemberLastName?: string;
}

type WorkshopTimeSlot = {
  days: string[];
  time: string;
};

type WorkshopId = 'jam' | 'compo' | 'concert' | 'impro';

const workshopTimeConfig = {
  jam: {
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    time: '19:00'
  },
  compo: {
    days: ['Lundi', 'Vendredi'],
    time: '17:00'
  },
  concert: {
    days: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],
    time: '20:00'
  },
  impro: {
    days: ['Lundi', 'Vendredi'],
    time: '18:00'
  }
} as const;

interface Workshop {
  id: WorkshopId;
  name: string;
  description: string;
  price: number;
}

const workshops: Workshop[] = [
  {
    id: 'jam',
    name: 'Jam Session',
    description: 'Improvisation collective et partage musical',
    price: 90
  },
  {
    id: 'compo',
    name: 'Composition',
    description: 'Création de vos propres morceaux',
    price: 90
  },
  {
    id: 'concert',
    name: 'Préparation aux concerts',
    description: 'Préparation aux concerts et aux spectacles',
    price: 90
  },
  {
    id: 'impro',
    name: 'Improvisation',
    description: 'Développement de votre créativité musicale',
    price: 90
  }
];

interface TotalAmount {
  monthly: number;
  annual: number;
  total: number;
  reduction: number;
}

export default function ReservationModal({ isOpen, onClose, initialInstrument }: ReservationModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>('initial');
  const [selectedPath, setSelectedPath] = useState<'inscription' | 'trial' | null>(null);
  const [selectedCourseType, setSelectedCourseType] = useState<'instrument' | 'workshop' | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(initialInstrument || null);
  const [level, setLevel] = useState<number>(0);
  const [courseFormat, setCourseFormat] = useState<'individual' | 'group' | null>(null);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<{[key: string]: string[]}>({});
  const [wantsConcert, setWantsConcert] = useState<boolean>(false);
  const [wantsWorkshop, setWantsWorkshop] = useState<boolean>(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<WorkshopId | null>(null);
  const [editingStep, setEditingStep] = useState<Step | null>(null);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    address: ''
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [wantsAccount, setWantsAccount] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [workshopDays, setWorkshopDays] = useState<string[]>([]);
  const [workshopTimeSlots, setWorkshopTimeSlots] = useState<{[key: string]: string[]}>({});
  const [hasFamilyMember, setHasFamilyMember] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      resetForm();
      // Récupérer le type de réservation et l'étape initiale depuis le localStorage
      const reservationType = localStorage.getItem('reservationType') as 'inscription' | 'trial';
      const courseType = localStorage.getItem('courseType') as 'instrument' | 'workshop';
      const initialStep = localStorage.getItem('initialStep') as Step;

      if (reservationType) {
        setSelectedPath(reservationType);
        if (courseType) {
          setSelectedCourseType(courseType);
          // Si c'est un atelier, on démarre directement au choix de l'instrument
          if (courseType === 'workshop') {
            setCurrentStep('instrument-choice');
          } else if (initialStep) {
            setCurrentStep(initialStep);
          } else {
            setCurrentStep('instrument-choice');
          }
        }
      }
    }
  }, [isOpen]);

  const resetForm = () => {
    setCurrentStep('initial');
    setSelectedPath(null);
    setSelectedCourseType(null);
    setSelectedInstrument(initialInstrument || null);
    setLevel(0);
    setCourseFormat(null);
    setSelectedDays([]);
    setSelectedTimeSlots({});
    setWantsConcert(false);
    setWantsWorkshop(false);
    setSelectedWorkshop(null);
    setEditingStep(null);
    setPersonalInfo({
      firstName: '',
      lastName: '',
      age: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  const goBack = () => {
    switch (currentStep) {
      case 'instrument-choice':
        setCurrentStep('initial');
        break;
      case 'level-choice':
        setCurrentStep('instrument-choice');
        break;
      case 'format-choice':
        setCurrentStep('level-choice');
        break;
      case 'schedule':
        setCurrentStep('format-choice');
        break;
      case 'workshop-choice':
        setCurrentStep('schedule');
        break;
      case 'workshop-selection':
        setCurrentStep('workshop-choice');
        break;
      case 'concert':
        if (wantsWorkshop) {
          setCurrentStep('schedule');
        } else {
          setCurrentStep('workshop-choice');
        }
        break;
      case 'summary':
        setCurrentStep('concert');
        break;
      case 'personal-info':
        setCurrentStep('summary');
        break;
      case 'confirmation':
        setCurrentStep('personal-info');
        break;
    }
  };

  if (!isOpen) return null;

  const instruments = [
    { id: 'guitare', name: 'Guitare' },
    { id: 'basse', name: 'Basse' },
    { id: 'piano', name: 'Piano' },
    { id: 'chant', name: 'Chant' }
  ];

  const renderInitialChoice = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Que souhaitez-vous faire ?</h2>
      <button
        onClick={() => {
          setSelectedPath('inscription');
          setCurrentStep('course-type');
        }}
        className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors mb-4"
      >
        Inscription à l'école
      </button>
      <button
        onClick={() => {
          setSelectedPath('trial');
          setCurrentStep('course-type');
        }}
        className="w-full p-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Réserver un cours d'essai
      </button>
    </div>
  );

  const renderCourseType = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Choisissez votre type de cours</h2>
      <button
        onClick={() => {
          setSelectedCourseType('instrument');
          setCurrentStep('instrument-choice');
        }}
        className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors mb-4"
      >
        Cours Instrument
      </button>
      <button
        onClick={() => {
          setSelectedCourseType('workshop');
          setCurrentStep('instrument-choice');
        }}
        className="w-full p-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors"
      >
        Atelier de groupe
      </button>
    </div>
  );

  const renderInstrumentChoice = () => (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white mb-6">Choisissez votre instrument</h2>
      <div className="grid grid-cols-2 gap-4">
        {instruments.map((instrument) => (
          <button
            key={instrument.id}
            onClick={() => {
              setSelectedInstrument(instrument.id);
              setCurrentStep('level-choice');
            }}
            className="p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            {instrument.name}
          </button>
        ))}
      </div>
      {selectedCourseType === 'workshop' && (
        <div className="mt-6">
          <label className="flex items-center space-x-2 text-white">
            <input
              type="checkbox"
              checked={wantsWorkshop}
              onChange={(e) => setWantsWorkshop(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300"
            />
            <span>Je prends déjà un cours d'instrument dans l'école</span>
          </label>
        </div>
      )}
    </div>
  );

  const renderLevelChoice = () => {
    if (!selectedInstrument) return null;
    const config = levelConfigs[selectedInstrument as keyof typeof levelConfigs];
    const allLevels = [config.min, ...config.steps, config.max];

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Quel est votre niveau ?</h2>
        <div className="space-y-8">
          <input
            type="range"
            min="0"
            max="2"
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-400">
            {allLevels.map((levelLabel, index) => (
              <span
                key={index}
                className={`text-center ${level === index ? 'text-white font-semibold' : ''}`}
                style={{ width: '33%' }}
              >
                {levelLabel}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={() => {
            if (selectedCourseType === 'workshop') {
              setCurrentStep('workshop-selection');
            } else {
              setCurrentStep('format-choice');
            }
          }}
          className="w-full mt-8 p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Continuer
        </button>
      </div>
    );
  };

  const renderFormatChoice = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Choisissez votre format de cours</h2>
      <div className="space-y-4">
        <div className="p-4 bg-gray-700 rounded-lg">
          <button
            onClick={() => {
              setCourseFormat('individual');
              setCurrentStep('schedule');
            }}
            className="w-full text-left"
          >
            <h3 className="text-lg font-semibold text-white">Cours Individuel</h3>
            <p className="text-gray-400">Disponible de 10h à 17h</p>
          </button>
        </div>
        <div className="p-4 bg-gray-700 rounded-lg">
          <button
            onClick={() => {
              setCourseFormat('group');
              setCurrentStep('schedule');
            }}
            className="w-full text-left"
          >
            <h3 className="text-lg font-semibold text-white">Cours Duo/Trio</h3>
            <p className="text-gray-400">Disponible de 17h à 21h</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => {
    const isWorkshopSchedule = selectedCourseType === 'workshop' || (selectedCourseType === 'instrument' && wantsWorkshop && selectedWorkshop);

    if (isWorkshopSchedule && selectedWorkshop) {
      const workshopConfig = workshopTimeConfig[selectedWorkshop];
      const workshop = workshops.find(w => w.id === selectedWorkshop);
      
      if (!workshopConfig) return null;
      
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            Disponibilités de l'atelier
          </h2>
          
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              {workshop?.name}
            </h3>
            <div className="space-y-2">
              <p className="text-gray-300">Horaire : {workshopConfig.time}</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-gray-400">Sélectionnez les jours qui vous conviennent</p>
            <div className="grid grid-cols-3 gap-2">
              {workshopConfig.days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    if (selectedDays.includes(day)) {
                      setSelectedDays(selectedDays.filter(d => d !== day));
                    } else {
                      setSelectedDays([...selectedDays, day]);
                    }
                  }}
                  className={`p-2 rounded-lg text-sm transition-colors ${
                    selectedDays.includes(day)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={goBack}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
              Retour
            </button>
            <button
              onClick={() => {
                if (selectedPath === 'inscription' && selectedCourseType === 'workshop') {
                  setCurrentStep('concert');
                } else {
                  setCurrentStep('summary');
                }
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
              disabled={selectedDays.length === 0}
            >
              Continuer
            </button>
          </div>
        </div>
      );
    }

    const format = courseFormat as 'individual' | 'group';
    const { start, end } = timeSlots[format];
    const timeOptions: string[] = [];
    
    for (let hour = start; hour < end; hour++) {
      timeOptions.push(`${hour}:00`);
    }

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Choisissez vos disponibilités
        </h2>
        
        {/* Sélection des jours */}
        <div className="space-y-4">
          <p className="text-gray-400">Sélectionnez les jours qui vous conviennent</p>
          <div className="grid grid-cols-3 gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => {
                  const currentDays = isWorkshopSchedule ? workshopDays : selectedDays;
                  const setDays = isWorkshopSchedule ? setWorkshopDays : setSelectedDays;
                  const currentTimeSlots = isWorkshopSchedule ? workshopTimeSlots : selectedTimeSlots;
                  const setTimeSlots = isWorkshopSchedule ? setWorkshopTimeSlots : setSelectedTimeSlots;

                  if (currentDays.includes(day)) {
                    setDays(currentDays.filter(d => d !== day));
                    const newTimeSlots = { ...currentTimeSlots };
                    delete newTimeSlots[day];
                    setTimeSlots(newTimeSlots);
                  } else {
                    setDays([...currentDays, day]);
                  }
                }}
                className={`p-2 rounded-lg text-sm transition-colors ${
                  (isWorkshopSchedule ? workshopDays : selectedDays).includes(day)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Sélection des horaires pour les jours choisis */}
        {(isWorkshopSchedule ? workshopDays : selectedDays).length > 0 && (
          <div className="space-y-4">
            <p className="text-gray-400">Choisissez les horaires pour chaque jour</p>
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {(isWorkshopSchedule ? workshopDays : selectedDays).map((day) => (
                <div key={day} className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-white mb-3">{day}</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {timeOptions.map((time) => (
                      <button
                        key={`${day}-${time}`}
                        onClick={() => {
                          const currentTimeSlots = isWorkshopSchedule ? workshopTimeSlots : selectedTimeSlots;
                          const setTimeSlots = isWorkshopSchedule ? setWorkshopTimeSlots : setSelectedTimeSlots;
                          const currentTimesForDay = currentTimeSlots[day] || [];
                          const newTimesForDay = currentTimesForDay.includes(time)
                            ? currentTimesForDay.filter(t => t !== time)
                            : [...currentTimesForDay, time];
                          setTimeSlots({
                            ...currentTimeSlots,
                            [day]: newTimesForDay
                          });
                        }}
                        className={`p-2 rounded-lg text-sm transition-colors ${
                          (isWorkshopSchedule ? workshopTimeSlots : selectedTimeSlots)[day]?.includes(time)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Retour
          </button>
          <button
            onClick={() => {
              if (selectedPath === 'trial') {
                setCurrentStep('summary');
              } else if (selectedCourseType === 'workshop') {
                setCurrentStep('summary');
              } else {
                setCurrentStep('workshop-choice');
              }
            }}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
            disabled={Object.keys(isWorkshopSchedule ? workshopTimeSlots : selectedTimeSlots).length === 0}
          >
            Continuer
          </button>
        </div>
      </div>
    );
  };

  const renderWorkshopChoice = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Souhaitez-vous participer à un atelier ?</h2>
      <div className="space-y-4">
        <button
          onClick={() => {
            setWantsWorkshop(true);
            setCurrentStep('workshop-selection');
          }}
          className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
        >
          Oui, je souhaite participer à un atelier
        </button>
        <button
          onClick={() => {
            setWantsWorkshop(false);
            setSelectedWorkshop(null);
            setCurrentStep('concert');
          }}
          className="w-full p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Non, uniquement le cours d'instrument
        </button>
      </div>
    </div>
  );

  const renderWorkshopSelection = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">
          Choisissez votre atelier
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workshops.map((workshop) => (
            <div
              key={workshop.id}
              onClick={() => {
                setSelectedWorkshop(workshop.id);
                // Pour les ateliers, on passe directement aux disponibilités
                setCurrentStep('schedule');
              }}
              className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{workshop.name}</h3>
              <p className="text-gray-300 mb-4">{workshop.description}</p>
              <p className="text-indigo-400 font-semibold">{workshop.price}€/mois</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Retour
          </button>
        </div>
      </div>
    );
  };

  const renderConcertChoice = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Souhaitez-vous participer au concert de fin d'année ?</h2>
      <div className="relative h-48 mb-8 rounded-lg overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7"
          alt="Concert"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-lg">Une occasion unique de montrer votre talent sur scène !</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setWantsConcert(false);
            setCurrentStep('summary');
          }}
          className="p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all duration-300 group"
        >
          <div className="text-xl font-semibold text-white mb-2">Non merci</div>
          <p className="text-gray-400 text-sm">Je préfère me concentrer sur les cours</p>
        </button>
        <button
          onClick={() => {
            setWantsConcert(true);
            setCurrentStep('summary');
          }}
          className="p-6 bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-all duration-300 group"
        >
          <div className="text-xl font-semibold text-white mb-2">Oui, je participe !</div>
          <p className="text-indigo-200 text-sm">Je veux vivre l'expérience de la scène</p>
        </button>
      </div>
    </div>
  );

  const renderSummary = () => {
    const courseTypeLabel = selectedCourseType === 'instrument' ? "Cours d'instrument" : "Atelier collectif";
    const formatLabel = courseFormat === 'individual' ? 'Individuel' : 'Duo/Trio';
    const selectedWorkshopName = workshops.find(w => w.id === selectedWorkshop)?.name;
    const totalAmount = calculateTotalAmount();

    const EditButton = ({ step }: { step: Step }) => (
      <button
        onClick={() => {
          setEditingStep(step);
          setCurrentStep(step);
        }}
        className="text-indigo-400 hover:text-indigo-300 text-sm absolute top-2 right-2"
      >
        Modifier
      </button>
    );

    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white mb-4">Récapitulatif</h2>
        
        {selectedPath === 'trial' && (
          <div className="bg-indigo-900/50 rounded-lg p-4 border border-indigo-500/30 mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              {selectedCourseType === 'workshop' ? 'Atelier d\'essai' : 'Cours d\'essai'}
            </h3>
            <p className="text-indigo-200 text-sm">
              {selectedCourseType === 'workshop' 
                ? 'Ce cours d\'essai vous permettra de découvrir l\'atelier et de voir si le format vous convient.'
                : 'Ce cours d\'essai vous permettra de découvrir l\'école et de voir si l\'instrument vous convient.'}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-800 rounded-lg p-3 relative">
            <h3 className="text-sm font-medium text-gray-400">Type</h3>
            <p className="text-white">{courseTypeLabel}</p>
            <EditButton step="course-type" />
          </div>

          {selectedCourseType === 'instrument' && (
            <>
              <div className="bg-gray-800 rounded-lg p-3 relative">
                <h3 className="text-sm font-medium text-gray-400">Instrument</h3>
                <p className="text-white">{selectedInstrument}</p>
                <EditButton step="instrument-choice" />
              </div>

              <div className="bg-gray-800 rounded-lg p-3 relative">
                <h3 className="text-sm font-medium text-gray-400">Format</h3>
                <p className="text-white">{formatLabel}</p>
                <EditButton step="format-choice" />
              </div>
            </>
          )}

          {selectedCourseType === 'workshop' && (
            <div className="bg-gray-800 rounded-lg p-3 relative">
              <h3 className="text-sm font-medium text-gray-400">Atelier</h3>
              <p className="text-white">{selectedWorkshopName}</p>
              <EditButton step="workshop-selection" />
            </div>
          )}

          <div className="bg-gray-800 rounded-lg p-3 col-span-2 relative">
            <h3 className="text-sm font-medium text-gray-400">Disponibilités</h3>
            <div className="text-white text-sm">
              {selectedCourseType === 'workshop' ? (
                selectedDays.map(day => (
                  <div key={day}>
                    {day}: {workshopTimeConfig[selectedWorkshop as WorkshopId].time}
                  </div>
                ))
              ) : (
                selectedDays.map(day => (
                  <div key={day}>
                    {day}: {selectedTimeSlots[day]?.join(', ')}
                  </div>
                ))
              )}
            </div>
            <EditButton step="schedule" />
          </div>

          {selectedPath === 'inscription' && selectedCourseType === 'workshop' && (
            <div className="bg-gray-800 rounded-lg p-3 col-span-2 relative">
              <h3 className="text-sm font-medium text-gray-400">Concert</h3>
              <p className="text-white">{wantsConcert ? 'Oui' : 'Non'}</p>
              <EditButton step="concert" />
            </div>
          )}

          <div className="bg-indigo-900/50 rounded-lg p-3 col-span-2 border border-indigo-500/30">
            <div className="flex justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Total</h3>
                <div className="space-y-1 mt-1">
                  {selectedPath === 'trial' ? (
                    <p className="text-lg font-semibold text-white">
                      {selectedCourseType === 'instrument' ? '35€' : '25€'}
                    </p>
                  ) : (
                    <>
                      <h3 className="text-sm font-medium text-gray-400">Total mensuel</h3>
                      <div className="space-y-1 mt-1">
                        {selectedCourseType === 'instrument' ? (
                          <>
                            <p className="text-gray-300 text-sm">
                              Cours {formatLabel}: {courseFormat === 'individual' ? '140€' : '95€'}
                            </p>
                            {wantsWorkshop && (
                              <p className="text-gray-300 text-sm">
                                Atelier complémentaire: +50€
                              </p>
                            )}
                            <p className="text-lg font-semibold text-white mt-2">
                              Total: {(courseFormat === 'individual' ? 140 : 95) + (wantsWorkshop ? 50 : 0)}€/mois
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="text-gray-300 text-sm">
                              {wantsWorkshop 
                                ? "Atelier en complément d'un cours: 50€"
                                : "Atelier seul: 90€"}
                            </p>
                            <p className="text-lg font-semibold text-white mt-2">
                              Total: {wantsWorkshop ? '50€' : '90€'}/mois
                            </p>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {selectedPath === 'inscription' && (
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-400">Frais annuels</h3>
                  <div className="space-y-1 mt-1">
                    <p className="text-gray-300 text-sm">
                      Cotisation école: 40€
                    </p>
                    {selectedCourseType === 'workshop' && wantsConcert && (
                      <p className="text-gray-300 text-sm">
                        Participation au concert: 45€
                      </p>
                    )}
                    <p className="text-lg font-semibold text-white mt-2">
                      Total: {40 + (selectedCourseType === 'workshop' && wantsConcert ? 45 : 0)}€
                    </p>
                  </div>
                </div>
              )}
            </div>

            {selectedPath === 'inscription' && (
              <div className="mt-4 pt-4 border-t border-indigo-500/30">
                <label className="flex items-center space-x-2 text-white">
                  <input
                    type="checkbox"
                    checked={hasFamilyMember}
                    onChange={(e) => setHasFamilyMember(e.target.checked)}
                    className="form-checkbox h-5 w-5 text-indigo-600 rounded border-gray-300"
                  />
                  <span>Un membre de ma famille est déjà inscrit à l'école</span>
                </label>
                {hasFamilyMember && (
                  <div className="mt-2 text-green-400">
                    <p className="text-sm">Réduction familiale de 5% appliquée</p>
                    <p className="text-sm">Montant de la réduction : {totalAmount.reduction.toFixed(2)}€</p>
                    <p className="text-lg font-semibold mt-1">
                      Total après réduction : {totalAmount.total.toFixed(2)}€
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setCurrentStep('personal-info')}
          className="w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors mt-4"
        >
          Continuer
        </button>
      </div>
    );
  };

  const calculateTotalAmount = (): TotalAmount => {
    let monthlyTotal = 0;
    let annualTotal = 0;

    if (selectedPath === 'trial') {
      // Pour les cours d'essai
      if (selectedCourseType === 'instrument') {
        monthlyTotal = 35;
      } else {
        monthlyTotal = 25; // Pour les ateliers d'essai
      }
      return {
        monthly: monthlyTotal,
        annual: 0,
        total: monthlyTotal,
        reduction: 0
      };
    }

    // Pour les inscriptions régulières
    if (selectedCourseType === 'instrument') {
      monthlyTotal += courseFormat === 'individual' ? 140 : 95;
      if (wantsWorkshop) monthlyTotal += 50;
    } else {
      // Pour les ateliers
      if (wantsWorkshop) {
        // Si l'élève prend déjà un cours
        monthlyTotal = 50;
      } else {
        // Si l'élève ne prend que l'atelier
        monthlyTotal = 90;
      }
    }

    if (selectedPath === 'inscription') {
      annualTotal += 40; // Cotisation école
      if (wantsConcert) annualTotal += 45;
    }

    // Calcul de la réduction familiale
    const totalBeforeReduction = monthlyTotal + annualTotal;
    const reduction = hasFamilyMember ? totalBeforeReduction * 0.05 : 0;
    const totalAfterReduction = totalBeforeReduction - reduction;

    return {
      monthly: monthlyTotal,
      annual: annualTotal,
      total: totalAfterReduction,
      reduction
    };
  };

  const initializePayment = async () => {
    try {
      console.log('Initialisation du paiement...');
      console.log('Clé publique Stripe:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      
      const paymentData = {
        ...calculateTotalAmount(),
        personalInfo,
        courseDetails: {
          type: selectedCourseType,
          instrument: selectedInstrument,
          format: courseFormat,
          workshop: selectedWorkshop,
          schedule: selectedTimeSlots,
          concert: wantsConcert
        }
      };
      
      console.log('Données de paiement:', paymentData);

      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': document.cookie.split('csrf-token=')[1]?.split(';')[0] || '',
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Réponse API:', data);

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.clientSecret) {
        throw new Error('Pas de clientSecret reçu');
      }

      console.log('ClientSecret reçu, passage à l\'étape payment');
      setClientSecret(data.clientSecret);
      setCurrentStep('confirmation');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation:', error);
      setPaymentError(error instanceof Error ? error.message : "Une erreur est survenue lors de l'initialisation du paiement.");
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length < 8) {
      setPasswordError('Le mot de passe doit contenir au moins 8 caractères');
    } else {
      setPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    if (value !== password) {
      setPasswordError('Les mots de passe ne correspondent pas');
    } else {
      setPasswordError(null);
    }
  };

  const isFormValid = () => {
    const baseValidation = (
      personalInfo.firstName.trim() !== '' &&
      personalInfo.lastName.trim() !== '' &&
      personalInfo.age.trim() !== '' &&
      personalInfo.email.trim() !== '' &&
      personalInfo.phone.trim() !== '' &&
      personalInfo.address.trim() !== ''
    );

    if (hasFamilyMember) {
      return baseValidation && 
        personalInfo.familyMemberFirstName?.trim() !== '' &&
        personalInfo.familyMemberLastName?.trim() !== '';
    }

    return baseValidation;
  };

  const renderPersonalInfo = () => {
    const inputStyle = "w-full bg-gray-800 text-white rounded-lg p-3 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none";
    const labelStyle = "block text-sm font-medium text-gray-400 mb-1";

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white mb-6">Informations personnelles</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelStyle}>Prénom</label>
            <input
              type="text"
              id="firstName"
              value={personalInfo.firstName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
              className={inputStyle}
              placeholder="Jean"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className={labelStyle}>Nom</label>
            <input
              type="text"
              id="lastName"
              value={personalInfo.lastName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
              className={inputStyle}
              placeholder="Dupont"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className={labelStyle}>Âge</label>
            <input
              type="number"
              id="age"
              value={personalInfo.age}
              onChange={(e) => setPersonalInfo({ ...personalInfo, age: e.target.value })}
              className={inputStyle}
              placeholder="25"
              min="1"
              max="120"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelStyle}>Téléphone</label>
            <input
              type="tel"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              className={inputStyle}
              placeholder="06 12 34 56 78"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="email" className={labelStyle}>Email</label>
            <input
              type="email"
              id="email"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              className={inputStyle}
              placeholder="jean.dupont@email.com"
              required
            />
          </div>

          <div className="col-span-2">
            <label htmlFor="address" className={labelStyle}>Adresse</label>
            <textarea
              id="address"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              className={`${inputStyle} resize-none h-24`}
              placeholder="123 rue de la Musique&#10;75000 Paris"
              required
            />
          </div>

          {hasFamilyMember && (
            <>
              <div className="col-span-2 mt-4 pt-4 border-t border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">Informations du membre de la famille déjà inscrit</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="familyMemberFirstName" className={labelStyle}>Prénom</label>
                    <input
                      type="text"
                      id="familyMemberFirstName"
                      value={personalInfo.familyMemberFirstName || ''}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, familyMemberFirstName: e.target.value })}
                      className={inputStyle}
                      placeholder="Marie"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="familyMemberLastName" className={labelStyle}>Nom</label>
                    <input
                      type="text"
                      id="familyMemberLastName"
                      value={personalInfo.familyMemberLastName || ''}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, familyMemberLastName: e.target.value })}
                      className={inputStyle}
                      placeholder="Dupont"
                      required
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={goBack}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
          >
            Retour
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid() || isSubmitting}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isFormValid() && !isSubmitting
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                : 'bg-gray-600 cursor-not-allowed text-gray-300'
            }`}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
          </button>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const reservationId = Math.random().toString(36).substring(2, 15);
      router.push(`/confirmation?reservation_id=${reservationId}`);
      onClose();
    } catch (err) {
      console.error('Erreur:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderConfirmation = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Récapitulatif de votre réservation
        </h3>
        <p className="text-gray-300">
          Merci pour votre réservation. Nous vous enverrons un email de confirmation.
        </p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div>
          <h4 className="font-semibold text-white mb-2">Informations personnelles</h4>
          <div className="space-y-2">
            <p className="text-gray-300"><span className="font-medium">Nom :</span> {personalInfo.lastName}</p>
            <p className="text-gray-300"><span className="font-medium">Prénom :</span> {personalInfo.firstName}</p>
            <p className="text-gray-300"><span className="font-medium">Email :</span> {personalInfo.email}</p>
            <p className="text-gray-300"><span className="font-medium">Téléphone :</span> {personalInfo.phone}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Détails du cours</h4>
          <div className="space-y-2">
            <p className="text-gray-300"><span className="font-medium">Type :</span> {selectedCourseType === 'instrument' ? 'Cours d\'instrument' : 'Atelier collectif'}</p>
            {selectedCourseType === 'instrument' && (
              <>
                <p className="text-gray-300"><span className="font-medium">Instrument :</span> {selectedInstrument}</p>
                <p className="text-gray-300"><span className="font-medium">Format :</span> {courseFormat === 'individual' ? 'Individuel' : 'Duo/Trio'}</p>
              </>
            )}
            <p className="text-gray-300"><span className="font-medium">Horaires :</span></p>
            {Object.entries(selectedTimeSlots).map(([day, times]) => (
              <p key={day} className="text-gray-300 ml-4">{day}: {times.join(', ')}</p>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-700">
          <p className="text-xl font-bold text-white">
            Total mensuel : {calculateTotalAmount().monthly}€
          </p>
          {selectedPath === 'inscription' && (
            <p className="text-xl font-bold text-white">
              Total annuel : {calculateTotalAmount().annual}€
            </p>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>
          Nous vous contacterons dans les plus brefs délais pour confirmer votre participation.
        </p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
    >
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all duration-300"
              style={{
                width: `${((getSteps(selectedPath, selectedCourseType).indexOf(currentStep) + 1) / getSteps(selectedPath, selectedCourseType).length) * 100}%`
              }}
            />
          </div>
        </div>

        {currentStep === 'initial' && renderInitialChoice()}
        {currentStep === 'course-type' && renderCourseType()}
        {currentStep === 'instrument-choice' && renderInstrumentChoice()}
        {currentStep === 'level-choice' && renderLevelChoice()}
        {currentStep === 'format-choice' && renderFormatChoice()}
        {currentStep === 'schedule' && renderSchedule()}
        {currentStep === 'workshop-choice' && renderWorkshopChoice()}
        {currentStep === 'workshop-selection' && renderWorkshopSelection()}
        {currentStep === 'concert' && renderConcertChoice()}
        {currentStep === 'summary' && renderSummary()}
        {currentStep === 'personal-info' && renderPersonalInfo()}
        {currentStep === 'confirmation' && renderConfirmation()}

        {currentStep !== 'initial' && currentStep !== 'personal-info' && (
          <button
            onClick={goBack}
            className="mt-6 text-gray-400 hover:text-white flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour
          </button>
        )}
      </div>
    </motion.div>
  );
} 