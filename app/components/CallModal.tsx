
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
      <div className="flex flex-col glassmorphism my-3 gap-3">
        <div className=" flex flex-row justify-between">
            <h2>Résumé de l'appel:</h2>
            <button 
                className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                onClick={onClose}
            >
                Fermer
            </button>
        </div>
        <p>{call.summary}</p>
      </div>
    );
  };
  
  export default CallModal;