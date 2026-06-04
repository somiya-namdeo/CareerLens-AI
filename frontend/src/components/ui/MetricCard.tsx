import React from 'react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon: Icon, trend, trendUp }) => {
  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,194,122,0.15)" }}
      className="bg-[var(--color-career-panel)] p-6 rounded-2xl border border-[var(--color-career-border)] flex flex-col gap-4 shadow-lg transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-career-text-muted)]">{title}</span>
        <div className="w-8 h-8 rounded-full bg-[#0A0C0B] border border-[var(--color-career-border)] flex items-center justify-center">
          <Icon className="w-4 h-4 text-[var(--color-career-primary)]" />
        </div>
      </div>
      <div className="text-4xl font-bold tracking-tight text-[var(--color-career-text)]">
        {value}
      </div>
      {trend && (
        <div className={clsx(
          "text-xs font-medium flex items-center gap-1",
          trendUp ? "text-[var(--color-career-primary)]" : "text-rose-500"
        )}>
          {trendUp ? '↑' : '↓'} {trend}
        </div>
      )}
    </motion.div>
  );
};

export default MetricCard;
