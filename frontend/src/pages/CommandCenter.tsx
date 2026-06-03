import React from 'react';
import MetricCard from '../components/ui/MetricCard';
import { Activity, Users, Clock, Cpu, ArrowRight } from 'lucide-react';
import { SYSTEM_METRICS, PIPELINE_STEPS } from '../data/mockData';
import clsx from 'clsx';

export default function CommandCenter() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-career-text)]">Command Center</h1>
        <p className="text-[var(--color-career-text-muted)] text-sm mt-1">System Health & Intelligence Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Resumes Processed" 
          value={SYSTEM_METRICS.totalProcessed} 
          icon={Users} 
          trend="12% this week" 
          trendUp={true} 
        />
        <MetricCard 
          title="Avg Hiring Readiness" 
          value={SYSTEM_METRICS.hiringReadiness} 
          icon={Activity} 
          trend="4% this month" 
          trendUp={true}
        />
        <MetricCard 
          title="Processing Speed" 
          value={SYSTEM_METRICS.avgProcessingTime} 
          icon={Clock} 
          trend="0.1s improvement" 
          trendUp={true}
        />
        <MetricCard 
          title="Active Models" 
          value={`${SYSTEM_METRICS.modelsOnline} / 4`} 
          icon={Cpu} 
          trend="All systems nominal" 
          trendUp={true}
        />
      </div>

      <div className="panel p-6">
        <h2 className="text-lg font-semibold text-[var(--color-career-text)] mb-6 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-career-secondary)]"></div>
          Resume Processing Pipeline
        </h2>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-x-auto pb-4">
          {PIPELINE_STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-3 min-w-24">
                <div className={clsx(
                  "w-10 h-10 rounded flex items-center justify-center border text-sm font-bold text-mono transition-colors",
                  step.status === 'completed' 
                    ? "bg-[#00C27A]/10 border-[var(--color-career-primary)] text-[var(--color-career-primary)]" 
                    : step.status === 'processing'
                    ? "bg-[#D4A017]/10 border-[var(--color-career-secondary)] text-[var(--color-career-secondary)] shadow-[0_0_15px_rgba(212,160,23,0.2)]"
                    : "bg-black/20 border-[var(--color-career-border)] text-[var(--color-career-text-muted)]"
                )}>
                  {index + 1}
                </div>
                <div className="text-xs text-center font-medium text-[var(--color-career-text-muted)] max-w-24 leading-tight">
                  {step.label}
                </div>
              </div>
              
              {index < PIPELINE_STEPS.length - 1 && (
                <ArrowRight className="w-4 h-4 text-[var(--color-career-border)] hidden md:block mt-[-20px]" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
