import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Lock, ShieldCheck, AlertCircle, ArrowRight, Sun, Moon } from 'lucide-react';

const LoginScreen = ({ onLogin, theme, toggleTheme }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      if (password === 'Rsl@1212') {
        onLogin();
      } else {
        setError('Authorization failed. Access denied.');
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden selection:bg-primary/30 transition-colors duration-500">
      {/* Powerful Always-On Animations */}
      <div className="starfield" />
      
      {/* Theme Toggle in Login */}
      <div className="absolute top-8 right-8 z-50">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text)] hover:bg-white/10 transition-colors shadow-lg backdrop-blur-md"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[150px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card w-full max-w-lg rounded-[2.5rem] p-12 relative z-10 overflow-hidden shadow-2xl"
      >
        {/* Card Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        <div style={{ transform: "translateZ(60px)" }} className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center mb-8 shadow-xl border border-[var(--border)] group animate-float">
             <img src="/rsllogo.png" alt="RSL Logo" className="w-16 h-16 object-contain p-1" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter mb-3 bg-gradient-to-br from-[var(--text)] to-[var(--text)]/60 bg-clip-text text-transparent">
            System Access
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">
            RSL Solution Private Limited Link Hub
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8" style={{ transform: "translateZ(40px)" }}>
          <div className="flex flex-col gap-3">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] px-2 flex justify-between items-center">
               <span>Access Credentials</span>
               <span className="text-primary/40">Secure Node 12</span>
             </label>
             <div className="relative">
                <input 
                  type="password"
                  placeholder="AUTHORIZATION KEY"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-[var(--border)] rounded-2xl py-5 px-6 focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-800 font-black tracking-[0.5em] text-center text-lg backdrop-blur-md text-[var(--text)]"
                  autoFocus
                />
                <ShieldCheck className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
             </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-3 text-rose-500 text-xs font-black uppercase tracking-widest bg-rose-500/10 p-4 rounded-2xl border border-rose-500/20 shadow-lg"
              >
                <AlertCircle size={18} />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-white font-black py-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-4 group active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="tracking-[0.2em] uppercase text-sm">Initialize Session</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div style={{ transform: "translateZ(20px)" }} className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col items-center gap-4 text-center">
           <div className="flex items-center gap-3">
             <div className="h-[1px] w-12 bg-[var(--border)]" />
             <Lock className="text-slate-500" size={12} />
             <div className="h-[1px] w-12 bg-[var(--border)]" />
           </div>
           <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.3em]">
             Authorized Personnel Only <br />
             <span className="text-primary/40 mt-1 block">RSL Internal Secure Network</span>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;


