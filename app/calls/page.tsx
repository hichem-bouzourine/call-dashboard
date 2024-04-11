"use client"
import { useEffect, useState } from 'react';
import CallList from '../components/CallList';

const CallsPage: React.FC = () => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchCalls = async () => {
      const res = await fetch(`/api/calls`);
      const data = await res.json();
      setCalls(data);
    };
    fetchCalls();
  }, []);

  return (
    <div className='flex flex-col' >
      <h1 className='justify-center md:ml-28 lg:ml-8 text-2xl text-slate-500' >Liste des appels</h1>
      <CallList calls={calls} />
    </div>
  );
};

export default CallsPage;