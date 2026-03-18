import React from 'react';
import { ExternalLink, Copy, Star, Mail, Link as LinkIcon, FileSpreadsheet, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const TypeIcon = ({ type }) => {
  switch (type) {
    case 'Sheet': return <FileSpreadsheet size={18} className="text-emerald-500" />;
    case 'Email': return <Mail size={18} className="text-sky-500" />;
    case 'Tool': return <Wrench size={18} className="text-amber-500" />;
    default: return <LinkIcon size={18} className="text-slate-400" />;
  }
};

const LinkCard = ({ item, onCopy }) => {
  const isEmail = item.type === 'Email';

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      className="glass-card rounded-[1.5rem] p-6 flex flex-col gap-4 border border-white/5 hover:border-primary/40 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/10 transition-colors">
            <TypeIcon type={item.type} />
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.type}</span>
          </div>
        </div>
        {item.isFavorite && (
          <Star size={16} fill="#fbbf24" className="text-[#fbbf24]" />
        )}
      </div>

      {item.description && (
        <p className="text-sm text-slate-400 line-clamp-2 font-medium leading-relaxed">{item.description}</p>
      )}

      <div className="mt-4 flex items-center gap-2 pt-4 border-t border-white/5">
        <a 
          href={item.url}
          target={isEmail ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
        >
          {isEmail ? <Mail size={14} /> : <ExternalLink size={14} />}
          <span>{isEmail ? 'Send Email' : 'Open Link'}</span>
        </a>
        <button 
          onClick={() => onCopy(item.url)}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5 hover:border-white/10 transition-all"
          title="Copy Link"
        >
          <Copy size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default LinkCard;
