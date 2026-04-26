import React, { useState, useEffect, useMemo } from 'react';
import { Search, LogOut, ShieldCheck, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import initialData from './data/initialData.json';
import LinkCard from './components/dashboard/LinkCard';
import LoginScreen from './components/auth/LoginScreen';

const AUTH_KEY = 'rsl_dashboard_auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  const [links, setLinks] = useState(initialData);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('rsl_theme') || 'dark';
  });

  useEffect(() => {
    const isAuth = sessionStorage.getItem(AUTH_KEY);
    if (isAuth === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light' : '';
    localStorage.setItem('rsl_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleLogin = () => {
    sessionStorage.setItem(AUTH_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const filteredLinks = useMemo(() => {
    return links.filter(link => 
      link.title.toLowerCase().includes(search.toLowerCase()) || 
      link.type.toLowerCase().includes(search.toLowerCase()) ||
      link.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, links]);

  const categories = useMemo(() => {
    const cats = [...new Set(links.map(l => l.category))];
    return cats.sort();
  }, [links]);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <div className="min-h-screen selection:bg-primary/30 font-sans pb-32 overflow-x-hidden transition-colors duration-500">
      {/* Powerful Always-On Animations */}
      <div className="starfield" />
      
      {/* 3D Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -60, 0], y: [0, 80, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]"
        />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[var(--bg)]/80 border-b border-[var(--border)] px-6 py-4 backdrop-blur-2xl transition-all duration-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center overflow-hidden shadow-xl border border-primary/10 backdrop-blur-md">
               <img 
                 src="/rsllogo.png" 
                 alt="RSL Logo" 
                 className="w-full h-full object-contain p-2"
               />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-black uppercase tracking-[0.25em] text-[var(--text)] leading-none mb-1">RSL Solution</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Internal Link Gateway</p>
            </div>
          </motion.div>

          <div className="flex-1 max-w-lg relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Search internal resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-[var(--border)] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/40 transition-all text-sm font-bold placeholder:text-slate-600 backdrop-blur-md text-[var(--text)]"
            />
          </div>

          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-white/5 border border-[var(--border)] text-[var(--text)] hover:bg-white/10 transition-colors shadow-lg"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={handleLogout}
              className="flex items-center gap-2 text-slate-500 hover:text-rose-500 transition-all px-4 py-2 rounded-lg border border-transparent hover:border-rose-500/10 hover:bg-rose-500/5"
            >
              <LogOut size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Sign Out</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24"
        >
           <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-[var(--text)]">
             Authorized Access Hub
           </h2>
           <div className="flex items-center gap-3 text-slate-500 font-bold uppercase tracking-[0.15em] text-[10px]">
              <ShieldCheck size={14} className="text-primary" />
              <span>RSL Solution Pvt Ltd • Secure Internal Environment</span>
           </div>
        </motion.div>

        <div className="flex flex-col gap-24">
          {categories.map((category, catIdx) => {
            const categoryLinks = filteredLinks.filter(l => l.category === category);
            if (categoryLinks.length === 0) return null;

            return (
              <motion.section 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: catIdx * 0.1 }}
                className="flex flex-col gap-10"
              >
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-primary to-accent rounded-full" />
                    <h3 className="text-2xl font-black uppercase tracking-[0.25em] text-[var(--text)]/90">{category}</h3>
                  </div>
                  <div className="h-[1px] flex-1 bg-[var(--border)]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <AnimatePresence mode='popLayout'>
                    {categoryLinks.map((item, idx) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="h-full"
                      >
                        <LinkCard item={item} onCopy={handleCopy} theme={theme} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.section>
            );
          })}
        </div>

        {filteredLinks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center glass-card rounded-3xl"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse-slow">
              <Search size={48} className="text-slate-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-400 tracking-tight text-[var(--text)]">No Matching Resources</h3>
            <p className="text-slate-500 mt-3 font-bold uppercase tracking-widest text-xs">Try adjust your filters or keywords</p>
          </motion.div>
        )}
      </main>

      <footer className="mt-40 py-20 border-t border-[var(--border)] relative">
         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8 text-[var(--text)]">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-[var(--border)] backdrop-blur-md shadow-lg">
               <ShieldCheck className="text-primary" size={20} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Secure Internal Network Access Only</span>
            </div>
            
            <div className="text-center">
              <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                © 2026 RSL Solution Private Limited
              </p>
              <div className="flex items-center justify-center gap-3">
                 <div className="h-[1px] w-8 bg-[var(--border)]" />
                 <span className="text-primary/50 text-[10px] font-black uppercase tracking-[0.2em]">Designed & Developed by Vikas Kambale</span>
                 <div className="h-[1px] w-8 bg-[var(--border)]" />
              </div>
            </div>
         </div>
      </footer>
    </div>
  );
}

export default App;
