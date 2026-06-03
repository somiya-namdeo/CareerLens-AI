import { Link, useLocation } from 'react-router-dom';
import { Activity, FileText, BarChart2, Cpu } from 'lucide-react';
import clsx from 'clsx';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Command Center', icon: Activity },
    { path: '/workspace', label: 'Resume Workspace', icon: FileText },
    { path: '/report', label: 'Intelligence Report', icon: BarChart2 },
    { path: '/models', label: 'Model Center', icon: Cpu },
  ];

  return (
    <aside className="w-64 border-r border-[var(--color-career-border)] panel flex flex-col h-full">
      <div className="p-6 border-b border-[var(--color-career-border)]">
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-career-text)] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-career-primary)]"></div>
          CAREERLENS<span className="text-[var(--color-career-primary)]">.AI</span>
        </h1>
        <div className="mt-2 text-xs text-mono text-[var(--color-career-text-muted)] uppercase tracking-wider">
          Workforce Intelligence
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors duration-200 border-l-2',
                isActive 
                  ? 'border-[var(--color-career-primary)] bg-[#00C27A]/10 text-[var(--color-career-primary)]' 
                  : 'border-transparent text-[var(--color-career-text-muted)] hover:bg-white/5 hover:text-[var(--color-career-text)]'
              )}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--color-career-border)]">
        <div className="flex items-center gap-3 text-xs text-mono text-[var(--color-career-text-muted)]">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          System Status: Online
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
