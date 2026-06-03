import ComparisonTable from '../components/ui/ComparisonTable';
import { Cpu, Network, Binary, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const performanceData = [
  { epoch: 1, val_loss: 0.8, train_loss: 0.9 },
  { epoch: 2, val_loss: 0.6, train_loss: 0.7 },
  { epoch: 3, val_loss: 0.45, train_loss: 0.5 },
  { epoch: 4, val_loss: 0.35, train_loss: 0.38 },
  { epoch: 5, val_loss: 0.28, train_loss: 0.3 },
  { epoch: 6, val_loss: 0.25, train_loss: 0.25 },
  { epoch: 7, val_loss: 0.22, train_loss: 0.2 },
];

export default function ModelCenter() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-career-text)]">Model Center</h1>
        <p className="text-[var(--color-career-text-muted)] text-sm mt-1">Machine Learning Production Models Monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Hire/Reject Model", acc: "92.4%", icon: Binary },
          { title: "Job Role Predictor", acc: "94.1%", icon: Network },
          { title: "Salary Estimator", acc: "88.2%", icon: Cpu },
          { title: "OCR Classification", acc: "96.5%", icon: CheckCircle2 },
        ].map((m, i) => (
          <div key={i} className="panel p-5 border-t-2 border-t-[var(--color-career-primary)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-[var(--color-career-text)]">{m.title}</h3>
              <m.icon className="w-4 h-4 text-[var(--color-career-text-muted)]" />
            </div>
            <div className="text-2xl font-bold text-mono text-[var(--color-career-text)]">{m.acc}</div>
            <div className="text-xs text-[var(--color-career-text-muted)] mt-1">Production Accuracy</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 panel p-6">
          <h2 className="text-lg font-semibold text-[var(--color-career-text)] mb-6 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--color-career-primary)]"></div>
            Model Comparison
          </h2>
          <ComparisonTable />
        </div>

        <div className="panel p-6">
          <h2 className="text-sm font-semibold text-[var(--color-career-text-muted)] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Network className="w-4 h-4 text-[var(--color-career-primary)]" />
            Training Performance
          </h2>
          <div className="h-[250px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTrain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-career-primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-career-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-career-secondary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--color-career-secondary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-career-border)" vertical={false} />
                <XAxis dataKey="epoch" stroke="var(--color-career-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-career-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-career-panel)', borderColor: 'var(--color-career-border)', borderRadius: '4px' }}
                  itemStyle={{ color: 'var(--color-career-text)' }}
                />
                <Area type="monotone" dataKey="train_loss" stroke="var(--color-career-primary)" fillOpacity={1} fill="url(#colorTrain)" />
                <Area type="monotone" dataKey="val_loss" stroke="var(--color-career-secondary)" fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-career-primary)]"></div>
              <span className="text-xs text-[var(--color-career-text-muted)]">Train Loss</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--color-career-secondary)]"></div>
              <span className="text-xs text-[var(--color-career-text-muted)]">Val Loss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
