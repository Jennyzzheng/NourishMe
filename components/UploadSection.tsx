import React, { useRef } from 'react';
import { Camera, Upload, CheckCircle2 } from 'lucide-react';
import { UploadType } from '../types';

interface UploadSectionProps {
  faceImage: string | null;
  handImage: string | null;
  tongueImage: string | null;
  onImageSelect: (type: UploadType, base64: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ 
  faceImage, 
  handImage, 
  tongueImage,
  onImageSelect, 
  onAnalyze,
  isAnalyzing
}) => {
  const faceInputRef = useRef<HTMLInputElement>(null);
  const handInputRef = useRef<HTMLInputElement>(null);
  const tongueInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: UploadType) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Remove data URL prefix for API
        const base64 = result.split(',')[1];
        onImageSelect(type, base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const getLabel = (type: UploadType) => {
    switch (type) {
        case UploadType.FACE: return "Face";
        case UploadType.HAND: return "Hand";
        case UploadType.TONGUE: return "Tongue";
    }
  };

  const getSubLabel = (type: UploadType) => {
    switch (type) {
        case UploadType.FACE: return "Natural light, no makeup.";
        case UploadType.HAND: return "Palm facing camera.";
        case UploadType.TONGUE: return "Relaxed, stick it out.";
    }
  };

  const UploadCard = ({ type, image, inputRef }: { type: UploadType, image: string | null, inputRef: React.RefObject<HTMLInputElement> }) => (
    <div 
      onClick={() => inputRef.current?.click()}
      className={`
        relative overflow-hidden cursor-pointer group transition-all duration-300
        h-64 rounded-3xl border-2 flex flex-col items-center justify-center
        ${image ? 'border-sage-400 bg-stone-100' : 'border-stone-200 border-dashed hover:border-sage-300 hover:bg-white'}
      `}
    >
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={inputRef}
        onChange={(e) => handleFileChange(e, type)}
      />
      
      {image ? (
        <>
          <img 
            src={`data:image/jpeg;base64,${image}`} 
            alt={`${getLabel(type)} Scan`} 
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-stone-900/20 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
              <CheckCircle2 className="w-8 h-8 text-sage-600" />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center p-6 space-y-3">
          <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto group-hover:bg-sage-50 transition-colors">
            {type === UploadType.FACE ? (
                <Camera className="w-8 h-8 text-stone-400 group-hover:text-sage-600" />
            ) : (
                <Upload className="w-8 h-8 text-stone-400 group-hover:text-sage-600" />
            )}
          </div>
          <div>
            <h3 className="font-serif text-lg text-stone-700">Scan {getLabel(type)}</h3>
            <p className="text-xs text-stone-400 mt-1 max-w-[150px] mx-auto">
              {getSubLabel(type)}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const canAnalyze = faceImage && handImage && tongueImage;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in-up">
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800">
          Let’s read your energy.
        </h2>
        <p className="text-stone-500 max-w-lg mx-auto">
          Upload photos of your face, palm, and tongue. We'll interpret your body's whispers using ancient TCM principles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UploadCard type={UploadType.FACE} image={faceImage} inputRef={faceInputRef} />
        <UploadCard type={UploadType.HAND} image={handImage} inputRef={handInputRef} />
        <UploadCard type={UploadType.TONGUE} image={tongueImage} inputRef={tongueInputRef} />
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={onAnalyze}
          disabled={!canAnalyze || isAnalyzing}
          className={`
            px-12 py-4 rounded-full font-medium tracking-wide text-lg transition-all duration-300 shadow-xl
            ${!canAnalyze
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
              : isAnalyzing 
                ? 'bg-stone-800 text-white cursor-wait animate-pulse' 
                : 'bg-stone-800 text-white hover:bg-sage-800 hover:scale-105 active:scale-95'
            }
          `}
        >
          {isAnalyzing ? 'Reading Vital Signs...' : 'Analyze My Qi'}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;