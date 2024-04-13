"use client"
import { useEffect, useState } from 'react';
import CallList from '../../components/CallList';
import { formatPhoneNumber } from '@/utils';
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

const CallsPage: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [uniqueTo, setUniqueTo] = useState<string[]>([]);
  const [selectedTo, setSelectedTo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCalls = async () => {
    const res = await fetch(`/api/calls/agents`);
    const data = await res.json();
    setUniqueTo(data);
    fetchCallsByDest(data[0]);
  };

  const fetchCallsByDest = async (destinataire: string) => {
    setLoading(true);
    const res = await fetch(`/api/calls?to=${destinataire}`);
    const data = await res.json();
    setSelectedTo(destinataire);
    setCalls(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col justify-between mb-2">
          <div className='flex justify-end mb-2'>
            <Link 
              href={"/statistiques"}
              className="bg-gray-200 rounded-md p-3 w-fit hover:bg-slate-500 hover:text-white transition duration-2"
              >
              Aller aux statistiques
            </Link>
          </div>
          <div className='flex justify-between my-4'>
            <div>
              <label htmlFor="fetch" className="mr-2">Choisissez un destinataire:</label>
              <select id="fetch" name="fetch" onChange={(e) => fetchCallsByDest(e.target.value)} className="px-2 py-2 bg-gray-200 rounded-md  cursor-pointer outline-none">
                {uniqueTo.map((to) => (
                  <option key={to} value={to}>{formatPhoneNumber(to)}</option>
                ))}
              </select>
            </div>
            <button
              className="bg-gray-200 rounded-md p-2 w-fit hover:bg-slate-500 hover:text-white transition duration-2"
              onClick={()=> fetchCallsByDest(selectedTo!)}
              >
              Rafraichir les données
            </button>
          </div>
        </div>
      </div>
      <CallList calls={calls} loading={loading} />
    </div>
  );
};

export default CallsPage;