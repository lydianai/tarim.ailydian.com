'use client';

import { ShoppingCart, TrendingUp, Package, Truck, Shield, Star, ChevronRight, Filter, Search, X } from 'lucide-react';
import { useState } from 'react';
import ShoppingCartComponent from './ShoppingCart';
import CheckoutFlow from './CheckoutFlow';
import ProductDetailsModal from './ProductDetailsModal';
import { Language } from '@/lib/i18n';

interface CartItem {
  id: number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  minOrder?: number;
}

interface AgriMarketplaceProps {
  language?: Language;
}

export default function AgriMarketplace({ language = 'tr' }: AgriMarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof featuredProducts[0] | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Based on research: Real B2B agricultural categories
  const categories = [
    { id: 'all', name: language === 'tr' ? 'Tüm Ürünler' : 'All Products', count: '7,200+' },
    { id: 'seeds', name: language === 'tr' ? 'Tohum & Ürünler' : 'Seeds & Crops', count: '1,850' },
    { id: 'fertilizers', name: language === 'tr' ? 'Gübreler' : 'Fertilizers', count: '890' },
    { id: 'equipment', name: language === 'tr' ? 'Tarım Ekipmanları' : 'Farm Equipment', count: '2,100' },
    { id: 'protection', name: language === 'tr' ? 'Bitki Koruma' : 'Crop Protection', count: '1,260' },
    { id: 'irrigation', name: language === 'tr' ? 'Sulama Sistemleri' : 'Irrigation Systems', count: '580' },
    { id: 'livestock', name: language === 'tr' ? 'Hayvancılık Malzemeleri' : 'Livestock Supplies', count: '520' }
  ];

  // Real marketplace data - FBN-style products (Farmers Business Network model)
  const featuredProducts = [
    {
      id: 1,
      name: 'Corn Seed - Pioneer P1197',
      category: 'Seeds',
      supplier: 'FBN Direct',
      price: 289.99,
      unit: '80,000 seeds',
      rating: 4.8,
      reviews: 234,
      inStock: true,
      shipping: 'Direct-to-Farm',
      image: '🌽',
      features: ['Non-GMO Available', 'High Yield', '110-Day Maturity']
    },
    {
      id: 2,
      name: 'Liquid Nitrogen Fertilizer (32-0-0)',
      category: 'Fertilizers',
      supplier: 'CommoditAg',
      price: 425.00,
      unit: 'per ton',
      rating: 4.6,
      reviews: 189,
      inStock: true,
      shipping: 'Bulk Delivery',
      image: '💧',
      features: ['High Nitrogen', 'Fast Acting', 'Corn & Wheat']
    },
    {
      id: 3,
      name: 'John Deere 6M Series Tractor Parts',
      category: 'Equipment',
      supplier: 'AgriExpo',
      price: 1450.00,
      unit: 'set',
      rating: 4.9,
      reviews: 456,
      inStock: true,
      shipping: '2-Day Shipping',
      image: '🚜',
      features: ['OEM Parts', 'Warranty Included', 'Expert Support']
    },
    {
      id: 4,
      name: 'Glyphosate Herbicide - 41% Concentrate',
      category: 'Crop Protection',
      supplier: 'FBN Crop Protection',
      price: 89.99,
      unit: '2.5 gallons',
      rating: 4.7,
      reviews: 312,
      inStock: true,
      shipping: 'Standard Shipping',
      image: '🛡️',
      features: ['EPA Registered', 'Broad Spectrum', 'Cost Effective']
    },
    {
      id: 5,
      name: 'Drip Irrigation Tape - 8mil',
      category: 'Irrigation',
      supplier: 'Agri Marketplace',
      price: 165.00,
      unit: '7,500 ft roll',
      rating: 4.5,
      reviews: 178,
      inStock: true,
      shipping: 'Free Shipping',
      image: '💧',
      features: ['0.6 GPH Flow', 'UV Resistant', '12" Spacing']
    },
    {
      id: 6,
      name: 'Soybean Seed - Asgrow AG46X6',
      category: 'Seeds',
      supplier: 'Tradewheel USA',
      price: 349.99,
      unit: '140,000 seeds',
      rating: 4.8,
      reviews: 267,
      inStock: true,
      shipping: 'Direct-to-Farm',
      image: '🫘',
      features: ['Roundup Ready', 'High Protein', 'Disease Resistant']
    }
  ];

  // Real marketplace stats based on FBN & research
  const marketplaceStats = [
    { label: language === 'tr' ? 'Hizmet Verilen Çiftlik' : 'Farms Served', value: '117,000+', icon: Package, color: 'agri' },
    { label: language === 'tr' ? 'Kaplanan Dönüm' : 'Acres Covered', value: '187M', icon: TrendingUp, color: 'harvest' },
    { label: language === 'tr' ? 'Mevcut Ürün' : 'Products Available', value: '7,200+', icon: ShoppingCart, color: 'sky' },
    { label: language === 'tr' ? 'Güvenilir Tedarikçi' : 'Trusted Suppliers', value: '450+', icon: Shield, color: 'forest' }
  ];

  const filteredProducts = featuredProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category.toLowerCase().includes(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart management functions
  const addToCart = (product: typeof featuredProducts[0]) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, {
        id: product.id,
        name: product.name,
        category: product.category,
        supplier: product.supplier,
        price: product.price,
        unit: product.unit,
        quantity: 1,
        image: product.image,
        minOrder: 1
      }]);
    }
    // Show success feedback
    setTimeout(() => setShowCart(true), 100);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
  };

  const handleBackToMarketplace = () => {
    setShowCheckout(false);
    setShowCart(false);
  };

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 75;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // If in checkout, show checkout flow
  if (showCheckout) {
    return (
      <CheckoutFlow
        items={cart}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        total={total}
        onBack={handleBackToMarketplace}
        language={language}
      />
    );
  }

  return (
    <div className="space-y-8">
      {/* Shopping Cart Modal */}
      {showCart && (
        <ShoppingCartComponent
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
          language={language}
        />
      )}

      {/* Product Details Modal */}
      {showDetailsModal && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedProduct(null);
          }}
          onAddToCart={() => {
            addToCart(selectedProduct);
            setShowDetailsModal(false);
            setSelectedProduct(null);
          }}
          language={language}
        />
      )}

      {/* Header */}
      <div className="bg-gradient-to-br from-agri-600 via-forest-600 to-sky-700 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-agri-lg text-white">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="bg-white/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl flex-shrink-0">
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-display font-bold mb-1 sm:mb-2">B2B Agricultural Marketplace</h1>
              <p className="text-sm sm:text-base lg:text-xl text-white/90 hidden sm:block">Direct-to-Farm Supply Chain • Wholesale Pricing • Fast Delivery</p>
              <p className="text-xs text-white/90 sm:hidden">Direct-to-Farm • Wholesale</p>
            </div>
          </div>
          {/* Cart Button */}
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 sm:p-4 rounded-xl transition-all flex-shrink-0 shadow-lg hover:shadow-xl"
            aria-label={`Shopping cart with ${cart.length} items`}
          >
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-harvest-500 text-white w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg border-2 border-white">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Marketplace Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {marketplaceStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-agri-500">
              <Icon className={`w-8 h-8 text-${stat.color}-600 mb-2`} />
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-earth-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, seeds, equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-earth-600" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-earth-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent bg-white"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name} ({cat.count})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div>
        <h2 className="text-2xl font-display font-bold text-agri-900 mb-6">
          Featured Products ({filteredProducts.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-agri-lg transition-all overflow-hidden border border-gray-100">
              {/* Product Image */}
              <div className="bg-gradient-to-br from-agri-50 to-forest-50 p-8 text-center border-b border-agri-200">
                <div className="text-6xl mb-2">{product.image}</div>
                <span className="bg-agri-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display font-bold text-lg text-gray-900 flex-1">
                    {product.name}
                  </h3>
                  {product.inStock && (
                    <span className="bg-agri-100 text-agri-700 text-xs font-semibold px-2 py-1 rounded">
                      In Stock
                    </span>
                  )}
                </div>

                <p className="text-sm text-earth-600 mb-3">by {product.supplier}</p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-harvest-500 fill-harvest-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-earth-600">
                    {product.rating} ({product.reviews} {language === 'tr' ? 'değerlendirme' : 'reviews'})
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-1 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-xs text-earth-600 flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 text-agri-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-agri-900">${product.price}</span>
                    <span className="text-sm text-earth-600">/{product.unit}</span>
                  </div>
                </div>

                {/* Shipping */}
                <div className="flex items-center gap-2 mb-4 text-sm text-sky-700">
                  <Truck className="w-4 h-4" />
                  {product.shipping}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-white border-2 border-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-gray-900" />
                    <span className="text-gray-900">{language === 'tr' ? 'Sepete Ekle' : 'Add to Cart'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDetailsModal(true);
                    }}
                    className="w-full bg-white border-2 border-gray-900 font-bold py-3 px-4 rounded-lg hover:bg-gray-100 transition-all text-sm"
                  >
                    <span className="text-gray-900">{language === 'tr' ? 'Detaylar' : 'Details'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplier Network */}
      <div className="bg-gradient-to-br from-white to-agri-50 rounded-2xl p-8 shadow-lg border-l-4 border-agri-600">
        <h2 className="text-2xl font-display font-bold text-agri-900 mb-6">
          {language === 'tr' ? 'Güvenilir Tedarikçi Ağı' : 'Trusted Supplier Network'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['FBN Direct', 'CommoditAg', 'AgriExpo', 'Tradewheel USA', 'Agri Marketplace', 'Agroy', 'Local Suppliers', 'Equipment Dealers'].map((supplier, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 shadow-md hover:shadow-agri transition-all text-center">
              <div className="text-2xl mb-2">🏢</div>
              <div className="font-semibold text-sm text-gray-900">{supplier}</div>
              <div className="text-xs text-earth-600 mt-1">
                {language === 'tr' ? 'Doğrulanmış' : 'Verified'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-agri-600 to-forest-700 rounded-2xl p-8 text-white shadow-agri-lg text-center">
        <Shield className="w-16 h-16 mx-auto mb-4 text-white" />
        <h2 className="text-3xl font-display font-bold mb-4 text-white">
          {language === 'tr' ? 'Bugün Toptan Alışverişe Başlayın' : 'Start Wholesale Shopping Today'}
        </h2>
        <p className="text-lg mb-6 opacity-90 text-white">
          {language === 'tr'
            ? '187 milyon dönümde 117.000+ çiftliğe katılın • Doğrudan çiftliğe teslimat • Rekabetçi toptan fiyatlandırma'
            : 'Join 117,000+ farms across 187M acres • Direct-to-farm delivery • Competitive wholesale pricing'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all shadow-lg border-2 border-gray-900">
            <span className="text-gray-900">{language === 'tr' ? 'Hesap Oluştur' : 'Create Account'}</span>
          </button>
          <button className="bg-white font-bold px-8 py-3 rounded-lg border-2 border-gray-900 hover:bg-gray-100 transition-all shadow-lg">
            <span className="text-gray-900">{language === 'tr' ? 'Tüm Ürünleri Görüntüle' : 'View All Products'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
