import React, { useState, useRef, useEffect } from 'react';
import { UploadCloud, FileText, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface UploadPanelProps {
  onFileSelect?: (file: File | null) => void;
  onAnalysisComplete?: (data: any) => void;
}

const UploadPanel: React.FC<UploadPanelProps> = ({ onFileSelect, onAnalysisComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (onFileSelect) {
      onFileSelect(file);
    }
  }, [file, onFileSelect]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        setError('Please upload a PDF file.');
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClick = () => {
    if (!file && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "relative rounded-2xl p-10 border-dashed border-2 flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden min-h-[300px]",
        isDragging 
          ? "border-[var(--color-career-primary)] bg-[var(--color-career-primary)]/5" 
          : "border-[var(--color-career-border)] bg-[#0A0C0B] hover:border-[var(--color-career-text-muted)]",
        !file ? "cursor-pointer" : ""
      )}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input 
        type="file" 
        accept="application/pdf" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileInput} 
      />
      {isDragging && (
        <motion.div 
          className="absolute inset-0 pointer-events-none border-4 border-[var(--color-career-primary)] opacity-50 rounded-2xl"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
      )}

      <AnimatePresence mode="wait">
        {file ? (
          <motion.div 
            key="file-uploaded"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-6 z-10"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[var(--color-career-primary)]/10 flex items-center justify-center text-[var(--color-career-primary)]">
                <FileText className="w-10 h-10" />
              </div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="absolute -bottom-2 -right-2 bg-[#0A0C0B] rounded-full p-1"
              >
                <CheckCircle2 className="w-6 h-6 text-[var(--color-career-primary)]" />
              </motion.div>
            </div>
            <div>
              <h3 className="text-xl font-medium text-[var(--color-career-text)] mb-2">{file.name}</h3>
              <p className="text-sm text-[var(--color-career-text-muted)] font-mono">
                {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
              </p>
            </div>
            
            {!analyzing && !isComplete ? (
              <div className="flex flex-col items-center gap-2">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[var(--color-career-primary)] hover:bg-[var(--color-career-primary-dark)] text-black font-bold rounded-full transition-all shadow-[0_0_20px_rgba(0,194,122,0.2)] hover:shadow-[0_0_30px_rgba(0,194,122,0.4)]"
                  onClick={async () => {
                    setAnalyzing(true);
                    setError(null);
                    
                    const formData = new FormData();
                    formData.append('file', file);
                    
                    try {
                      const response = await fetch('http://127.0.0.1:8000/api/analyze-resume', {
                        method: 'POST',
                        body: formData,
                      });
                      
                      if (!response.ok) {
                        const errText = await response.text();
                        throw new Error(`Server error: ${response.status} - ${errText}`);
                      }
                      
                      const data = await response.json();
                      localStorage.setItem('careerLensResult', JSON.stringify(data));
                      if (onAnalysisComplete) {
                        onAnalysisComplete(data);
                      }
                      setAnalyzing(false);
                      setIsComplete(true);
                    } catch (err: any) {
                      console.error("Analysis failed:", err);
                      setError(err.message || "Failed to connect to backend. Please ensure the server is running.");
                      setAnalyzing(false);
                    }
                  }}
                >
                  Start Analysis
                </motion.button>
                {error && (
                  <p className="text-rose-500 text-sm font-medium mt-2 max-w-sm text-center">{error}</p>
                )}
              </div>
            ) : analyzing && !isComplete ? (
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-career-primary)] animate-ping" />
                  <span className="text-sm font-medium text-[var(--color-career-primary)]">Processing document with AI Models...</span>
                </div>
                <div className="w-64 h-2 bg-[#111614] rounded-full overflow-hidden relative">
                  <motion.div 
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[var(--color-career-primary)] to-[var(--color-career-primary-dark)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 15, ease: "easeOut" }}
                  />
                </div>
              </div>
            ) : isComplete ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-2 text-[var(--color-career-primary)] font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  Analysis Complete
                </div>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-[#111614] border border-[var(--color-career-primary)] text-[var(--color-career-primary)] hover:bg-[var(--color-career-primary)] hover:text-black font-bold rounded-full transition-all"
                  onClick={() => navigate('/results')}
                >
                  View Intelligence Report
                </motion.button>
              </motion.div>
            ) : null}
          </motion.div>
        ) : (
          <motion.div 
            key="upload-prompt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-5 cursor-pointer z-10 w-full h-full justify-center"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-20 h-20 rounded-full bg-[#111614] border border-[var(--color-career-border)] flex items-center justify-center text-[var(--color-career-text-muted)] group-hover:text-[var(--color-career-primary)] transition-colors shadow-lg"
            >
              <UploadCloud className="w-10 h-10" />
            </motion.div>
            <div>
              <h3 className="text-xl font-medium text-[var(--color-career-text)] mb-2">Drag & Drop Resume</h3>
              <p className="text-sm text-[var(--color-career-text-muted)]">or click anywhere to browse from your computer</p>
            </div>
            <div className="px-4 py-1.5 rounded-full bg-[#111614] border border-[var(--color-career-border)] text-xs text-[var(--color-career-text-muted)] font-mono mt-4">
              SUPPORTED: PDF ONLY (MAX 5MB)
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UploadPanel;
