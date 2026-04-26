import React, { useState, useRef } from 'react';
import { ExternalLink, Copy, Star, Mail, Link as LinkIcon, FileSpreadsheet, Wrench } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'Sheet': return <FileSpreadsheet size={20} className="text-emerald-500" />;
    case 'Email': return <Mail size={20} className="text-sky-500" />;
    case 'Tool': return <Wrench size={20} className="text-amber-500" />;
    default: return <LinkIcon size={20} className="text-slate-500" />;
  }
};

const LinkCard = ({ item, onCopy, theme }) => {
  const isEmail = item.type === 'Email';
  const isDownload = item.url.endsWith('.exe');
  const buttonText = isEmail ? 'Send Email' : (isDownload ? 'Download Tool' : 'Open Link');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX);
  const mouseYSpring = useSpring(mouseY);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // For 3D Tilt
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);

    // For Mouse-Following Glow
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        translateZ: 20,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
      className="glass-card group relative p-8 rounded-3xl flex flex-col gap-6 transition-all duration-300 shadow-xl overflow-hidden hover:border-primary/40 h-full"
    >
      {/* Mouse-Following Border Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(var(--primary-rgb), 0.15), transparent 80%)`,
        }}
      />

      {/* Official Layout Elements */}
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="flex justify-between items-start relative z-10 flex-1"
      >
        <div className="flex items-center gap-5">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-[var(--border)] shadow-sm group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
            <TypeIcon type={item.type} />
          </div>
          <div>
            <h3 className="font-extrabold text-xl tracking-tight text-[var(--text)] transition-colors duration-300 group-hover:text-primary">{item.title}</h3>
            <div className="flex items-center gap-2.5 mt-1.5">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{item.type}</span>
              <div className="w-1 h-1 rounded-full bg-slate-700"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">{item.category}</span>
            </div>
          </div>
        </div>
        {item.isFavorite && (
          <Star size={18} fill="var(--star-fill)" className="text-[var(--star-text)] opacity-80 filter drop-shadow-[0_0_8px_var(--star-fill)]" />
        )}
      </div>

      <div style={{ transform: "translateZ(60px)" }} className="mt-auto flex items-center gap-3 relative z-10">
        <a 
          href={item.url}
          target={isEmail ? "_self" : "_blank"}
          rel="noopener noreferrer"
          download={isDownload}
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-3 rounded-xl text-sm font-bold transition-all shadow-lg active:scale-[0.98] hover:shadow-primary/20"
        >
          {isEmail ? <Mail size={16} /> : (isDownload ? <Wrench size={16} /> : <ExternalLink size={16} />)}
          <span>{buttonText}</span>
        </a>
        <button 
          onClick={() => onCopy(item.url)}
          className="p-3 rounded-xl bg-white/5 border border-[var(--border)] text-slate-500 hover:text-[var(--text)] hover:bg-white/10 transition-all hover:border-primary/30"
          title="Copy Link"
        >
          <Copy size={20} />
        </button>
      </div>

      {/* Glossy Reflection Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    </motion.div>
  );
};

export default LinkCard;
