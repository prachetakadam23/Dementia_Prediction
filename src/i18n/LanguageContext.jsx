import React, { createContext, useContext, useState } from 'react';
import en from './en.json';
import hi from './hi.json';
import mr from './mr.json';

const resources = { en, hi, mr };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');

  const t = (path, vars = {}) => {
    const parts = path.split('.');
    let node = resources[lang];
    for (const p of parts) {
      if (!node) return path;
      node = node[p];
    }
    if (typeof node === 'string') {
      return node.replace(/\{\{(.*?)\}\}/g, (_, key) => vars[key.trim()] || '');
    }
    return node;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

export default LanguageContext;
