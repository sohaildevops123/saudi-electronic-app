import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cart, setCart, lang }) {
  if (!isOpen) return null;

  const isAr = lang === 'ar';
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [city, setCity] = useState('Riyadh');
  const [submitting, setSubmitting] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_phone: customerPhone,
          city: city,
          order_type: 'PRODUCT',
          total_amount: totalAmount,
          items: cart.map((item) => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStep('success');
        setCart([]);
      } else {
        alert(data.message || 'Checkout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error communicating with server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className={`fixed inset-y-0 ${isAr ? 'left-0' : 'right-0'} max-w-full flex pl-10 z-50`}>
        <div className="w-screen max-w-md bg-saudi-card border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>{isAr ? 'سلة المشتريات' : 'Shopping Cart'}</span>
              <span className="text-xs bg-slate-800 text-emerald-400 px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-5 flex-1 overflow-y-auto">
            {step === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <p className="text-slate-400 text-sm">
                      {isAr ? 'سلتك فارغة حالياً. تصفح الأجهزة وأضف المنتجات.' : 'Your cart is empty. Add hardware products to proceed.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
                        <img src={item.image_url} alt={item.name_en} className="w-14 h-14 object-contain bg-slate-950 p-1 rounded-lg" />
                        
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{isAr ? item.name_ar : item.name_en}</h4>
                          <span className="text-xs text-amber-400 font-extrabold">{Number(item.price).toLocaleString()} SAR</span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="text-slate-400 hover:text-white p-0.5">
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="text-slate-400 hover:text-white p-0.5">
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-slate-500 hover:text-red-400 p-1">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {step === 'checkout' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                  {isAr ? 'معلومات التوصيل والشراء' : 'Delivery & Customer Details'}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">{isAr ? 'الاسم' : 'Name'}</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">{isAr ? 'رقم الجوال' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="05XXXXXXXX"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">{isAr ? 'المدينة' : 'City'}</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span>{isAr ? 'الدفع عند الاستلام أو مدى بالمحل.' : 'Payment mode: Cash on Delivery / Mada Store POS.'}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-sm"
                >
                  {submitting ? (isAr ? 'جاري التأكيد...' : 'Processing...') : (isAr ? 'تأكيد طلب المشتريات' : 'Place Order')}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-full text-slate-400 hover:text-white text-xs text-center block pt-2"
                >
                  {isAr ? 'العودة للسلة' : 'Back to Cart'}
                </button>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {isAr ? 'شكراً لك! تم تسجيل طلبك' : 'Order Placed Successfully!'}
                </h3>
                <p className="text-slate-300 text-sm mb-6">
                  {isAr ? 'سيتم التواصل معك فوراً لتأكيد التوصيل.' : 'We will reach out to you shortly for order confirmation.'}
                </p>
                <button
                  onClick={() => {
                    setStep('cart');
                    onClose();
                  }}
                  className="bg-emerald-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm"
                >
                  {isAr ? 'متابعة التسوق' : 'Continue Shopping'}
                </button>
              </div>
            )}
          </div>

          {/* Footer total calculation */}
          {cart.length > 0 && step === 'cart' && (
            <div className="p-5 border-t border-slate-800 bg-slate-900/80">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-400 text-sm font-semibold">{isAr ? 'الإجمالي الشامل للضريبة' : 'Total (incl. VAT)'}</span>
                <span className="text-xl font-black text-amber-400">{totalAmount.toLocaleString()} SAR</span>
              </div>
              <button
                onClick={() => setStep('checkout')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg transition text-sm"
              >
                {isAr ? 'متابعة الشراء والتأكيد' : 'Proceed to Checkout'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
