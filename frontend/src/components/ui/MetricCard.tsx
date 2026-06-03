import React from 'react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <div className="panel p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--color-career-text-muted)]">{title}</span>
        <Icon className="w-5 h-5 text-[var(--color-career-primary)] opacity-80" />
      </div>
      <div className="text-3xl font-bold tracking-tight text-mono text-[var(--color-career-text)]">
        {value}
      </div>
      {trend && (
        <div className={clsx(
          "text-xs text-mono",
          trendUp ? "text-[var(--color-career-primary)]" : "text-rose-500"
        )}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
