import { format, sub } from 'date-fns';

export const formatPhoneNumber = (phoneNumber: string) => {
    // Check if the phone number starts with "+33"
    if (phoneNumber.startsWith("+33")) {
      // Replace "+33" with "0"
      return phoneNumber.replace("+33", "0");
    } else {
      // If the phone number doesn't start with "+33", return it unchanged
      return phoneNumber;
    }
};

export const formatDate = (dateString: string) => {
  return format(new Date(dateString), "dd/MM/yyyy HH:mm:ss");
};

export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  let min = "minutes";
  let sec = "secondes";
  if (minutes === 1) {
    min = "minute";
  }

  if (seconds === 1) {
    sec = "seconde";
  }

  return `${minutes} ${min} et ${seconds} ${sec}`;
};

export const formatDurationFromMinutes = (durationInMinutes: number) => {
  const minutes = Math.floor(durationInMinutes);
  const seconds = Math.round((durationInMinutes - minutes) * 60); // Convertir les décimales en secondes

  let min = "minutes";
  let sec = "secondes";
  if (minutes === 1) {
    min = "minute";
  }

  if (seconds === 1) {
    sec = "seconde";
  }

  return `${minutes} ${min} et ${seconds} ${sec}`;
};

export const formatSubject = (subject: string) => {
  switch (subject) {
    case  "appointment" : return "Rendez-vous";
    case  "information" : return "Demande de renseignements";
    case  "prescription" : return "Prescription";
    case  "other" : return "Autre";
      
    default : return "Autre"; 
  }
};