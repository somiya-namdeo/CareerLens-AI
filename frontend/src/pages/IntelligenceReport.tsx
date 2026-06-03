import MetricCard from '../components/ui/MetricCard';
import SkillBadge from '../components/ui/SkillBadge';
import { CANDIDATE_REPORT } from '../data/mockData';
import { Target, Briefcase, DollarSign, BrainCircuit, AlertTriangle, Lightbulb } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function IntelligenceReport() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-career-text)]">Intelligence Report</h1>
          <p className="text-[var(--color-career-text-muted)] text-sm mt-1">ID: CAND-8942-A • Processed: 2 mins ago</p>
        </div>
        <button className="px-4 py-2 border border-[var(--color-career-border)] text-sm hover:bg-white/5 transition-colors text-mono">
          EXPORT JSON
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Resume Score" value={CANDIDATE_REPORT.score} icon={Target} />
        <MetricCard title="Hiring Probability" value={`${(CANDIDATE_REPORT.hireProbability * 100).toFixed(0)}%`} icon={BrainCircuit} />
        <MetricCard title="Predicted Role" value="Sr. Frontend" icon={Briefcase} />
        <MetricCard title="Estimated Salary" value="$130k" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="panel p-6">
          <h2 className="text-lg font-semibold text-[var(--color-career-text)] mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-career-primary)]"></div>
            Strength Analysis
          </h2>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CANDIDATE_REPORT.strengths} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-career-border)" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="var(--color-career-text-muted)" fontSize={12} tickFormatter={(val) => `${val}%`} />
                <YAxis dataKey="label" type="category" stroke="var(--color-career-text-muted)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-career-panel)', borderColor: 'var(--color-career-border)' }}
                  itemStyle={{ color: 'var(--color-career-primary)' }}
                />
                <Bar dataKey="value" fill="var(--color-career-primary)" barSize={20} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Skill Gaps Detected
            </h2>
            <div className="flex flex-wrap gap-2">
              {CANDIDATE_REPORT.missingSkills.map(skill => (
                <SkillBadge key={skill} skill={skill} type="missing" />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Database className="w-4 h-4 text-[var(--color-career-primary)]" />
              Verified Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {CANDIDATE_REPORT.currentSkills.map(skill => (
                <SkillBadge key={skill} skill={skill} type="current" />
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[var(--color-career-secondary)]" />
              Career Recommendations
            </h2>
            <ul className="space-y-3">
              {CANDIDATE_REPORT.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-[var(--color-career-text)] flex gap-3 bg-black/20 p-3 border-l-2 border-[var(--color-career-secondary)]">
                  <span className="text-[var(--color-career-secondary)] font-bold">{i+1}.</span> {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quick inline Database icon since it's not imported at the top
function Database(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>;
}
