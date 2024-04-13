"use client"
import { useEffect, useState } from 'react';
import CallModal from './CallModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatPhoneNumber, formatDate, formatDuration, formatSubject } from '@/utils';
import CircularProgress from '@mui/material/CircularProgress';


interface Call {
  id: string;
  from: string;
  to: string;
  date: string;
  duration: number;
  subject: string;
  summary: string;
}

interface CallListProps {
  calls: Call[];
  loading: boolean;
}

const CallList: React.FC<CallListProps> = ({ calls, loading }: CallListProps) => {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const [openCall, setOpenCall] = useState(false);
  const [filteredCalls, setFilteredCalls] = useState<Call[]>(calls); // State for filtered calls
  const [filter, setFilter] = useState<string | null>(null); // State for filter type

  useEffect(() => {
    // Initialize filteredCalls with all calls when the component mounts
    setFilteredCalls(calls);
  }, [calls]); // Trigger effect when calls change

  const handleClick = (call: Call) => {
    setSelectedCall(call);
    setOpenCall(true);
  };

  const handleCloseCallModal = () => {
    setOpenCall(false);
    setSelectedCall(null);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilter = event.target.value;
    applyFilter(selectedFilter);
  };

  // Function to apply filter
  const applyFilter = (type: string) => {
    if (type === 'all') {
      setFilter(null);
      setFilteredCalls(calls);
    } else {
      setFilter(type);
      const filtered = calls.filter(call => call.subject === type);
      setFilteredCalls(filtered);
    }
  };

  return (
  
      <div className={selectedCall ? "bg-transparent" : ""}>
        <div className="flex justify-between mb-4">
          <div>
            <label htmlFor="filter" className="mr-2 cursor-pointer">Filtrer par sujet :</label>
            <select id="filter" name="filter" value={filter || "all"} onChange={handleFilterChange} className="px-4 py-2 bg-gray-200 rounded-md cursor-pointer outline-none">
              <option value="all">Tous</option>
              <option value="appointment">Prise de rendez-vous</option>
              <option value="information">Demande de renseignements</option>
              <option value="prescription">Prescription</option>
              <option value="other">Autre</option>
            </select>
          </div>
          <button className="bg-gray-200 rounded-md p-3 w-fit hover:bg-slate-600 hover:text-white transition duration-2" onClick={() => applyFilter('all')}>Réinitialiser le filtre</button>
        </div>
        {!loading && (

          <div style={{ overflowY: 'auto'}}> 
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className='text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider'>Date et heure</TableCell>
                  <TableCell className="text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider" align="right">Appelant</TableCell>
                  <TableCell className='text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider' align="right">Durée</TableCell>
                  <TableCell className='text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider' align="right">Sujet</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCalls.map((call) => (
                  <TableRow
                    key={call.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleClick(call)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <TableCell component="th" scope="row">{formatDate(call.date)}</TableCell>
                    <TableCell align="right">{formatPhoneNumber(call.from)}</TableCell>
                    <TableCell align="right">{formatDuration(call.duration)}</TableCell>
                    <TableCell align="right">{formatSubject(call.subject)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        )}
        {(loading || !calls) && 
          <div>
            <CircularProgress />
          </div>
        }
        {selectedCall && <CallModal call={selectedCall} onClose={handleCloseCallModal} />}
      </div>
  );
};

export default CallList;
