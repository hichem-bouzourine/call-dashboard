import {formatPhoneNumber } from '@/utils';
import React, { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';


interface UniqueCallersProps {
  destinataire: string | null;
}

const UniqueCallers: React.FC<UniqueCallersProps> = ({ destinataire }: UniqueCallersProps) => {
  const [callers, setCallers] = React.useState([]);

  const fetchUniqueCallers = async () => {
    if (!destinataire) {
        return;
    }
    const res = await fetch(`/api/calls/statistiques/uniqueCallers?to=${destinataire}`);
    const data = await res.json();
    setCallers(data);
  }

  useEffect(() => {
      fetchUniqueCallers();
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
      <h2 className="text-xl font-semibold mb-4">Liste des appelants unique pour l'agent:</h2>
      <ul>
      {callers.map((caller: [string, number]) => (
          <li key={caller[0]} className="flex items-center justify-between border-b py-3">
            <span className="text-gray-800">{formatPhoneNumber(caller[0])}</span>
            <span className="text-gray-600">{caller[1]}</span>
          </li>
      ))}
      </ul>
    </div>
  );
};

export default UniqueCallers;