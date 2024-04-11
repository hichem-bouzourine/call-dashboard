
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-black opacity-50" onClick={onClose}></div>
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-semibold">Résumé de l'appel:</h2>
              <button className="px-3 py-1 bg-gray-200 rounded-md" onClick={onClose}>Fermer</button>
            </div>
            <p>{call.summary}</p>
          </div>
        </div>
      );
  };
  
  export default CallModal;