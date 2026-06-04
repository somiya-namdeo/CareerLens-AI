import React, { useEffect, useState } from 'react';
import MetricCard from '../components/ui/MetricCard';
import SkillBadge from '../components/ui/SkillBadge';
import { Target, Briefcase, DollarSign, BrainCircuit, AlertTriangle, Lightbulb, Download, ArrowLeft } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function IntelligenceReport() {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('careerLensResult');
    if (data) {
      setReportData(JSON.parse(data));
    }
  }, []);

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

  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h2 className="text-2xl font-bold text-[var(--color-career-text)]">No analysis data found</h2>
        <p className="text-[var(--color-career-text-muted)]">Please upload and analyze a resume first.</p>
        <button 
          onClick={() => navigate('/analyzer')}
          className="px-6 py-2 bg-[var(--color-career-primary)] text-black font-bold rounded-full hover:bg-[var(--color-career-primary-dark)] transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Go to Analyzer
        </button>
      </div>
    );
  }

  // Calculate dynamic strengths based on actual data
  const totalSkills = reportData.verified_skills.length + reportData.missing_skills.length;
  const skillMatch = totalSkills > 0 ? Math.round((reportData.verified_skills.length / totalSkills) * 100) : 0;
  
  const strengths = [
    { label: 'Overall Fit', value: reportData.resume_score },
    { label: 'Skill Match', value: skillMatch },
    { label: 'Hire Probability', value: reportData.hire_probability }
  ];

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--color-career-text)]">Intelligence Report</h1>
          <p className="text-[var(--color-career-text-muted)] text-base mt-2 flex items-center gap-2">
            Domain: <span className="text-[var(--color-career-secondary)] font-medium">{reportData.ocr_classification}</span> • Generated from 4 ML modules
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-career-border)] rounded-full text-sm hover:bg-white/5 transition-colors text-[var(--color-career-text)] font-medium bg-[#111614]">
          <Download className="w-4 h-4" />
          Export JSON
        </button>
      </motion.div>

      <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={itemVariants}><MetricCard title="Resume Score" value={`${reportData.resume_score}/100`} icon={Target} /></motion.div>
        <motion.div variants={itemVariants}><MetricCard title="Hiring Probability" value={`${reportData.hire_probability}%`} icon={BrainCircuit} /></motion.div>
        <motion.div variants={itemVariants}><MetricCard title="Predicted Role" value={reportData.predicted_role} icon={Briefcase} /></motion.div>
        <motion.div variants={itemVariants}><MetricCard title="Estimated Salary" value={reportData.estimated_salary} icon={DollarSign} /></motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-[var(--color-career-panel)] p-8 rounded-3xl border border-[var(--color-career-border)] shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-career-primary)]/5 blur-[80px] rounded-full group-hover:bg-[var(--color-career-primary)]/10 transition-colors" />
          <h2 className="text-xl font-bold text-[var(--color-career-text)] mb-8 flex items-center gap-2 relative z-10">
            <div className="w-3 h-3 rounded-full bg-[var(--color-career-primary)] shadow-[0_0_10px_rgba(0,194,122,0.5)]"></div>
            Evaluation Metrics
          </h2>
          <div className="h-[280px] w-full relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strengths} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-career-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--color-career-text-muted)" fontSize={12} tickFormatter={(val) => `${val}%`} />
                <YAxis dataKey="label" type="category" stroke="var(--color-career-text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-career-panel)', borderColor: 'var(--color-career-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-career-primary)', fontWeight: 'bold' }}
                />
                <Bar dataKey="value" fill="var(--color-career-primary)" barSize={24} radius={[0, 6, 6, 0]}>
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col gap-8">
          <div className="bg-[#111614] p-8 rounded-3xl border border-[var(--color-career-border)] shadow-xl">
            <h2 className="text-sm font-bold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-5 flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--color-career-primary)]" />
              Verified Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {reportData.verified_skills.length > 0 ? (
                reportData.verified_skills.map((skill: string, i: number) => (
                  <motion.div key={skill} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.05 }}>
                    <SkillBadge skill={skill} type="current" />
                  </motion.div>
                ))
              ) : (
                <p className="text-[var(--color-career-text-muted)] text-sm">No specific technical skills extracted.</p>
              )}
            </div>
            
            <div className="mt-8 pt-8 border-t border-[var(--color-career-border)]">
              <h2 className="text-sm font-bold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-5 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                Skill Gaps Detected
              </h2>
              <div className="flex flex-wrap gap-2">
                {reportData.missing_skills.length > 0 ? (
                  reportData.missing_skills.map((skill: string, i: number) => (
                    <motion.div key={skill} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + i * 0.05 }}>
                      <SkillBadge skill={skill} type="missing" />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-[var(--color-career-text-muted)] text-sm">No major skill gaps detected for this role.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#111614] to-[#0A0C0B] p-8 rounded-3xl border border-[var(--color-career-border)] shadow-xl mt-auto">
            <h2 className="text-sm font-bold text-[var(--color-career-secondary)] uppercase tracking-wider mb-5 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Career Recommendations
            </h2>
            <ul className="space-y-4">
              {reportData.recommendations.map((rec: string, i: number) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="text-sm text-[var(--color-career-text)] flex gap-3 p-4 bg-[#0A0C0B] rounded-xl border border-[var(--color-career-border)] border-l-2 border-l-[var(--color-career-secondary)]"
                >
                  <span className="text-[var(--color-career-secondary)] font-bold">{i+1}.</span> 
                  <span className="leading-relaxed">{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Database(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;
}
