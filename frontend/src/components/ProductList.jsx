import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Filter, ArrowUpDown, Monitor, Cpu, Cable, HardDrive, Usb } from 'lucide-react';

export default function ProductList({ 
  products, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  lang,
  cart,
  onAddToCart,
  sortOption,
  setSortOption
}) {
  const isAr = lang === 'ar';

  const categoryIcons = {
    monitors: Monitor,
    cables: Cable,
    desktops: Cpu,
    storage: HardDrive,
    pendrives: Usb,
  };

  return (
    <section id="catalog-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Catalog Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isAr ? 'كتالوج الإلكترونيات وقطع الغيار' : 'Hardware & Component Catalog'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isAr ? 'اختر الفئة المطلوبة أو تصفح منتجات المحل' : 'Filter by category or browse featured store hardware.'}
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <ArrowUpDown className="w-4 h-4 text-emerald-400" />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-500"
          >
            <option value="default">{isAr ? 'الترتيب الافتراضي' : 'Default Order'}</option>
            <option value="price-low">{isAr ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
            <option value="price-high">{isAr ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
          </select>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-2 ${
            selectedCategory === 'all'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
              : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>{isAr ? 'جميع الفئات' : 'All Products'}</span>
        </button>

        {categories.map((cat) => {
          const IconComp = categoryIcons[cat.slug] || Cpu;
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition flex items-center gap-2 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <IconComp className="w-3.5 h-3.5 text-amber-400" />
              <span>{isAr ? cat.name_ar : cat.name_en}</span>
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 glass-panel rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-base">
            {isAr ? 'لا توجد منتجات مطابقة لجميع معايير البحث الحالية.' : 'No products found matching the criteria.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => {
            const isInCart = cart.some((item) => item.id === product.id);
            return (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onAddToCart={onAddToCart}
                isInCart={isInCart}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
