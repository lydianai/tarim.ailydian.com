'use client';

import { CreditCard, Truck, User, Building2, MapPin, Phone, Mail, Lock, Shield, ChevronRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
}

interface CheckoutFlowProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onBack: () => void;
  language?: 'tr' | 'en';
}

type CheckoutStep = 'business' | 'shipping' | 'payment' | 'review' | 'confirmation';

export default function CheckoutFlow({ items, subtotal, shipping, tax, total, onBack, language = 'tr' }: CheckoutFlowProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('business');
  const [accountType, setAccountType] = useState<'business' | 'individual'>('business');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ach' | 'net30'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  // Form states
  const [businessInfo, setBusinessInfo] = useState({
    companyName: '',
    taxId: '',
    businessType: 'farm',
    licenseNumber: '',
    contactName: '',
    email: '',
    phone: ''
  });

  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryInstructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: '',
    billingZip: ''
  });

  const [achInfo, setAchInfo] = useState({
    accountNumber: '',
    routingNumber: '',
    accountType: 'checking' as 'checking' | 'savings',
    accountHolderName: ''
  });

  const t = {
    // Steps
    businessInfo: language === 'tr' ? 'İşletme Bilgileri' : 'Business Info',
    shipping: language === 'tr' ? 'Kargo' : 'Shipping',
    payment: language === 'tr' ? 'Ödeme' : 'Payment',
    review: language === 'tr' ? 'İnceleme' : 'Review',

    // Confirmation
    orderConfirmed: language === 'tr' ? 'Sipariş Onaylandı!' : 'Order Confirmed!',
    thankYou: language === 'tr' ? 'Satın alma işleminiz için teşekkür ederiz' : 'Thank you for your purchase',
    orderNumber: language === 'tr' ? 'Sipariş Numarası' : 'Order Number',
    totalAmount: language === 'tr' ? 'Toplam Tutar' : 'Total Amount',
    confirmationEmail: language === 'tr' ? 'Onay e-postası gönderildi:' : 'A confirmation email has been sent to',
    whatNext: language === 'tr' ? 'Sırada ne var?' : '{t.whatNext}',
    orderProcessing: language === 'tr' ? 'Sipariş Hazırlanıyor' : 'Order Processing',
    orderProcessingDesc: language === 'tr' ? 'Siparişiniz hazırlanıyor (1-2 iş günü)' : 'Your order is being prepared (1-2 business days)',
    shippingDelivery: language === 'tr' ? 'Kargo ve Teslimat' : 'Shipping & Delivery',
    shippingDeliveryDesc: language === 'tr' ? 'Çiftliğe direkt teslimat (3-7 iş günü)' : 'Direct-to-farm delivery (3-7 business days)',
    trackOrder: language === 'tr' ? 'Siparişi Takip Et' : '{t.trackOrderBtn}',
    trackOrderDesc: language === 'tr' ? 'Takip bilgisi e-posta ile gönderilecek' : "You'll receive tracking information via email",
    trackOrderBtn: language === 'tr' ? 'Siparişi Takip Et' : '{t.trackOrderBtn}',
    continueShopping: language === 'tr' ? 'Alışverişe Devam' : '{t.continueShopping}',

    // Header
    backToCart: language === 'tr' ? 'Sepete Dön' : 'Back to Cart',
    secureCheckout: language === 'tr' ? 'Güvenli Ödeme' : 'Secure Checkout',

    // Summary
    subtotal: language === 'tr' ? 'Ara Toplam' : 'Subtotal',
    tax: language === 'tr' ? 'Vergi' : 'Tax',
    total: language === 'tr' ? 'Toplam' : 'Total',
    free: language === 'tr' ? 'ÜCRETSİZ' : 'FREE',

    // Buttons
    continueToShipping: language === 'tr' ? 'Kargoya Devam' : '{t.continueToShipping}',
    continueToPayment: language === 'tr' ? 'Ödemeye Devam' : '{t.continueToPayment}',
    reviewOrder: language === 'tr' ? 'Siparişi İncele' : 'Review Order',
    placeOrder: language === 'tr' ? 'Güvenli Sipariş Ver' : 'Place Secure Order',
    back: language === 'tr' ? 'Geri' : 'Back',
  };

  const steps = [
    { id: 'business', label: t.businessInfo, icon: Building2 },
    { id: 'shipping', label: t.shipping, icon: Truck },
    { id: 'payment', label: t.payment, icon: CreditCard },
    { id: 'review', label: t.review, icon: CheckCircle }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handlePlaceOrder = () => {
    // Generate order number
    const orderNum = 'AG-' + Date.now().toString().slice(-8);
    setOrderNumber(orderNum);
    setCurrentStep('confirmation');
  };

  if (currentStep === 'confirmation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-agri-50 to-forest-50 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-agri-600 to-forest-600 p-8 text-white text-center">
              <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-display font-bold mb-2">{t.orderConfirmed}</h1>
              <p className="text-lg opacity-90">{t.thankYou}</p>
            </div>

            {/* Order Details */}
            <div className="p-8">
              <div className="bg-agri-50 border-l-4 border-agri-600 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600">{t.orderNumber}</p>
                    <p className="text-2xl font-bold text-agri-900">{orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{t.totalAmount}</p>
                    <p className="text-2xl font-bold text-agri-900">${total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <p>A confirmation email has been sent to <strong>{businessInfo.email}</strong></p>
                </div>
              </div>

              {/* What's Next */}
              <div className="space-y-4 mb-6">
                <h3 className="font-bold text-lg text-gray-900">{t.whatNext}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="bg-agri-100 text-agri-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.orderProcessing}</p>
                      <p className="text-sm text-gray-600">Your order is being prepared (1-2 business days)</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-agri-100 text-agri-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.shippingDelivery}</p>
                      <p className="text-sm text-gray-600">Direct-to-farm delivery (3-7 business days)</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-agri-100 text-agri-700 w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <p className="font-semibold text-gray-900">Track Your Order</p>
                      <p className="text-sm text-gray-600">You'll receive tracking information via email</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <button className="flex-1 bg-white border-2 border-gray-900 text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-all">
                  {t.trackOrderBtn}
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 border-2 border-agri-600 text-agri-700 font-bold py-3 rounded-lg hover:bg-agri-50 transition-all"
                >
                  {t.continueShopping}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-50 to-forest-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <button
            onClick={onBack}
            className="text-agri-700 hover:text-agri-900 font-semibold mb-4 flex items-center gap-2"
          >
            ← {t.backToCart}
          </button>
          <h1 className="text-3xl font-display font-bold text-gray-900">{t.secureCheckout}</h1>

          {/* Progress Steps */}
          <div className="mt-6 flex items-center justify-between">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = idx < currentStepIndex;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted ? 'bg-agri-600 text-white' :
                      isActive ? 'bg-agri-100 text-agri-700 border-2 border-agri-600' :
                      'bg-gray-200 text-gray-500'
                    }`}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                    </div>
                    <span className={`text-sm font-semibold ${isActive ? 'text-agri-700' : 'text-gray-600'}`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-1 flex-1 mx-2 ${isCompleted ? 'bg-agri-600' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              {/* Step 1: Business Information */}
              {currentStep === 'business' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h2>
                    <p className="text-sm text-gray-600">Required for USDA compliance and payment protection under PACA</p>
                  </div>

                  {/* Account Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Account Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setAccountType('business')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          accountType === 'business'
                            ? 'border-agri-600 bg-agri-50'
                            : 'border-gray-200 hover:border-agri-300'
                        }`}
                      >
                        <Building2 className={`w-8 h-8 mx-auto mb-2 ${accountType === 'business' ? 'text-agri-600' : 'text-gray-400'}`} />
                        <p className="font-semibold text-gray-900">Business / Farm</p>
                        <p className="text-xs text-gray-600 mt-1">For wholesale purchases</p>
                      </button>
                      <button
                        onClick={() => setAccountType('individual')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          accountType === 'individual'
                            ? 'border-agri-600 bg-agri-50'
                            : 'border-gray-200 hover:border-agri-300'
                        }`}
                      >
                        <User className={`w-8 h-8 mx-auto mb-2 ${accountType === 'individual' ? 'text-agri-600' : 'text-gray-400'}`} />
                        <p className="font-semibold text-gray-900">Individual</p>
                        <p className="text-xs text-gray-600 mt-1">For personal use</p>
                      </button>
                    </div>
                  </div>

                  {accountType === 'business' && (
                    <>
                      {/* Company Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Company/Farm Name *
                          </label>
                          <input
                            type="text"
                            value={businessInfo.companyName}
                            onChange={(e) => setBusinessInfo({...businessInfo, companyName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="Enter company name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tax ID / EIN *
                          </label>
                          <input
                            type="text"
                            value={businessInfo.taxId}
                            onChange={(e) => setBusinessInfo({...businessInfo, taxId: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="XX-XXXXXXX"
                            required
                          />
                        </div>
                      </div>

                      {/* Business Type & License */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type *</label>
                          <select
                            value={businessInfo.businessType}
                            onChange={(e) => setBusinessInfo({...businessInfo, businessType: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          >
                            <option value="farm">Farm / Ranch</option>
                            <option value="distributor">Distributor</option>
                            <option value="processor">Processor</option>
                            <option value="retailer">Retailer</option>
                            <option value="cooperative">Cooperative</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            PACA License # (if applicable)
                          </label>
                          <input
                            type="text"
                            value={businessInfo.licenseNumber}
                            onChange={(e) => setBusinessInfo({...businessInfo, licenseNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                        <input
                          type="text"
                          value={businessInfo.contactName}
                          onChange={(e) => setBusinessInfo({...businessInfo, contactName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="Full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={businessInfo.email}
                          onChange={(e) => setBusinessInfo({...businessInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={businessInfo.phone}
                          onChange={(e) => setBusinessInfo({...businessInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* USDA Compliance Notice */}
                  <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded">
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-sky-900">
                        <p className="font-semibold mb-1">USDA & PACA Compliance</p>
                        <p className="text-sky-800">
                          Your information is protected under the Perishable Agricultural Commodities Act (PACA)
                          and used only for order processing and payment protection.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep('shipping')}
                    className="w-full bg-white border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    {t.continueToShipping}
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {currentStep === 'shipping' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Shipping Address</h2>
                    <p className="text-sm text-gray-600">Direct-to-farm delivery available nationwide</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                        placeholder="123 Farm Road"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.address2}
                        onChange={(e) => setShippingInfo({...shippingInfo, address2: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                        placeholder="Building, floor, etc."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                        <select
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          required
                        >
                          <option value="">Select State</option>
                          <option value="IA">Iowa</option>
                          <option value="IL">Illinois</option>
                          <option value="IN">Indiana</option>
                          <option value="KS">Kansas</option>
                          <option value="MN">Minnesota</option>
                          <option value="MO">Missouri</option>
                          <option value="NE">Nebraska</option>
                          <option value="ND">North Dakota</option>
                          <option value="OH">Ohio</option>
                          <option value="SD">South Dakota</option>
                          <option value="WI">Wisconsin</option>
                          {/* Add other states as needed */}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code *</label>
                        <input
                          type="text"
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="12345"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Delivery Instructions (optional)
                      </label>
                      <textarea
                        value={shippingInfo.deliveryInstructions}
                        onChange={(e) => setShippingInfo({...shippingInfo, deliveryInstructions: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                        rows={3}
                        placeholder="Gate code, special delivery location, etc."
                      />
                    </div>
                  </div>

                  {/* Shipping Options */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Shipping Method</h3>
                    <div className="space-y-3">
                      <div className="border-2 border-agri-600 bg-agri-50 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Truck className="w-6 h-6 text-agri-600" />
                            <div>
                              <p className="font-semibold text-gray-900">Direct-to-Farm Delivery</p>
                              <p className="text-sm text-gray-600">3-7 business days</p>
                            </div>
                          </div>
                          <p className="font-bold text-agri-700">
                            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep('business')}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1 bg-white border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      {t.continueToPayment}
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 'payment' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Method</h2>
                    <p className="text-sm text-gray-600">Secure payment processing powered by Stripe</p>
                  </div>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'card'
                          ? 'border-agri-600 bg-agri-50'
                          : 'border-gray-200 hover:border-agri-300'
                      }`}
                    >
                      <CreditCard className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'card' ? 'text-agri-600' : 'text-gray-400'}`} />
                      <p className="font-semibold text-gray-900">Credit Card</p>
                      <p className="text-xs text-gray-600 mt-1">Instant approval</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('ach')}
                      className={`p-4 border-2 rounded-lg transition-all ${
                        paymentMethod === 'ach'
                          ? 'border-agri-600 bg-agri-50'
                          : 'border-gray-200 hover:border-agri-300'
                      }`}
                    >
                      <Building2 className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'ach' ? 'text-agri-600' : 'text-gray-400'}`} />
                      <p className="font-semibold text-gray-900">ACH / Bank</p>
                      <p className="text-xs text-gray-600 mt-1">Lower fees</p>
                    </button>
                    {accountType === 'business' && (
                      <button
                        onClick={() => setPaymentMethod('net30')}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          paymentMethod === 'net30'
                            ? 'border-agri-600 bg-agri-50'
                            : 'border-gray-200 hover:border-agri-300'
                        }`}
                      >
                        <Lock className={`w-8 h-8 mx-auto mb-2 ${paymentMethod === 'net30' ? 'text-agri-600' : 'text-gray-400'}`} />
                        <p className="font-semibold text-gray-900">Net 30</p>
                        <p className="text-xs text-gray-600 mt-1">Credit required</p>
                      </button>
                    )}
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          value={paymentInfo.cardholderName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardholderName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="Name on card"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number *</label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry *</label>
                          <input
                            type="text"
                            value={paymentInfo.expiry}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiry: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">CVV *</label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="123"
                            required
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP *</label>
                          <input
                            type="text"
                            value={paymentInfo.billingZip}
                            onChange={(e) => setPaymentInfo({...paymentInfo, billingZip: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="12345"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ACH Form */}
                  {paymentMethod === 'ach' && (
                    <div className="space-y-4 border-t border-gray-200 pt-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Account Holder Name *</label>
                        <input
                          type="text"
                          value={achInfo.accountHolderName}
                          onChange={(e) => setAchInfo({...achInfo, accountHolderName: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                          placeholder="Full name or business name"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Routing Number *</label>
                          <input
                            type="text"
                            value={achInfo.routingNumber}
                            onChange={(e) => setAchInfo({...achInfo, routingNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="9 digits"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                          <input
                            type="text"
                            value={achInfo.accountNumber}
                            onChange={(e) => setAchInfo({...achInfo, accountNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-agri-500 focus:border-transparent"
                            placeholder="Account number"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Account Type *</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setAchInfo({...achInfo, accountType: 'checking'})}
                            className={`p-3 border-2 rounded-lg transition-all ${
                              achInfo.accountType === 'checking'
                                ? 'border-agri-600 bg-agri-50 text-agri-700'
                                : 'border-gray-200 hover:border-agri-300'
                            }`}
                          >
                            Checking
                          </button>
                          <button
                            onClick={() => setAchInfo({...achInfo, accountType: 'savings'})}
                            className={`p-3 border-2 rounded-lg transition-all ${
                              achInfo.accountType === 'savings'
                                ? 'border-agri-600 bg-agri-50 text-agri-700'
                                : 'border-gray-200 hover:border-agri-300'
                            }`}
                          >
                            Savings
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net 30 */}
                  {paymentMethod === 'net30' && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                        <div className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-amber-900">
                            <p className="font-semibold mb-1">Credit Application Required</p>
                            <p className="text-amber-800 mb-3">
                              Net 30 payment terms require a credit application and approval.
                              This typically takes 1-2 business days.
                            </p>
                            <button className="bg-amber-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 transition-all">
                              Apply for Credit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="bg-sky-50 border-l-4 border-sky-500 p-4 rounded">
                    <div className="flex gap-3">
                      <Shield className="w-5 h-5 text-sky-700 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-sky-900">
                        <p className="font-semibold mb-1">Secure Payment Processing</p>
                        <p className="text-sky-800">
                          All payment information is encrypted and processed securely through Stripe.
                          We never store your complete card details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setCurrentStep('review')}
                      className="flex-1 bg-white border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 'review' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Order</h2>
                    <p className="text-sm text-gray-600">Please verify all information before placing your order</p>
                  </div>

                  {/* Business Info Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-agri-600" />
                      Business Information
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-600">Company:</div>
                      <div className="font-semibold text-gray-900">{businessInfo.companyName || 'N/A'}</div>
                      <div className="text-gray-600">Contact:</div>
                      <div className="font-semibold text-gray-900">{businessInfo.contactName}</div>
                      <div className="text-gray-600">Email:</div>
                      <div className="font-semibold text-gray-900">{businessInfo.email}</div>
                    </div>
                  </div>

                  {/* Shipping Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-agri-600" />
                      Shipping Address
                    </h3>
                    <div className="text-sm text-gray-900">
                      <p>{shippingInfo.address}</p>
                      {shippingInfo.address2 && <p>{shippingInfo.address2}</p>}
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-agri-600" />
                      Payment Method
                    </h3>
                    <div className="text-sm text-gray-900">
                      {paymentMethod === 'card' && <p>Credit Card ending in ****{paymentInfo.cardNumber.slice(-4)}</p>}
                      {paymentMethod === 'ach' && <p>ACH Bank Transfer</p>}
                      {paymentMethod === 'net30' && <p>Net 30 Terms (Credit Application Required)</p>}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="border-t border-gray-200 pt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-agri-600 border-gray-300 rounded focus:ring-agri-500" required />
                      <span className="text-sm text-gray-700">
                        I agree to the <a href="#" className="text-agri-600 hover:text-agri-700 font-semibold">Terms & Conditions</a> and
                        confirm that all information provided is accurate. I understand that purchases are subject to
                        USDA regulations and PACA compliance requirements.
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-4 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-white border-2 border-gray-900 text-gray-900 font-bold py-4 rounded-lg hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Place Secure Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-200">
                    <div className="bg-gray-100 rounded p-2 w-12 h-12 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-agri-700">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.subtotal}</span>
                  <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.shipping}</span>
                  <span className="font-semibold text-gray-900">
                    {shipping === 0 ? <span className="text-agri-600">{t.free}</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t.tax}</span>
                  <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-300 pt-2 flex justify-between">
                  <span className="font-bold text-lg text-gray-900">{t.total}</span>
                  <span className="font-bold text-2xl text-agri-700">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-agri-600" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-agri-600" />
                  <span>USDA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-agri-600" />
                  <span>PACA Protected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
