import React from 'react';
import { Shield, Cpu, Zap, HardDrive, Wrench, CheckCircle } from 'lucide-react';

export default function Hero({ lang, onBookServiceClick, scrollToCatalog }) {
  const isAr = lang === 'ar';

  return (
    <section className="relative overflow-hidden pt-10 pb-16 bg-gradient-to-b from-slate-950 via-saudi-dark to-slate-950">
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className={`lg:col-span-7 ${isAr ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <Zap className="w-3.5 h-3.5" />
              <span>{isAr ? 'مركز الصيانة المعتمد والإلكترونيات الأصيلة' : 'Authorized Tech Hub & Genuine Hardware'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              {isAr ? (
                <>
                  أفضل الأجهزة والحلول <span className="emerald-gradient-text">البرمجية الفائقة</span> في المملكة
                </>
              ) : (
                <>
                  Premium Hardware & <span className="emerald-gradient-text">Software Solutions</span> in Saudi Arabia
                </>
              )}
            </h1>

            <p className="text-slate-300 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed">
              {isAr ? (
                'نوفر لك أفضل شاشات الألعاب، هاردسكات NVMe SSD، الكابلات عالية السرعة وأجهزة الكمبيوتر المكتبي. بالإضافة لخدمات السوفت وير الاحترافية: تفليش البيوس، تثبيت الويندوز واسترجاع البيانات.'
              ) : (
                'Your trusted destination for 240Hz Gaming Monitors, NVMe SSDs, High-Speed Cables, Custom Desktops, and certified Software Solutions including BIOS Flashing, Windows Setup & Data Recovery.'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={scrollToCatalog}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 text-sm transition transform hover:-translate-y-0.5"
              >
                {isAr ? 'تصفح أحدث الأجهزة' : 'Explore Hardware Catalog'}
              </button>
              
              <button
                onClick={onBookServiceClick}
                className="bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40 font-bold px-6 py-3.5 rounded-xl text-sm transition flex items-center gap-2"
              >
                <Wrench className="w-4 h-4 text-amber-400" />
                <span>{isAr ? 'خدمات السوفت وير والتفليش' : 'Software & BIOS Services'}</span>
              </button>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'ضمان رسمي 100%' : '100% Genuine Parts'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isAr ? 'تفليش بيوس آمن' : 'Safe BIOS Flashing'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'فواتير ضريبية (VAT)' : 'Tax Invoice Certified'}</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Feature Cards */}
          <div className="lg:col-span-5 relative">
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-white text-sm">{isAr ? 'الخدمات الأكثر طلباً' : 'Top Hardware & Tech'}</span>
                </div>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-mono font-bold">SAR / ر.س</span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Samsung 990 PRO 2TB NVMe</div>
                      <div className="text-[11px] text-slate-400">7450 MB/s Speed</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400">799 ر.س</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-950 text-amber-400">
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{isAr ? 'تفليش بيوس واستعادة اللوحة' : 'BIOS Flashing Service'}</div>
                      <div className="text-[11px] text-slate-400">{isAr ? 'خلال ساعتين' : '1-2 Hours turn around'}</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400">99 ر.س</span>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">SanDisk 128GB Type-C Dual Drive</div>
                      <div className="text-[11px] text-slate-400">USB 3.1 & Type-C</div>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400">89 ر.س</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
