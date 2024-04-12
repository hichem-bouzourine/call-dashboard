import {formatPhoneNumber, formatSubject } from '@/utils';
import React, { useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';


interface FrequentSubjectProps {
  destinataire: string | null;
}

const FrequentSubject: React.FC<FrequentSubjectProps> = ({ destinataire }: FrequentSubjectProps) => {
  const [subject, setSubject] = React.useState<string>("");

  const fetchFrequentSubject = async () => {
    if (!destinataire) {
        return;
    }
    const res = await fetch(`/api/calls/statistiques/frequentSubject?to=${destinataire}`);
    const data = await res.json();
    setSubject(data);
  }

  useEffect(() => {
      fetchFrequentSubject();
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
      <h2 className="text-xl font-semibold mb-4">Motif le plus fréquent d'appel pour l'agent:</h2>
      <ul>
          <li key={destinataire} className="flex items-center justify-between border-b py-3">
            <span className="text-gray-800">{formatPhoneNumber(destinataire)}</span>
            <span className="text-gray-600">{formatSubject(subject)}</span>
          </li>
      </ul>
    </div>
  );
};

export default FrequentSubject;