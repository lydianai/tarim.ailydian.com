'use client';

import { X, Star, ShoppingCart, Truck, Shield, CheckCircle, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  supplier: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  shipping: string;
  image: string;
  features: string[];
}

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: () => void;
  language: 'tr' | 'en';
}

export default function ProductDetailsModal({ product, onClose, onAddToCart, language }: ProductDetailsModalProps) {
  const t = {
    addToCart: language === 'tr' ? 'Sepete Ekle' : 'Add to Cart',
    close: language === 'tr' ? 'Kapat' : 'Close',
    productDetails: language === 'tr' ? 'Ürün Detayları' : 'Product Details',
    supplier: language === 'tr' ? 'Tedarikçi' : 'Supplier',
    inStock: language === 'tr' ? 'Stokta' : 'In Stock',
    shipping: language === 'tr' ? 'Kargo' : 'Shipping',
    features: language === 'tr' ? 'Özellikler' : 'Features',
    reviews: language === 'tr' ? 'değerlendirme' : 'reviews',
    specifications: language === 'tr' ? 'Teknik Özellikler' : 'Specifications',
    category: language === 'tr' ? 'Kategori' : 'Category',
    unitPrice: language === 'tr' ? 'Birim Fiyat' : 'Unit Price',
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neon-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-neon-100 hover:bg-gray-100 p-2 rounded-lg transition-all shadow-md"
            aria-label={t.close}
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
          <h2 className="text-3xl font-display font-bold pr-12">{t.productDetails}</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Image and Basic Info */}
            <div>
              {/* Product Image */}
              <div className="bg-gradient-to-br from-agri-50 to-forest-50 rounded-xl p-12 text-center mb-6 border-2 border-agri-200">
                <div className="text-9xl mb-4">{product.image}</div>
                <div className="inline-block bg-agri-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                  {product.category}
                </div>
              </div>

              {/* Supplier Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="w-5 h-5 text-agri-600" />
                  <span className="font-bold text-gray-900">{t.supplier}</span>
                </div>
                <p className="text-gray-700">{product.supplier}</p>
                {product.inStock && (
                  <div className="flex items-center gap-2 mt-3 text-agri-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-semibold">{t.inStock}</span>
                  </div>
                )}
              </div>

              {/* Shipping Info */}
              <div className="bg-sky-50 rounded-lg p-4 border-l-4 border-sky-500">
                <div className="flex items-center gap-2 text-sky-800">
                  <Truck className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">{t.shipping}</p>
                    <p className="text-sm">{product.shipping}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div>
              {/* Product Name */}
              <h3 className="text-3xl font-display font-bold text-gray-900 mb-4">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-harvest-500 fill-harvest-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-600">({product.reviews} {t.reviews})</span>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl font-bold text-agri-900">${product.price}</span>
                  <span className="text-xl text-gray-600">/{product.unit}</span>
                </div>
                <p className="text-sm text-gray-600">{t.unitPrice}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{t.features}</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-agri-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-3">{t.specifications}</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">{t.category}:</div>
                  <div className="font-semibold text-gray-900">{product.category}</div>
                  <div className="text-gray-600">{t.supplier}:</div>
                  <div className="font-semibold text-gray-900">{product.supplier}</div>
                  <div className="text-gray-600">{t.shipping}:</div>
                  <div className="font-semibold text-gray-900">{product.shipping}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex gap-4">
            <button
              onClick={onAddToCart}
              className="flex-1 bg-neon-100 border-2 border-gray-900 font-bold py-4 px-6 rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-3"
            >
              <ShoppingCart className="w-5 h-5 text-gray-900" />
              <span className="text-gray-900 text-lg">{t.addToCart}</span>
            </button>
            <button
              onClick={onClose}
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100 transition-all"
            >
              {t.close}
            </button>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-agri-600" />
            <span>{language === 'tr' ? 'Güvenli Alışveriş' : 'Secure Shopping'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
