import React from 'react';
import { MODELS_DATA } from '../../data/mockData';
import clsx from 'clsx';

const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-career-border)] text-xs uppercase tracking-wider text-[var(--color-career-text-muted)] font-semibold">
            <th className="p-4 pl-0">Model Name</th>
            <th className="p-4">Algorithm</th>
            <th className="p-4 text-right">Accuracy</th>
            <th className="p-4 text-right">F1 Score</th>
            <th className="p-4 text-right pr-0">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MODELS_DATA.map((model, i) => (
            <tr key={i} className="border-b border-[var(--color-career-border)] hover:bg-white/5 transition-colors">
              <td className="p-4 pl-0 font-medium text-[var(--color-career-text)]">{model.name}</td>
              <td className="p-4 text-mono text-[var(--color-career-text-muted)]">{model.algorithm}</td>
              <td className="p-4 text-right text-mono font-medium text-[var(--color-career-primary)]">{(model.accuracy * 100).toFixed(1)}%</td>
              <td className="p-4 text-right text-mono text-[var(--color-career-text-muted)]">{model.f1.toFixed(2)}</td>
              <td className="p-4 text-right pr-0">
                <span className={clsx(
                  "px-2 py-1 text-xs font-medium rounded-sm border",
                  model.status === 'Active' ? "bg-[#00C27A]/10 border-[var(--color-career-primary)] text-[var(--color-career-primary)]" : "bg-black/20 border-[var(--color-career-border)] text-[var(--color-career-text-muted)]"
                )}>
                  {model.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
