import { useState, useEffect } from 'react';
import initialData from '../data/initialData.json';

const STORAGE_KEY = 'rsl_dashboard_companies';

export const useDashboardData = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setCompanies(JSON.parse(saved));
    } else {
      setCompanies(initialData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    }
    setLoading(false);
  }, []);

  const saveToStorage = (data) => {
    setCompanies(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const addCompany = (company) => {
    const newList = [company, ...companies];
    saveToStorage(newList);
  };

  const updateCompany = (id, updatedData) => {
    const newList = companies.map(c => c.id === id ? { ...c, ...updatedData } : c);
    saveToStorage(newList);
  };

  const deleteCompany = (id) => {
    const newList = companies.filter(c => c.id !== id);
    saveToStorage(newList);
  };

  const toggleFavorite = (id) => {
    const newList = companies.map(c => 
      c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
    );
    saveToStorage(newList);
  };

  return {
    companies,
    loading,
    addCompany,
    updateCompany,
    deleteCompany,
    toggleFavorite
  };
};
