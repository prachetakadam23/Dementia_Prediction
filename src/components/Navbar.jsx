import React, { useState } from "react";
import { Link } from "react-router-dom";
import LanguageSelector from './LanguageSelector';
import { useTranslation } from '../i18n/LanguageContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo + Language selector on the left */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold">
                DementiaPredict
              </Link>
            </div>
            {/* show language selector on desktop to the left of nav */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <Link to="/" className="hover:text-gray-300 transition duration-200">{t('app.home')}</Link>
              <Link to="/speech" className="hover:text-gray-300 transition duration-200">{t('app.start_test')}</Link>
              <Link to="/result" className="hover:text-gray-300 transition duration-200">{t('app.results')}</Link>
              <Link to="/about" className="hover:text-gray-300 transition duration-200">{t('app.about')}</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {/* Hamburger icon */}
              <svg
                className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
          {menuOpen && (
            <div className="md:hidden mt-2 flex flex-col space-y-2 px-2 pb-4">
              <Link to="/" className="hover:text-gray-300 transition duration-200" onClick={() => setMenuOpen(false)}>{t('app.home')}</Link>
              <Link to="/speech" className="hover:text-gray-300 transition duration-200" onClick={() => setMenuOpen(false)}>{t('app.start_test')}</Link>
              <Link to="/result" className="hover:text-gray-300 transition duration-200" onClick={() => setMenuOpen(false)}>{t('app.results')}</Link>
              <Link to="/about" className="hover:text-gray-300 transition duration-200" onClick={() => setMenuOpen(false)}>{t('app.about')}</Link>
              {/* show language selector inside the expanded mobile menu */}
              <div className="pt-2">
                <LanguageSelector />
              </div>
            </div>
          )}
      </div>
    </nav>
  );
};

export default Navbar;
