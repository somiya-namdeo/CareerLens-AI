import UploadPanel from '../components/ui/UploadPanel';
import { Database, FileTerminal, LayoutTemplate } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResumeWorkspace() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-career-text)]">Resume Analyzer</h1>
        <p className="text-[var(--color-career-text-muted)] text-base mt-2">Professional Extraction & Analysis Environment</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div variants={itemVariants}>
            <UploadPanel />
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-[var(--color-career-panel)] rounded-2xl border border-[var(--color-career-border)] overflow-hidden shadow-lg">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-career-border)] bg-[#1A221F]/30">
              <h2 className="text-lg font-semibold text-[var(--color-career-text)] flex items-center gap-2">
                <FileTerminal className="w-5 h-5 text-[var(--color-career-primary)]" />
                OCR Extraction Output
              </h2>
              <span className="px-3 py-1 rounded-full bg-black/40 text-xs font-medium text-[var(--color-career-text-muted)] font-mono border border-[var(--color-career-border)]">
                WAITING FOR INPUT
              </span>
            </div>
            
            <div className="p-6">
              <div className="bg-[#0A0C0B] p-6 rounded-xl text-sm text-[var(--color-career-text-muted)] font-mono min-h-[300px] flex items-center justify-center border border-[var(--color-career-border)] shadow-inner">
                No document loaded. Upload a resume to view OCR output.
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <motion.div variants={itemVariants} className="bg-[var(--color-career-panel)] p-6 rounded-2xl border border-[var(--color-career-border)] shadow-lg">
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-6 flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--color-career-secondary)]" />
              Document Metadata
            </h2>
            <div className="space-y-4">
              {[
                { label: 'File Name', value: '-' },
                { label: 'File Size', value: '-' },
                { label: 'Pages', value: '-' },
                { label: 'Language', value: '-' }
              ].map((meta, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-[var(--color-career-border)] last:border-0 last:pb-0">
                  <span className="text-sm text-[var(--color-career-text-muted)]">{meta.label}</span>
                  <span className="text-sm font-medium text-mono text-[var(--color-career-text)]">{meta.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-[var(--color-career-panel)] p-6 rounded-2xl border border-[var(--color-career-border)] shadow-lg">
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-6 flex items-center gap-2">
              <LayoutTemplate className="w-4 h-4 text-[var(--color-career-primary)]" />
              Extraction Pipeline
            </h2>
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[var(--color-career-border)] before:to-transparent">
              {['Text Parsing', 'Named Entity Recognition', 'Skill Extraction', 'Experience Mapping'].map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[var(--color-career-border)] bg-[#0A0C0B] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 group-[.is-active]:border-[var(--color-career-primary)] group-[.is-active]:bg-[var(--color-career-primary)]/10 group-[.is-active]:text-[var(--color-career-primary)] z-10 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[var(--color-career-border)] group-[.is-active]:bg-[var(--color-career-primary)]" />
                  </div>
                  <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-3 rounded border border-[var(--color-career-border)] bg-[#111614] shadow">
                    <span className="text-sm font-medium text-[var(--color-career-text-muted)]">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
