import React, { useState } from 'react';
import { X, Wrench, CheckCircle, Phone, User, MapPin } from 'lucide-react';

export default function ServiceBookingModal({ isOpen, onClose, selectedService, lang }) {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: name,
          customer_phone: phone,
          city: city,
          order_type: 'SERVICE',
          total_amount: selectedService ? selectedService.starting_price : 100,
          notes: `[SERVICE BOOKING: ${selectedService ? selectedService.title_en : 'General Technical Service'}] - ${notes}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
      } else {
        alert(data.message || 'Failed to submit request');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend service.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-panel w-full max-w-lg rounded-2xl border border-slate-800 p-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {isAr ? 'تم استلام طلب الصيانة بنجاح!' : 'Service Booking Received!'}
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              {isAr ? 'سيتواصل معك الفني في أقرب وقت لتأكيد استلام الجهاز أو الموعد.' : 'Our technician will call you shortly to confirm equipment pickup or store visit.'}
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
            >
              {isAr ? 'تم' : 'Close'}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
              <div className="p-2.5 bg-amber-950 text-amber-400 rounded-xl border border-amber-500/20">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {selectedService
                    ? (isAr ? selectedService.title_ar : selectedService.title_en)
                    : (isAr ? 'حجز خدمة سوفت وير / تفليش' : 'Book Software Service')}
                </h3>
                <span className="text-xs text-amber-400 font-semibold">
                  {isAr ? 'يبدأ من' : 'Starting price'}: {selectedService ? selectedService.starting_price : 99} SAR
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isAr ? 'محمد العتيبي' : 'Fahad Hussain'}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'رقم الجوال (سعودي)' : 'Saudi Phone Number'}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05X XXX XXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'المدينة' : 'City'}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Riyadh"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isAr ? 'تفاصيل المشكلة / موديل الجهاز' : 'Device Model / Problem Notes'}
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={isAr ? 'اكتب موديل اللوحة أو الويندوز المطلوب...' : 'e.g. ASUS B550 Motherboard corrupt BIOS, Windows 11 Fresh Install needed...'}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl shadow-lg transition"
              >
                {submitting ? (isAr ? 'جاري الإرسال...' : 'Submitting...') : (isAr ? 'تأكيد طلب الصيانة' : 'Confirm Service Booking')}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
