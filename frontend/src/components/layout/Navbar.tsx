import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import logoUrl from '../../assets/logo/careerlens-logo.png';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/analyzer', label: 'Resume Analyzer' },
    { path: '/results', label: 'Results' },
    { path: '/insights', label: 'Model Insights' },
  ];

  return (
    <header className="h-16 border-b border-[var(--color-career-border)] bg-[var(--color-career-panel)]/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-6 lg:px-12">
      <Link to="/" className="flex items-center gap-3 md:gap-4 group">
        <motion.img 
          src={logoUrl} 
          alt="CareerLens AI Logo" 
          className="h-8 md:h-12 w-auto object-contain transition-all duration-300" 
          whileHover={{ filter: "drop-shadow(0 0 12px rgba(0, 194, 122, 0.4))" }}
        />
        <span className="font-bold tracking-tight text-xl md:text-2xl flex items-center gap-1.5">
          <span className="text-white">CareerLens</span>
          <span className="text-[var(--color-career-primary)]">AI</span>
        </span>
      </Link>

      <nav className="hidden md:flex items-center gap-1 bg-[#0A0C0B] p-1 rounded-full border border-[var(--color-career-border)]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-[#111614] border border-[var(--color-career-border)] rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className={clsx(
                "relative z-10 transition-colors",
                isActive ? "text-[var(--color-career-text)]" : "text-[var(--color-career-text-muted)] hover:text-[var(--color-career-text)]"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        <Link 
          to="/analyzer" 
          className="flex items-center gap-2 bg-[var(--color-career-primary)] hover:bg-[var(--color-career-primary-dark)] text-black px-4 py-2 rounded-full font-medium text-sm transition-all hover:shadow-[0_0_15px_rgba(0,194,122,0.3)]"
        >
          <Sparkles className="w-4 h-4" />
          Analyze Resume
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
