import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  Star, 
  History, 
  ChevronLeft, 
  Menu,
  LogOut,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, active, collapsed }) => (
  <motion.div
    whileHover={{ x: 4 }}
    className={cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group",
      active 
        ? "bg-primary/20 text-primary border border-primary/20" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    )}
  >
    <Icon size={20} className={cn(active ? "text-primary" : "group-hover:text-primary")} />
    <AnimatePresence>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="font-medium whitespace-nowrap"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.div>
);

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 260 }}
      className="h-screen glass border-r border-white/10 flex flex-col p-4 sticky top-0 left-0 z-50 shrink-0"
    >
      <div className="flex items-center justify-between mb-10 px-2">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <span className="font-bold text-lg">R</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight">RSL Solution</span>
              <span className="text-[10px] text-slate-500 font-medium">Pvt Ltd</span>
            </div>
          </motion.div>
        )}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" active collapsed={collapsed} />
        <SidebarItem icon={Building2} label="Companies" collapsed={collapsed} />
        <SidebarItem icon={Star} label="Favorites" collapsed={collapsed} />
        <SidebarItem icon={History} label="Recent Activity" collapsed={collapsed} />
      </nav>

      <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
        <SidebarItem icon={Settings} label="Settings" collapsed={collapsed} />
        <SidebarItem icon={LogOut} label="Logout" collapsed={collapsed} />
      </div>
    </motion.div>
  );
};

export default Sidebar;
