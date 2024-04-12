import React, { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { formatDurationFromMinutes, formatPhoneNumber } from '@/utils';


interface DailySavedTimeProps {
  destinataire: string | null;
}

const DailySavedTime: React.FC<DailySavedTimeProps> = ({ destinataire }) => {
  const [savedTime, setSavedTime] = React.useState(0);

  const fetchSavedTime = async () => {
    if (!destinataire) {
        return;
    }
    const res = await fetch(`/api/calls/statistiques/dailySavedTime?to=${destinataire}`);
    const data = await res.json();
    setSavedTime(data);
  }

  useEffect(() => {
    fetchSavedTime();
  }, [destinataire]);

  if (!destinataire) {
     // Alternatively, we could return null or a message to indicate that no destinataire is selected
      return (
      <div>
          <Skeleton variant="rectangular" sx={{width: "full"}} height={130} />
      </div>
      )
  }

  return (
    <div className="max-w-lg mx-auto my-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Temps gagné quotidiennement pour l'agent:</h2>
      <ul>
          <li key={destinataire} className="flex items-center justify-between border-b py-3">
            <span className="text-gray-800">{formatPhoneNumber(destinataire)}</span>
            <span className="text-gray-600">{formatDurationFromMinutes(savedTime)}</span>
          </li>
      </ul>
    </div>
  );
};

export default DailySavedTime;