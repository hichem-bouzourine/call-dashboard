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
import { format } from 'date-fns';


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
    const [openCall, setOpenCall] = useState(false);
  
    const handleClick = (call: Call) => {
      setSelectedCall(call);
      setOpenCall(true);
    };
    
    const handleCloseUserCard = () => {
        setOpenCall(false);
        setSelectedCall(null);
    };
    
    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
    };

    const formatDuration = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes} minute(s) et ${seconds} seconde(s)`;
    };

    const formatPhoneNumber = (phoneNumber: string) => {
        // Check if the phone number starts with "+33"
        if (phoneNumber.startsWith("+33")) {
          // Replace "+33" with "0"
          return phoneNumber.replace("+33", "0");
        } else {
          // If the phone number doesn't start with "+33", return it unchanged
          return phoneNumber;
        }
    };

    return (
          <>
            {!selectedCall && (
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
                            <TableCell component="th" scope="row">{formatDate(call.date)}</TableCell>
                            <TableCell align="right">{formatPhoneNumber(call.from)}</TableCell>
                            <TableCell align="right">{formatDuration(call.duration)}</TableCell>
                            <TableCell align="right">{call.subject}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )
            }

            {selectedCall && openCall &&(
                <CallModal call={selectedCall} onClose={handleCloseUserCard} />
            )
            }
        </>
    );
  };

export default CallList;