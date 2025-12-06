import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadSection from './components/UploadSection';
import AnalysisResult from './components/AnalysisResult';
import { analyzeHealth } from './services/geminiService';
import { TcmAnalysis, UploadType } from './types';

const App: React.FC = () => {
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [handImage, setHandImage] = useState<string | null>(null);
  const [tongueImage, setTongueImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<TcmAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback((type: UploadType, base64: string) => {
    if (type === UploadType.FACE) {
      setFaceImage(base64);
    } else if (type === UploadType.HAND) {
      setHandImage(base64);
    } else if (type === UploadType.TONGUE) {
      setTongueImage(base64);
    }
    setError(null);
  }, []);

  const handleAnalyze = useCallback(async () => {
    if (!faceImage || !handImage || !tongueImage) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await analyzeHealth(faceImage, handImage, tongueImage);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError("We couldn't read the energy from those images. Please try clearer photos.");
    } finally {
      setIsAnalyzing(false);
    }
  }, [faceImage, handImage, tongueImage]);

  const handleReset = useCallback(() => {
    setFaceImage(null);
    setHandImage(null);
    setTongueImage(null);
    setAnalysis(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans selection:bg-sage-200">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {error && (
          <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 text-red-800 text-sm rounded-lg text-center border border-red-100 animate-fade-in">
            {error}
          </div>
        )}

        {!analysis ? (
          <UploadSection 
            faceImage={faceImage}
            handImage={handImage}
            tongueImage={tongueImage}
            onImageSelect={handleImageSelect}
            onAnalyze={handleAnalyze}
            isAnalyzing={isAnalyzing}
          />
        ) : (
          <AnalysisResult 
            data={analysis}
            onReset={handleReset}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;