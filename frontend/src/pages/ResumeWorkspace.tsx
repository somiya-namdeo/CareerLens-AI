import UploadPanel from '../components/ui/UploadPanel';
import { Database, FileTerminal, LayoutTemplate } from 'lucide-react';

export default function ResumeWorkspace() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-career-text)]">Resume Workspace</h1>
        <p className="text-[var(--color-career-text-muted)] text-sm mt-1">Professional Extraction & Analysis Environment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <UploadPanel />
          
          <div className="panel p-6">
            <div className="flex items-center justify-between mb-4 border-b border-[var(--color-career-border)] pb-4">
              <h2 className="text-lg font-semibold text-[var(--color-career-text)] flex items-center gap-2">
                <FileTerminal className="w-5 h-5 text-[var(--color-career-primary)]" />
                OCR Extraction Preview
              </h2>
              <span className="text-xs text-mono text-[var(--color-career-text-muted)]">WAITING FOR INPUT</span>
            </div>
            
            <div className="bg-black/40 p-4 rounded text-sm text-[var(--color-career-text-muted)] font-mono min-h-[300px] flex items-center justify-center border border-[var(--color-career-border)]">
              No document loaded. Upload a resume to view OCR output.
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="panel p-6">
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Metadata
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-[var(--color-career-border)] pb-2">
                <span className="text-sm text-[var(--color-career-text-muted)]">File Name</span>
                <span className="text-sm font-medium text-mono">-</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-career-border)] pb-2">
                <span className="text-sm text-[var(--color-career-text-muted)]">File Size</span>
                <span className="text-sm font-medium text-mono">-</span>
              </div>
              <div className="flex justify-between border-b border-[var(--color-career-border)] pb-2">
                <span className="text-sm text-[var(--color-career-text-muted)]">Pages</span>
                <span className="text-sm font-medium text-mono">-</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-sm text-[var(--color-career-text-muted)]">Language</span>
                <span className="text-sm font-medium text-mono">-</span>
              </div>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4" />
              Extraction Pipeline
            </h2>
            <div className="space-y-3">
              {['Text Parsing', 'Named Entity Recognition', 'Skill Extraction', 'Experience Mapping'].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-[var(--color-career-border)] bg-black/20"></div>
                  <span className="text-sm text-[var(--color-career-text-muted)]">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
