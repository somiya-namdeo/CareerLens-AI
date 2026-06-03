import { Bell, Search, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="h-16 border-b border-[var(--color-career-border)] panel flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-career-text-muted)]" />
          <input 
            type="text" 
            placeholder="Search resumes, models, or candidates..." 
            className="pl-10 pr-4 py-1.5 bg-black/30 border border-[var(--color-career-border)] text-sm rounded-sm focus:outline-none focus:border-[var(--color-career-primary)] transition-colors w-72 text-[var(--color-career-text)] placeholder-[var(--color-career-text-muted)]"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 border-r border-[var(--color-career-border)] pr-4">
          <div className="text-right">
            <div className="text-xs text-[var(--color-career-text-muted)]">Active Models</div>
            <div className="text-sm font-medium text-mono text-[var(--color-career-primary)]">4/4 Online</div>
          </div>
        </div>
        
        <button className="text-[var(--color-career-text-muted)] hover:text-[var(--color-career-text)] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[var(--color-career-secondary)] border border-[var(--color-career-panel)]"></span>
        </button>
        <button className="text-[var(--color-career-text-muted)] hover:text-[var(--color-career-text)] transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        
        <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[var(--color-career-primary-dark)] to-black border border-[var(--color-career-primary)] flex items-center justify-center font-bold text-xs ml-2 cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
