import React from 'react';
import { Wrench, Cpu, Monitor, ShieldCheck, HardDrive, Clock, ArrowRight, Check } from 'lucide-react';

export default function ServiceSection({ services, lang, onSelectService }) {
  const isAr = lang === 'ar';

  const serviceIconMap = {
    Cpu: Cpu,
    Monitor: Monitor,
    ShieldCheck: ShieldCheck,
    HardDrive: HardDrive,
    Wrench: Wrench,
  };

  return (
    <section className="py-16 bg-slate-950 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-4">
            <Wrench className="w-3.5 h-3.5" />
            <span>{isAr ? 'قسم السوفت وير والصيانة الاحترافية' : 'Software Solutions & Diagnostics'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            {isAr ? (
              <>
                خدمات <span className="gold-gradient-text">البرمجة والتفليش</span> بالمحل
              </>
            ) : (
              <>
                Professional <span className="gold-gradient-text">Software & Flashing</span> Services
              </>
            )}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            {isAr ? 'نوفر حلولاً فورية لمشاكل البيوس، الأنظمة، والفيروسات بأيدي فنيين محترفين.' : 'Fast, reliable technical fixes for motherboard BIOS, operating system, malware, and data recovery.'}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => {
            const IconComponent = serviceIconMap[srv.icon] || Wrench;
            const title = isAr ? srv.title_ar : srv.title_en;
            const desc = isAr ? srv.description_ar : srv.description_en;

            return (
              <div
                key={srv.id}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-amber-950/60 border border-amber-500/20 text-amber-400 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {srv.badge && (
                      <span className="text-[10px] font-extrabold bg-slate-900 border border-slate-800 text-amber-300 px-2.5 py-1 rounded-full uppercase">
                        {srv.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-6">
                    {desc}
                  </p>
                </div>

                {/* Footer Info & Action */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{srv.estimated_time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{isAr ? 'يبدأ من' : 'Starts at'}</span>
                      <span className="text-sm font-black text-amber-400">{Number(srv.starting_price).toLocaleString()} SAR</span>
                    </div>

                    <button
                      onClick={() => onSelectService(srv)}
                      className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition shadow-md shadow-amber-950/40"
                      title={isAr ? 'حجز الخدمة' : 'Book Service'}
                    >
                      <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
