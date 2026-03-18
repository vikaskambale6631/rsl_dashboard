import React from 'react';
import { Search, Bell, Sun, Moon, User } from 'lucide-react';

const Navbar = ({ theme, setTheme }) => {
  return (
    <div className="h-20 glass border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-2xl relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Global Search (Ctrl + K)"
          className="w-full h-11 bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all transform hover:scale-110 active:scale-95 border border-transparent hover:border-white/5"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all transform hover:scale-110 active:scale-95 relative border border-transparent hover:border-white/5">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-[#0f172a]"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-[10px] text-slate-500 font-medium">RSL Solution</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-400 flex items-center justify-center border-2 border-white/10 shadow-lg cursor-pointer transform hover:scale-105 transition-transform">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
