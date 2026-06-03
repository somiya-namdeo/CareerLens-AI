import React, { useState } from 'react';
import { UploadCloud, FileText } from 'lucide-react';
import clsx from 'clsx';

const UploadPanel: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

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
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className={clsx(
        "panel p-10 border-dashed border-2 flex flex-col items-center justify-center text-center transition-all duration-200",
        isDragging ? "border-[var(--color-career-primary)] bg-[#00C27A]/5" : "border-[var(--color-career-border)] hover:border-[var(--color-career-text-muted)]"
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {file ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#00C27A]/10 flex items-center justify-center text-[var(--color-career-primary)]">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-[var(--color-career-text)]">{file.name}</h3>
            <p className="text-sm text-[var(--color-career-text-muted)] mt-1">
              {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
            </p>
          </div>
          <button 
            className="mt-4 px-6 py-2 bg-[var(--color-career-primary)] hover:bg-[var(--color-career-primary-dark)] text-black font-semibold rounded-sm transition-colors"
            onClick={() => alert("Analysis started (Demo)")}
          >
            Analyze Resume
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 cursor-pointer">
          <div className="w-16 h-16 rounded-full bg-black/40 flex items-center justify-center text-[var(--color-career-text-muted)] group-hover:text-[var(--color-career-primary)] transition-colors">
            <UploadCloud className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-[var(--color-career-text)]">Drag & Drop Resume</h3>
            <p className="text-sm text-[var(--color-career-text-muted)] mt-1">or click to browse from your computer</p>
          </div>
          <div className="text-xs text-mono text-[var(--color-career-text-muted)] mt-2">
            SUPPORTED FORMATS: PDF, DOCX (MAX 5MB)
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPanel;
