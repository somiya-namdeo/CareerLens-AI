import React from 'react';
import { MODELS_DATA } from '../../data/mockData';
import clsx from 'clsx';

const ComparisonTable: React.FC = () => {
  return (
    <div className="w-full">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-career-border)] text-[10px] uppercase tracking-widest text-[var(--color-career-text-muted)] font-bold">
            <th className="py-4 px-2">Model Name</th>
            <th className="py-4 px-2">Algorithm</th>
            <th className="py-4 px-2 text-right">Accuracy / Metric</th>
            <th className="py-4 px-2 text-right">F1 Score</th>
            <th className="py-4 px-2 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {MODELS_DATA.map((model, i) => (
            <tr key={i} className="border-b border-[var(--color-career-border)] hover:bg-[#1A221F]/50 transition-colors group">
              <td className="py-4 px-2 font-semibold text-[var(--color-career-text)] group-hover:text-[var(--color-career-primary)] transition-colors">{model.name}</td>
              <td className="py-4 px-2 text-mono text-[var(--color-career-text-muted)] text-xs">{model.algorithm}</td>
              <td className="py-4 px-2 text-right text-mono font-bold text-[var(--color-career-text)]">
                {model.metricType === 'R2' ? `R² ${model.accuracy.toFixed(2)}` : `${(model.accuracy * 100).toFixed(1)}%`}
              </td>
              <td className="py-4 px-2 text-right text-mono text-[var(--color-career-text-muted)]">
                {model.f1 ? model.f1.toFixed(2) : '-'}
              </td>
              <td className="py-4 px-2 text-right flex justify-end items-center h-full pt-4">
                <span className={clsx(
                  "px-3 py-1 text-[10px] font-bold rounded uppercase tracking-wider",
                  model.status === 'Active' 
                    ? "bg-[var(--color-career-primary)]/10 text-[var(--color-career-primary)] border border-[var(--color-career-primary)]/30" 
                    : "bg-[#111614] text-[var(--color-career-text-muted)] border border-[var(--color-career-border)]"
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
