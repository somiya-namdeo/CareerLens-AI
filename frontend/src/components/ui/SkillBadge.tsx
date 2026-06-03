import React from 'react';
import clsx from 'clsx';

interface SkillBadgeProps {
  skill: string;
  type: 'current' | 'missing' | 'recommended';
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, type }) => {
  return (
    <span className={clsx(
      "px-3 py-1 text-xs font-medium border rounded-sm tracking-wide text-mono",
      type === 'current' ? "bg-[#00C27A]/10 border-[var(--color-career-primary)] text-[var(--color-career-primary)]" :
      type === 'missing' ? "bg-rose-500/10 border-rose-500/50 text-rose-400" :
      "bg-[#D4A017]/10 border-[var(--color-career-secondary)] text-[var(--color-career-secondary)]"
    )}>
      {skill}
    </span>
  );
};

export default SkillBadge;
