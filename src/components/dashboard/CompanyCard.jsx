import React from 'react';
import { ExternalLink, Copy, Star, MoreVertical, MapPin, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusBadge = ({ status }) => {
  const colors = {
    'Active': 'bg-accent/10 text-accent border-accent/20',
    'Pending': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    'Completed': 'bg-blue-500/10 text-blue-500 border-blue-500/20'
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${colors[status] || 'bg-slate-500/10 text-slate-500'}`}>
      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 ${status === 'Active' ? 'bg-accent animate-pulse' : ''} ${status === 'Pending' ? 'bg-amber-500' : ''} ${status === 'Completed' ? 'bg-blue-500' : ''}`}></span>
      {status}
    </span>
  );
};

const CompanyCard = ({ company, onToggleFavorite, onDetails, onCopy }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="glass-card rounded-2xl p-6 flex flex-col gap-5 relative overflow-hidden group border border-white/5 hover:border-primary/30 transition-all duration-300"
    >
      {/* Glow Effect on Hover */}
      <div className="absolute -top-[100px] -right-[100px] w-[200px] h-[200px] bg-primary/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <StatusBadge status={company.status} />
          <h3 className="text-xl font-bold mt-2 truncate max-w-[180px] tracking-tight group-hover:text-primary transition-colors">{company.name}</h3>
        </div>
        <div className="flex gap-1">
          <button 
            onClick={() => onToggleFavorite(company.id)}
            className={`p-2 rounded-xl transition-all ${company.isFavorite ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' : 'text-slate-500 hover:text-white bg-white/5 border-white/5 hover:border-white/10'}`}
          >
            <Star size={18} fill={company.isFavorite ? "currentColor" : "none"} />
          </button>
          <button className="p-2 rounded-xl text-slate-500 hover:text-white bg-white/5 border-white/5 hover:border-white/10 transition-all">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-slate-400">
          <Code2 size={16} className="text-primary/70" />
          <div className="flex gap-1 flex-wrap">
            {company.techStack.map((tech, i) => (
              <span key={i} className="text-xs font-medium bg-white/5 px-2 py-0.5 rounded-md border border-white/5">{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <MapPin size={16} className="text-primary/70" />
          <span className="text-xs font-medium truncate">{company.location}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 mt-auto flex items-center justify-between gap-3">
        <div className="flex gap-2">
          <a 
            href={company.sheetUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-all"
          >
            <ExternalLink size={14} />
            Open Sheet
          </a>
          <button 
            onClick={() => onCopy(company.sheetUrl)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-all"
            title="Copy Link"
          >
            <Copy size={16} />
          </button>
        </div>
        <button 
          onClick={() => onDetails(company)}
          className="text-xs font-bold text-primary hover:text-primary/80 transition-colors uppercase tracking-widest"
        >
          Details
        </button>
      </div>

      {/* Decorative Gradient Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
};

export default CompanyCard;
