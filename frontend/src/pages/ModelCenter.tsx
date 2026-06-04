import ComparisonTable from '../components/ui/ComparisonTable';
import { Cpu, Network, Binary, CheckCircle2, Search } from 'lucide-react';
import { motion } from 'framer-motion';


export default function ModelCenter() {
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
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-career-text)]">Model Insights</h1>
          <p className="text-[var(--color-career-text-muted)] text-base mt-2">
            Under the hood of CareerLens AI. Four machine learning modules work together to deliver insights.
            <br />
            <span className="text-[var(--color-career-primary)] opacity-80 text-sm mt-1 inline-block">* Metrics are based on validation results from project notebooks.</span>
          </p>
        </div>
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-career-text-muted)] group-focus-within:text-[var(--color-career-primary)] transition-colors" />
          <input 
            type="text" 
            placeholder="Search models or metrics..." 
            className="pl-10 pr-4 py-2 bg-[#111614] border border-[var(--color-career-border)] text-sm rounded-full focus:outline-none focus:border-[var(--color-career-primary)] transition-colors w-64 text-[var(--color-career-text)] placeholder-[var(--color-career-text-muted)] shadow-inner"
          />
        </div>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Hire / Reject Prediction", acc: "94.2%", icon: Binary, type: "CLASSIFICATION" },
          { title: "Job Role Prediction", acc: "84.6%", icon: Network, type: "MULTI-CLASS" },
          { title: "Salary Prediction", acc: "0.57", icon: Cpu, type: "REGRESSION", metric: "R² Score" },
          { title: "OCR Resume Classification", acc: "84.6%", icon: CheckCircle2, type: "VISION + NLP" },
        ].map((m, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,194,122,0.15)" }}
            className="bg-[var(--color-career-panel)] p-6 rounded-2xl border border-[var(--color-career-border)] flex flex-col transition-all shadow-lg relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-career-primary)]/5 blur-[40px] rounded-full group-hover:bg-[var(--color-career-primary)]/10 transition-colors" />
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#0A0C0B] border border-[var(--color-career-border)] flex items-center justify-center">
                <m.icon className="w-5 h-5 text-[var(--color-career-primary)]" />
              </div>
              <span className="text-[10px] font-bold text-[var(--color-career-text-muted)] uppercase tracking-widest bg-black/40 px-2 py-1 rounded border border-[var(--color-career-border)]">
                {m.type}
              </span>
            </div>
            <h3 className="font-bold text-lg text-[var(--color-career-text)] mb-1 relative z-10">{m.title}</h3>
            
            <div className="mt-6 pt-4 border-t border-[var(--color-career-border)] flex items-end justify-between relative z-10">
              <span className="text-sm text-[var(--color-career-text-muted)]">{m.metric || "Accuracy"}</span>
              <span className="text-2xl font-bold text-mono text-[var(--color-career-primary)]">{m.acc}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <motion.div variants={itemVariants} className="bg-[var(--color-career-panel)] p-8 rounded-3xl border border-[var(--color-career-border)] shadow-xl overflow-hidden">
          <h2 className="text-lg font-bold text-[var(--color-career-text)] mb-6 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--color-career-primary)] shadow-[0_0_10px_rgba(0,194,122,0.5)]"></div>
            Model Comparison
          </h2>
          <div className="overflow-x-auto">
            <ComparisonTable />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
