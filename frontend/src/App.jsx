import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import ServiceSection from './components/ServiceSection';
import ServiceBookingModal from './components/ServiceBookingModal';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';

export default function App() {
  const [lang, setLang] = useState('ar'); // Default Saudi Arabic ('ar') or English ('en')
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Set document text direction based on selected language
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Fetch Categories & Services on initial load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, srvRes] = await Promise.all([
          fetch('/api/products/categories').catch(() => null),
          fetch('/api/services').catch(() => null)
        ]);

        if (catRes && catRes.ok) {
          const catData = await catRes.json();
          if (catData.success) setCategories(catData.data);
        }

        if (srvRes && srvRes.ok) {
          const srvData = await srvRes.json();
          if (srvData.success) setServices(srvData.data);
        }
      } catch (err) {
        console.error('Error loading initial API data:', err);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products whenever category, search term, or sort option changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory !== 'all') queryParams.append('category', selectedCategory);
        if (searchTerm) queryParams.append('search', searchTerm);
        if (sortOption !== 'default') queryParams.append('sort', sortOption);

        const res = await fetch(`/api/products?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setProducts(data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm, sortOption]);

  // Cart Add Handler
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleOpenServiceModal = (service = null) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const scrollToCatalog = () => {
    const elem = document.getElementById('catalog-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-saudi-dark text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <Header
        lang={lang}
        setLang={setLang}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
        onBookServiceClick={() => handleOpenServiceModal(null)}
      />

      {/* Hero Banner */}
      <Hero
        lang={lang}
        onBookServiceClick={() => handleOpenServiceModal(null)}
        scrollToCatalog={scrollToCatalog}
      />

      {/* Hardware Product Catalog */}
      <main className="flex-1">
        <ProductList
          products={products}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          lang={lang}
          cart={cart}
          onAddToCart={handleAddToCart}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {/* Software Solutions Section */}
        <ServiceSection
          services={services}
          lang={lang}
          onSelectService={(srv) => handleOpenServiceModal(srv)}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Software Service Booking Modal */}
      <ServiceBookingModal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        selectedService={selectedService}
        lang={lang}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        lang={lang}
      />
    </div>
  );
}
