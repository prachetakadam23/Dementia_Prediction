import React from 'react';
import { useTranslation } from '../i18n/LanguageContext';

const LanguageSelector = () => {
  const { lang, setLang } = useTranslation();

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="lang-select" className="sr-only">Language</label>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-white text-black rounded px-2 py-1 text-sm border border-gray-200"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="mr">मराठी</option>
      </select>
      <span className="hidden sm:inline text-xs text-gray-300">{lang.toUpperCase()}</span>
    </div>
  );
};

export default LanguageSelector;
