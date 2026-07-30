import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, Clock, Cpu } from 'lucide-react';

export default function Footer({ lang }) {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-lg font-black text-white">SAUDI <span className="gold-gradient-text">TECH</span></span>
            </div>
            <p className="leading-relaxed mb-4">
              {isAr
                ? 'متجر إلكترونيات متخصص في الأجهزة، الشاشات، كابلات نقل البيانات، ووحدات التخزين بالإضافة إلى خدمات التفليش والصيانة البرمجية.'
                : 'Authorized electronics shop selling high-grade monitors, SSDs, cables, desktops, and providing motherboard BIOS flashing & OS services.'}
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>VAT: 310948275600003</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{isAr ? 'الأقسام الرئيسية' : 'Categories'}</h4>
            <ul className="space-y-2">
              <li><a href="#catalog-section" className="hover:text-emerald-400 transition">{isAr ? 'شاشات الألعاب والعمل' : 'Monitors & Displays'}</a></li>
              <li><a href="#catalog-section" className="hover:text-emerald-400 transition">{isAr ? 'كابلات HDMI و Type-C' : 'Cables & Adapters'}</a></li>
              <li><a href="#catalog-section" className="hover:text-emerald-400 transition">{isAr ? 'أجهزة الكمبيوتر المكتبي' : 'Desktop PCs'}</a></li>
              <li><a href="#catalog-section" className="hover:text-emerald-400 transition">{isAr ? 'وحدات SSD و HDD' : 'NVMe SSD & Hard Drives'}</a></li>
              <li><a href="#catalog-section" className="hover:text-emerald-400 transition">{isAr ? 'فلاشات USB وPendrives' : 'USB Flash Drives'}</a></li>
            </ul>
          </div>

          {/* Software Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{isAr ? 'الحلول البرمجية' : 'Software Services'}</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-amber-400 transition">{isAr ? 'تحديث وتفليش البيوس' : 'BIOS Flashing'}</span></li>
              <li><span className="hover:text-amber-400 transition">{isAr ? 'تثبيت الويندوز الأصلي' : 'Clean OS Installation'}</span></li>
              <li><span className="hover:text-amber-400 transition">{isAr ? 'تنظيف الفيروسات والتسريع' : 'Virus Cleanup & Tuning'}</span></li>
              <li><span className="hover:text-amber-400 transition">{isAr ? 'استرجاع الملفات المفقودة' : 'SSD & HDD Data Recovery'}</span></li>
            </ul>
          </div>

          {/* Store Location & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">{isAr ? 'تواصل معنا والموقع' : 'Store Location & Contact'}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{isAr ? 'شارع العليا العام، حي الورود، الرياض، المملكة العربية السعودية' : 'Olaya Main St, Al Worood Dist, Riyadh, Saudi Arabia'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+966 50 123 4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@saudi-tech.sa</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{isAr ? 'السبت - الخميس: 9:00 ص - 11:00 م' : 'Sat - Thu: 9:00 AM - 11:00 PM'}</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-900 text-center text-slate-500">
          <p>© {new Date().getFullYear()} SAUDI TECH. {isAr ? 'جميع الحقوق محفوظة - متجر ومحل الإلكترونيات' : 'All Rights Reserved. Registered Saudi Tech Store.'}</p>
        </div>
      </div>
    </footer>
  );
}
