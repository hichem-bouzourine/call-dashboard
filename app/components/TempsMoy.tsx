"use client"
import { formatDuration, formatPhoneNumber } from '@/utils';
import React, { useEffect } from 'react';

interface TempsMoyProps {
  destinataire: string | null;
}

const TempsMoy: React.FC<TempsMoyProps> = ({destinataire}: TempsMoyProps) => {

    const [temps, setTemps] = React.useState<number>(0);

    const fetchTemps = async () => {
        if (!destinataire) {
            return;
        }
        const res = await fetch(`/api/calls/statistiques/tempsMoy?to=${destinataire}`);
        const data = await res.json();
        setTemps(data);
    }

    useEffect(() => {
        fetchTemps();
    }, [destinataire]);

    if (!destinataire) {
        return <div>Destinataire non sélectionné</div>; // Rendu alternatif si destinataire est null
    }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Temps Moyen pour l'agent:</h2>
      <ul>
          <li key={destinataire} className="flex items-center justify-between border-b py-3">
            <span className="text-gray-800">{formatPhoneNumber(destinataire)}</span>
            <span className="text-gray-600">{formatDuration(temps)}</span>
          </li>
      </ul>
    </div>
  );
};

export default TempsMoy;