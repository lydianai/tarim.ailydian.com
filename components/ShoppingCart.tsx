'use client';

import { ShoppingCart, X, Plus, Minus, CreditCard, Truck, Shield, ChevronRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';

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

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
  onClose: () => void;
  language?: 'tr' | 'en';
}

export default function ShoppingCartComponent({ items, onUpdateQuantity, onRemoveItem, onCheckout, onClose, language = 'tr' }: ShoppingCartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 75; // Free shipping over $1000
  const tax = subtotal * 0.08; // 8% average US agricultural sales tax
  const total = subtotal + shipping + tax;

  const t = {
    yourCart: language === 'tr' ? 'Sepetiniz' : 'Your Cart',
    items: language === 'tr' ? 'ürün' : 'items',
    closeCart: language === 'tr' ? 'Sepeti Kapat' : 'Close Cart',
    cartEmpty: language === 'tr' ? 'Sepetiniz boş' : 'Your cart is empty',
    addProducts: language === 'tr' ? 'Başlamak için ürün ekleyin' : 'Add some products to get started',
    by: language === 'tr' ? 'Tedarikçi:' : 'by',
    subtotal: language === 'tr' ? 'Ara Toplam' : 'Subtotal',
    shipping: language === 'tr' ? 'Kargo' : 'Shipping',
    free: language === 'tr' ? 'ÜCRETSİZ' : 'FREE',
    tax: language === 'tr' ? 'Vergi (tahmini)' : 'Tax (estimated)',
    total: language === 'tr' ? 'Toplam' : 'Total',
    addForFreeShipping: language === 'tr' ? 'daha ekleyin ve' : 'more for',
    freeShipping: language === 'tr' ? 'ÜCRETSİZ KARGO' : 'FREE shipping',
    freeShippingText: language === 'tr' ? 'kazanın' : '',
    proceedToCheckout: language === 'tr' ? 'Ödemeye Geç' : 'Proceed to Checkout',
    secureCheckout: language === 'tr' ? 'Stripe ile güvenli ödeme' : 'Secure checkout powered by Stripe',
    minimumOrder: language === 'tr' ? 'Minimum sipariş' : 'Minimum order',
    units: language === 'tr' ? 'adet' : 'units',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neon-100 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-display font-bold">{t.yourCart}</h2>
                <p className="text-sm opacity-90">{items.length} {t.items}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-neon-100 hover:bg-gray-100 p-2 rounded-lg transition-all shadow-md"
              aria-label={t.closeCart}
            >
              <X className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-600">{t.cartEmpty}</p>
              <p className="text-sm text-gray-500 mt-2">{t.addProducts}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex gap-4 border border-gray-200">
                  {/* Product Image */}
                  <div className="bg-neon-100 rounded-lg p-4 w-24 h-24 flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{item.image}</span>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{t.by} {item.supplier}</p>
                        <span className="inline-block bg-agri-100 text-agri-700 text-xs font-semibold px-2 py-1 rounded mt-1">
                          {item.category}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(item.minOrder || 1, item.quantity - 1))}
                          disabled={item.quantity <= (item.minOrder || 1)}
                          className="bg-neon-100 border border-gray-300 p-1 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-900 w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="bg-neon-100 border border-gray-300 p-1 rounded hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <span className="text-xs text-gray-600 ml-2">{item.unit}</span>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-sm text-gray-600">${item.price.toFixed(2)} / {item.unit}</div>
                        <div className="text-xl font-bold text-agri-700">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {item.minOrder && item.minOrder > 1 && (
                      <div className="mt-2 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded inline-block">
                        {t.minimumOrder}: {item.minOrder} {t.units}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Summary */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            {/* Order Summary */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t.subtotal}</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t.shipping}</span>
                <span className="font-semibold text-gray-900">
                  {shipping === 0 ? (
                    <span className="text-agri-600">{t.free}</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t.tax}</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 flex justify-between">
                <span className="font-bold text-lg text-gray-900">{t.total}</span>
                <span className="font-bold text-2xl text-agri-700">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Shipping Info */}
            {subtotal < 1000 && (
              <div className="bg-sky-50 border-l-4 border-sky-500 p-3 rounded mb-4">
                <div className="flex gap-2 text-sm text-sky-800">
                  <Truck className="w-5 h-5 flex-shrink-0" />
                  <p>
                    ${(1000 - subtotal).toFixed(2)} {t.addForFreeShipping} <strong>{t.freeShipping}</strong> {t.freeShippingText}
                  </p>
                </div>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full bg-neon-100 border-2 border-gray-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5 text-gray-900" />
              <span className="text-gray-900">{t.proceedToCheckout}</span>
            </button>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-600">
              <Shield className="w-4 h-4 text-agri-600" />
              <span>{t.secureCheckout}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
