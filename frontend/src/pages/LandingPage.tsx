import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ScanText, BrainCircuit, Target, ArrowRight, Zap, TrendingUp, BarChart3, Briefcase } from 'lucide-react';

const LandingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const features = [
    { title: "OCR Resume Parsing", icon: ScanText, desc: "Extract structured data from any resume format with 84.6% accuracy." },
    { title: "Hire/Reject Prediction", icon: Target, desc: "Evaluate readiness and predict shortlisting probability." },
    { title: "Job Role Prediction", icon: Briefcase, desc: "Match candidates to their ideal career paths and roles." },
    { title: "Salary Forecasting", icon: TrendingUp, desc: "Estimate fair market compensation based on extracted attributes." },
    { title: "Skill Gap Detection", icon: Zap, desc: "Identify missing skills required for targeted roles." },
    { title: "Career Intelligence Reports", icon: BarChart3, desc: "Generate comprehensive actionable insights for every candidate." }
  ];

  const steps = [
    { num: "01", title: "Upload Resume", desc: "Drag and drop any PDF or image." },
    { num: "02", title: "OCR Extraction", desc: "Our engine digitizes the content." },
    { num: "03", title: "AI Analysis", desc: "Multiple ML models evaluate the profile." },
    { num: "04", title: "Intelligence Report", desc: "Review actionable workforce data." }
  ];

  const models = [
    { name: "Hire/Reject Prediction", accuracy: "94.2%", type: "Classification" },
    { name: "Job Role Prediction", accuracy: "84.6%", type: "Multi-Class" },
    { name: "Salary Prediction", accuracy: "R² 0.57", type: "Regression" },
    { name: "OCR Classification", accuracy: "84.6%", type: "Vision + NLP" }
  ];

  return (
    <div className="space-y-32 pb-24">
      {/* Hero Section */}
      <motion.section 
        className="pt-20 text-center max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-career-primary)]/10 border border-[var(--color-career-primary)]/30 text-[var(--color-career-primary)] text-xs font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          Enterprise Grade AI Models
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Transform Resumes into <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-career-primary)] to-[var(--color-career-primary-dark)]">Workforce Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-[var(--color-career-text-muted)] mb-10 max-w-3xl mx-auto leading-relaxed">
          CareerLens AI uses OCR, Machine Learning, and Predictive Analytics to evaluate candidates, predict hiring outcomes, estimate salaries, identify skill gaps, and generate career intelligence reports.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link 
            to="/analyzer" 
            className="flex items-center gap-2 bg-[var(--color-career-primary)] hover:bg-[var(--color-career-primary-dark)] text-black px-8 py-3.5 rounded-full font-medium text-lg transition-all hover:shadow-[0_0_20px_rgba(0,194,122,0.4)]"
          >
            Analyze Resume <ArrowRight className="w-5 h-5" />
          </Link>
          <a 
            href="#features" 
            className="flex items-center gap-2 bg-[#111614] hover:bg-[#1A221F] border border-[var(--color-career-border)] text-[var(--color-career-text)] px-8 py-3.5 rounded-full font-medium text-lg transition-colors"
          >
            View Platform
          </a>
        </div>

        {/* Animated Marketing Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {[
            "4 Integrated ML Models",
            "OCR + NLP Resume Processing",
            "Resume Intelligence Engine",
            "Hiring Probability Analysis",
            "Role & Salary Forecasting",
            "Workforce Intelligence Platform"
          ].map((badge, i) => (
            <motion.div 
              key={badge}
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: 0.6 + (i * 0.1), duration: 0.4 }} 
              className="flex items-center gap-2 text-sm font-medium text-[var(--color-career-text)] bg-[#111614]/80 border border-[var(--color-career-border)] px-4 py-2 rounded-full shadow-sm"
            >
              <div className="w-4 h-4 rounded-full bg-[var(--color-career-primary)]/20 flex items-center justify-center text-[var(--color-career-primary)]">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              {badge}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="pt-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Platform Features</h2>
          <p className="text-[var(--color-career-text-muted)]">A complete suite of AI tools for recruiters and hiring managers.</p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 30px -15px rgba(0,194,122,0.2)" }}
              className="p-8 rounded-2xl bg-[var(--color-career-panel)] border border-[var(--color-career-border)] flex flex-col items-start transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#00C27A]/10 flex items-center justify-center mb-6">
                <feature.icon className="w-6 h-6 text-[var(--color-career-primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-[var(--color-career-text-muted)] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">How It Works</h2>
          <p className="text-[var(--color-career-text-muted)]">Seamless pipeline from raw document to actionable intelligence.</p>
        </div>

        <motion.div 
          className="grid md:grid-cols-4 gap-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-12 right-12 h-0.5 bg-gradient-to-r from-[var(--color-career-border)] via-[var(--color-career-primary)]/30 to-[var(--color-career-border)] z-0" />
          
          {steps.map((step, i) => (
            <motion.div key={i} variants={itemVariants} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[var(--color-career-panel)] border-2 border-[var(--color-career-primary)] flex items-center justify-center text-xl font-bold text-[var(--color-career-primary)] text-mono mb-6 shadow-[0_0_20px_rgba(0,194,122,0.15)]">
                {step.num}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-[var(--color-career-text-muted)] text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Models Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Powered by Specialized Models</h2>
          <p className="text-[var(--color-career-text-muted)]">Purpose-built machine learning for talent acquisition.</p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {models.map((model, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="p-6 rounded-xl bg-[var(--color-career-panel)] border border-[var(--color-career-border)]"
            >
              <div className="text-xs font-semibold text-[var(--color-career-text-muted)] tracking-wider uppercase mb-2 flex justify-between items-center">
                {model.type}
                <BrainCircuit className="w-4 h-4 text-[var(--color-career-secondary)]" />
              </div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--color-career-text)]">{model.name}</h3>
              <div className="pt-4 border-t border-[var(--color-career-border)] flex justify-between items-end">
                <span className="text-sm text-[var(--color-career-text-muted)]">Performance</span>
                <span className="text-xl font-bold text-[var(--color-career-primary)] text-mono">{model.accuracy}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-20 text-center rounded-3xl bg-gradient-to-b from-[#111614] to-[#0A0C0B] border border-[var(--color-career-border)] relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-career-primary)]/10 blur-[100px] rounded-full" />
        
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight mb-6">Ready to upgrade your hiring?</h2>
          <p className="text-lg text-[var(--color-career-text-muted)] mb-10">
            Upload a resume and generate a complete career intelligence report in seconds.
          </p>
          <Link 
            to="/analyzer" 
            className="inline-flex items-center gap-2 bg-[var(--color-career-text)] hover:bg-white text-black px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105"
          >
            Start Analyzing <Sparkles className="w-5 h-5" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
