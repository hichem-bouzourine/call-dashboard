
interface Call {
    id: string;
    from: string;
    to: string;
    date: string;
    duration: number;
    subject: string;
    summary: string;
  }
  
  interface CallModalProps {
    call: Call;
    onClose: () => void;
  }
  
  const CallModal: React.FC<CallModalProps> = ({ call, onClose }) => {
    return (
      <div>
        <h2>Résumé de l'appel:</h2>
        <p>{call.summary}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    );
  };
  
  export default CallModal;