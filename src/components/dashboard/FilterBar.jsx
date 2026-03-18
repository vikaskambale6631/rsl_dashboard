import React from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';

const FilterBar = ({ filters, setFilters, techStacks, locations }) => {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
      <div className="flex items-center gap-2 text-slate-400 mr-2">
        <Filter size={18} />
        <span className="text-sm font-medium uppercase tracking-wider">Filters</span>
      </div>

      <div className="flex flex-wrap gap-2 flex-1">
        {/* Tech Stack Filter */}
        <div className="relative group">
          <select 
            value={filters.techStack}
            onChange={(e) => setFilters({ ...filters, techStack: e.target.value })}
            className="appearance-none bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer pr-10 min-w-[140px]"
          >
            <option value="">All Tech Stacks</option>
            {techStacks.map(tech => <option key={tech} value={tech}>{tech}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
        </div>

        {/* Location Filter */}
        <div className="relative group">
          <select 
            value={filters.location}
            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            className="appearance-none bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer pr-10 min-w-[140px]"
          >
            <option value="">All Locations</option>
            {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
        </div>

        {/* Status Filter */}
        <div className="relative group">
          <select 
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="appearance-none bg-[#1e293b]/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer pr-10 min-w-[140px]"
          >
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={16} />
        </div>
      </div>

      {(filters.techStack || filters.location || filters.status) && (
        <button 
          onClick={() => setFilters({ techStack: '', location: '', status: '', search: filters.search })}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-colors px-2 py-1"
        >
          <X size={14} />
          Clear All
        </button>
      )}
    </div>
  );
};

export default FilterBar;
