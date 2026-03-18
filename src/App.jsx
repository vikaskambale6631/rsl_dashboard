import React, { useState, useMemo, useEffect } from 'react'
import LoginScreen from './components/auth/LoginScreen'
import LinkCard from './components/dashboard/LinkCard'
import initialData from './data/initialData.json'
import { Search, LogOut, ShieldCheck, Mail, FileSpreadsheet, Wrench, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const AUTH_KEY = 'rsl_auth_state';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [search, setSearch] = useState('');
  const [links, setLinks] = useState(initialData);

  useEffect(() => {
    const isAuth = sessionStorage.getItem(AUTH_KEY);
    if (isAuth === 'true') setIsAuthenticated(true);
  }, []);

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
    // Order them logically if possible or just sort
    return cats.sort();
  }, [links]);

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white selection:bg-primary/30 font-sans pb-20">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Premium RSL Watermark Background */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        {/* Subtle Dark to Transparent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-transparent to-[#0f172a] opacity-60 z-10"></div>
        
        {/* Logo with Blur and Low Opacity */}
        <div className="absolute inset-0 flex items-center justify-center sm:justify-end sm:pr-[10%] opacity-[0.05] filter blur-[4px]">
          <img 
            src="/logo.jpg" 
            alt="RSL Watermark" 
            className="w-[90%] max-w-[800px] object-contain grayscale scale-110"
          />
        </div>
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-4 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
               <span className="font-black text-xl">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black uppercase tracking-widest">RSL Solution</h1>
              <p className="text-[10px] text-slate-500 font-bold">Pvt Ltd • Link Hub</p>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-6 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text"
              placeholder="Quick Search (Title / Type)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-all text-sm placeholder:text-slate-600 font-medium"
            />
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors px-3 py-2 rounded-xl hover:bg-rose-500/10"
          >
            <LogOut size={20} />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-12 relative z-10">
        <div className="mb-12">
           <h2 className="text-4xl font-black tracking-tight mb-2">Welcome Back!</h2>
           <p className="text-slate-400 font-medium">Internal tools and resources for RSL Solution Private Limited.</p>
        </div>

        <div className="flex flex-col gap-16">
          {categories.map((category) => {
            const categoryLinks = filteredLinks.filter(l => l.category === category);
            if (categoryLinks.length === 0) return null;

            return (
              <section key={category} className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-black uppercase tracking-[0.2em] text-slate-500 pl-1">{category}</h3>
                  <div className="h-[1px] flex-1 bg-white/5"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence mode='popLayout'>
                    {categoryLinks.map((item) => (
                      <LinkCard key={item.id} item={item} onCopy={handleCopy} />
                    ))}
                  </AnimatePresence>
                </div>
              </section>
            );
          })}
        </div>

        {filteredLinks.length === 0 && (
          <div className="py-32 text-center glass-card rounded-[2.5rem] border-dashed border-2 border-white/5">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search size={40} className="text-slate-700" />
            </div>
            <h3 className="text-2xl font-bold text-slate-400">No links matched your search</h3>
            <p className="text-slate-500 mt-2 font-medium">Try different keywords or check out categories.</p>
          </div>
        )}
      </main>

      <footer className="mt-32 py-12 border-t border-white/5 text-center px-6">
         <div className="flex items-center justify-center gap-2 mb-4">
            <ShieldCheck className="text-primary" size={20} />
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">Secure Internal Access Only</span>
         </div>
         <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-loose">
           © 2026 RSL Solution Private Limited. All Rights Reserved. <span className="block sm:inline sm:ml-2 text-primary/50">• Developed by Vikas Kambale</span>
         </p>
      </footer>
    </div>
  )
}

export default App
