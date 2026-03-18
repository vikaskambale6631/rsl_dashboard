import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, AlertCircle, ArrowRight } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Simulate a small delay for premium feel
    setTimeout(() => {
      if (password === 'Rsl@1212') {
        onLogin();
      } else {
        setError('Invalid password. Please try again.');
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] -z-10"></div>

      {/* Premium RSL Watermark Background */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a] opacity-60 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] filter blur-[4px]">
          <img 
            src="/logo.jpg" 
            alt="RSL Watermark" 
            className="w-[90%] max-w-[700px] object-contain grayscale scale-105"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card w-full max-w-md rounded-[2.5rem] p-10 border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.5)] relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
             <Lock className="text-primary" size={36} />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">Secure Access</h1>
          <p className="text-slate-400 font-medium">Internal Link Hub for <span className="text-white">RSL Solution</span></p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Developer Authorization</label>
             <div className="relative group">
                <input 
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-4 pr-12 focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-700 font-bold tracking-widest text-center"
                  autoFocus
                />
                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={20} />
             </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-rose-500 text-sm font-bold bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"
              >
                <AlertCircle size={16} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl transition-all shadow-[0_8px_30px_rgba(99,102,241,0.4)] flex items-center justify-center gap-3 transform active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
           © 2026 RSL Solution Private Limited <br />
           <span className="text-primary/50">Developed by Vikas Kambale</span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
