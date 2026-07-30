import React from 'react';
import { ShoppingBag, Search, Wrench, Globe, ShieldCheck, Cpu } from 'lucide-react';

export default function Header({ 
  lang, 
  setLang, 
  searchTerm, 
  setSearchTerm, 
  cartCount, 
  setIsCartOpen,
  onBookServiceClick
}) {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800">
      {/* Top Banner - Saudi Store Info */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-xs py-1.5 px-4 border-b border-emerald-900/40 text-emerald-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{isAr ? '🇸🇦 متجر سعودي معتمد - الرياض | توصيل سريع لجميع المناطق' : '🇸🇦 Certified Saudi Store - Riyadh | Fast Nationwide Delivery'}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {isAr ? 'ضمان سنتين أصلية' : '2-Year Official Warranty'}
            </span>
            <button 
              onClick={() => setLang(isAr ? 'en' : 'ar')}
              className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-medium bg-slate-800/80 px-2 py-0.5 rounded text-amber-300 border border-slate-700"
            >
              <Globe className="w-3.5 h-3.5" />
              {isAr ? 'English' : 'العربية (RTL)'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center shadow-lg shadow-emerald-900/30">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
              SAUDI <span className="gold-gradient-text">TECH</span>
            </span>
            <span className="block text-xs font-semibold text-emerald-400">
              {isAr ? 'للإلكترونيات والحلول البرمجية' : 'Electronics & Software Solutions'}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 ${isAr ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isAr ? 'ابحث عن شاشات، SSD، كابلات، هاردسك...' : 'Search monitors, SSDs, cables, HDDs, pendrives...'}
              className={`w-full bg-slate-900/90 border border-slate-700 rounded-xl py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition ${isAr ? 'pr-9 pl-4 text-right' : 'pl-9 pr-4'}`}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Software Service Booking Button */}
          <button
            onClick={onBookServiceClick}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-900/20 text-sm transition transform hover:-translate-y-0.5"
          >
            <Wrench className="w-4 h-4" />
            <span>{isAr ? 'طلب صيانة / تفليش' : 'Software Services'}</span>
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-emerald-500 text-slate-200 transition"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
