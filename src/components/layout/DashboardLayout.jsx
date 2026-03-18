import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white selection:bg-primary/30">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Navbar theme={theme} setTheme={setTheme} />
        
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>

        {/* Background Decorative Elements */}
        <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        <div className="fixed bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
