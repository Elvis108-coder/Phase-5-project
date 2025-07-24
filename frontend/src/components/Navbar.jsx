import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-[#f3e8ff] shadow-md px-6 py-4 flex justify-between items-center text-[#3c1a4b]">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        {t('navbar.brand')}
      </Link>

      <div className="space-x-6 flex items-center">
        <Link to="/products" className="hover:underline">
          {t('navbar.products')}
        </Link>
        <Link to="/cart" className="hover:underline">
          {t('navbar.cart')}
        </Link>
        <Link to="/orders" className="hover:underline">
          {t('navbar.orders')}
        </Link>

        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={i18n.language}
          className="ml-4 border rounded px-2 py-1 bg-white text-sm"
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
