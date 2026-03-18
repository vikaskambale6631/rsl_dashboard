import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, AlertCircle } from 'lucide-react';

const AddCompanyModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [formData, setFormData] = React.useState(initialData || {
    name: '',
    sheetUrl: '',
    techStack: '',
    location: '',
    status: 'Active',
    notes: ''
  });

  React.useEffect(() => {
    if (initialData) setFormData(initialData);
    else setFormData({ name: '', sheetUrl: '', techStack: '', location: '', status: 'Active', notes: '' });
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = {
      ...formData,
      id: initialData?.id || Date.now().toString(),
      techStack: typeof formData.techStack === 'string' ? formData.techStack.split(',').map(s => s.trim()) : formData.techStack,
      isFavorite: initialData?.isFavorite || false,
      lastOpened: new Date().toISOString()
    };
    onSave(company);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            layoutId="add-company-modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass-card w-full max-w-xl rounded-[2rem] p-8 relative z-10 border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[80px] -z-10"></div>
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight">{initialData ? 'Edit Company' : 'Add New Company'}</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Company Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600"
                    placeholder="e.g. Google"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Location</label>
                  <input 
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600"
                    placeholder="e.g. Hyderabad, India"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Google Sheet URL</label>
                <input 
                  required
                  type="url"
                  value={formData.sheetUrl}
                  onChange={(e) => setFormData({ ...formData, sheetUrl: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600"
                  placeholder="https://docs.google.com/spreadsheets/..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Tech Stack (comma separated)</label>
                   <input 
                    required
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all placeholder:text-slate-600"
                    placeholder="React, Java, Python"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                  >
                    <option value="Active">🟢 Active</option>
                    <option value="Pending">🟡 Pending</option>
                    <option value="Completed">🔴 Completed</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Notes (Optional)</label>
                <textarea 
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:text-slate-600"
                  placeholder="Internal developer notes..."
                />
              </div>

              <div className="mt-4 flex gap-4">
                <button 
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_24px_rgba(99,102,241,0.5)] flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {initialData ? 'Update Company' : 'Save Company'}
                </button>
                <button 
                  type="button"
                  onClick={onClose}
                  className="px-8 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-2xl border border-white/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddCompanyModal;
