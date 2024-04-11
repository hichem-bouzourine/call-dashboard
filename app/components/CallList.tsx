"use client"
import { useState } from 'react';
import CallModal from './CallModal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
}

const CallList: React.FC<CallListProps> = ({ calls }) => {
    const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  
    const handleClick = (call: Call) => {
      setSelectedCall(call);
    };
  
    return (
          <>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='px-2 md:px-16 py-3 md:py-5 text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider'>Date et heure</TableCell>
                        <TableCell className="px-2 md:px-16 py-3 md:py-5 text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider" align="right">Appelant</TableCell>
                        <TableCell className='px-2 md:px-16 py-3 md:py-5 text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider' align="right">Durée</TableCell>
                        <TableCell className='px-2 md:px-16 py-3 md:py-5 text-left text-xs md:text-base font-medium text-gray-500 uppercase tracking-wider' align="right">Sujet</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {calls.map((call) => (
                    <TableRow
                    key={call.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => handleClick(call)} 
                    className="cursor-pointer hover:bg-gray-100"
                    >
                        <TableCell component="th" scope="row">{call.date}</TableCell>
                        <TableCell align="right">{call.from}</TableCell>
                        <TableCell align="right">{call.duration}</TableCell>
                        <TableCell align="right">{call.subject}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>

            {selectedCall && <CallModal call={selectedCall} onClose={() => setSelectedCall(null)} />}
        </>
    );
  };

export default CallList;