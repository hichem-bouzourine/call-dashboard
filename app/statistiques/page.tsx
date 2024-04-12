"use client"
import { useEffect, useState } from 'react';
import { formatPhoneNumber } from '@/utils';
import TempsMoy from '@/app/components/TempsMoy';
import FrequentSubject from '../components/FrequentSubject';
import UniqueCallers from '@/app/components/UniqueCallers';
import DailySavedTime from '../components/DailySavedTime';
import Link from 'next/link';

interface Call {
  id: string;
  from: string;
  to: string;
  date: string;
  duration: number;
  subject: string;
  summary: string;
}

const StatisticsPage: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [uniqueTo, setUniqueTo] = useState<string[]>([]);
  const [selectedTo, setSelectedTo] = useState<string | null>(null);

  const fetchCalls = async () => {
    const res = await fetch(`/api/calls`);
    const data = await res.json();
    const uniqueTo: string[] = Array.from(new Set(data.map((call: Call) => call.to)));
    setUniqueTo(uniqueTo);
    fetchCallsByDest(uniqueTo[0]);
  };

  const fetchCallsByDest = async (destinataire: string) => {
    const res = await fetch(`/api/calls?to=${destinataire}`);
    const data = await res.json();
    setSelectedTo(destinataire);
    setCalls(data);
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="fetch" className="mr-2">Choisissez un destinataire:</label>
            <select id="fetch" name="fetch" onChange={(e) => fetchCallsByDest(e.target.value)} className="px-2 py-2 bg-gray-200 rounded-md hover:bg-slate-300">
              {uniqueTo.map((to) => (
                <option key={to} value={to}>{formatPhoneNumber(to)}</option>
              ))}
            </select>
          </div>
          <div>
            <Link 
              href={"/calls"}
              className="bg-gray-200 rounded-md p-3 hover:bg-slate-600 hover:text-white transition duration-2"
            >
              Retour aux appels
            </Link>
          </div>
        </div>
      </div>
      <div>
        {/* on place les statistiques ici */}
        <TempsMoy destinataire={selectedTo}/>
        <FrequentSubject destinataire={selectedTo}/>
        <DailySavedTime destinataire={selectedTo}/>
        <UniqueCallers destinataire={selectedTo}/>
      </div>
    </div>
  );
};

export default StatisticsPage;