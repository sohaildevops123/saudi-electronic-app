import React from 'react';
import { ShoppingCart, Check, ShieldAlert } from 'lucide-react';

export default function ProductCard({ product, lang, onAddToCart, isInCart }) {
  const isAr = lang === 'ar';
  const name = isAr ? product.name_ar : product.name_en;
  const description = isAr ? product.description_ar : product.description_en;

  // Parse specs JSON safely
  let specsObj = {};
  try {
    specsObj = typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs || {};
  } catch (e) {
    specsObj = {};
  }

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Product Image Container */}
      <div className="relative h-48 bg-slate-900 overflow-hidden flex items-center justify-center p-4">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80'}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Brand Tag */}
        {product.brand && (
          <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-slate-700">
            {product.brand}
          </span>
        )}

        {/* Stock status */}
        <span className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-800/40">
          {isAr ? 'متوفر بالمحل' : 'In Stock'}
        </span>
      </div>

      {/* Product Info Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Label */}
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
            {isAr ? product.category_name_ar || 'إلكترونيات' : product.category_name_en || 'Hardware'}
          </span>

          {/* Product Name */}
          <h3 className="text-base font-bold text-white mb-2 line-clamp-2 leading-snug group-hover:text-emerald-300 transition-colors">
            {name}
          </h3>

          {/* Specs tags */}
          {Object.keys(specsObj).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {Object.entries(specsObj).map(([key, val]) => (
                <span key={key} className="bg-slate-900 border border-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded font-mono">
                  {val}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <p className="text-slate-400 text-xs line-clamp-2 mb-4">
            {description}
          </p>
        </div>

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">{isAr ? 'السعر الاصلي' : 'Price'}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-amber-400">{Number(product.price).toLocaleString()}</span>
              <span className="text-xs font-bold text-amber-500">{isAr ? 'ر.س' : 'SAR'}</span>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
              isInCart
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/20'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{isAr ? 'تمت الإضافة' : 'Added'}</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>{isAr ? 'إضافة للسلة' : 'Add to Cart'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
