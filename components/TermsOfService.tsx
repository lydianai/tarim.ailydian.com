'use client';

import { FileText, Scale, Shield, AlertCircle, CheckCircle, Users } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl">
            <Scale className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
            <p className="text-xl text-white/90">Legal Agreement for Platform Usage</p>
          </div>
        </div>
        <div className="text-sm opacity-90 mt-4">Effective Date: December 17, 2025</div>
      </div>

      {/* Acceptance */}
      <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-500">
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold text-gray-900">1. Acceptance of Terms</h2>
        </div>
        <div className="prose max-w-none text-gray-700">
          <p className="mb-4">
            By accessing or using AgriTech Platform Pro ("Platform", "Service", "we", "us", "our"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
          </p>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm font-semibold text-blue-900">
              Important: These terms constitute a legally binding agreement between you and Lydian Technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Account Terms */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Users className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">2. Account Terms</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Account Creation</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>You must be at least 18 years old to use this service</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>You must provide accurate, complete, and current information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>You are responsible for maintaining account security</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></span>
                <span>One person or legal entity may not maintain more than one free account</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Account Security</h3>
            <p className="text-gray-700 mb-3">You are responsible for:</p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Safeguarding your password and account credentials</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>All activities that occur under your account</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>Immediately notifying us of unauthorized access</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Service Usage */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">3. Acceptable Use</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-bold text-green-900 mb-4 text-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              You May
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Use the service for lawful agricultural purposes</li>
              <li>• Access data and features according to your subscription tier</li>
              <li>• Export your own data for personal use</li>
              <li>• Share aggregated insights with business partners</li>
              <li>• Integrate with third-party agricultural tools</li>
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="font-bold text-red-900 mb-4 text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              You May Not
            </h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>• Violate any laws or regulations</li>
              <li>• Scrape or harvest data without permission</li>
              <li>• Reverse engineer or decompile the platform</li>
              <li>• Share account credentials with others</li>
              <li>• Attempt to bypass rate limits or security measures</li>
              <li>• Upload malicious code or viruses</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Payments */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">4. Payment Terms</h2>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Subscription Plans</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600 min-w-[120px]">Basic ($49/mo):</span>
                <span>5 crops, basic analytics, email support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600 min-w-[120px]">Pro ($199/mo):</span>
                <span>30 crops, AI insights, API access, priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-blue-600 min-w-[120px]">Enterprise ($999/mo):</span>
                <span>Unlimited crops, blockchain, ESG, dedicated account manager</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-bold text-purple-900 mb-2">Billing</h4>
              <p className="text-sm text-gray-700">
                Subscriptions are billed monthly or annually in advance. All fees are non-refundable except as required by law.
              </p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <h4 className="font-bold text-orange-900 mb-2">Cancellation</h4>
              <p className="text-sm text-gray-700">
                Cancel anytime. Service continues until the end of the billing period. No partial refunds for unused time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Intellectual Property */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">5. Intellectual Property</h2>
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
          <div className="space-y-4 text-gray-700">
            <p>
              <strong className="text-indigo-900">Our Platform:</strong> The AgriTech Platform Pro service, including all content, features, functionality, software, and design, is owned by Lydian Technologies and protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p>
              <strong className="text-indigo-900">Your Data:</strong> You retain all rights to the agricultural data you submit to the platform. By using our service, you grant us a limited license to use your data to provide and improve the service.
            </p>
            <p>
              <strong className="text-indigo-900">Trademarks:</strong> "AgriTech Platform Pro" and "Lydian" are trademarks of Lydian Technologies. You may not use these marks without prior written permission.
            </p>
          </div>
        </div>
      </div>

      {/* Limitation of Liability */}
      <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-orange-500">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-8 h-8 text-orange-600" />
          <h2 className="text-3xl font-bold text-gray-900">6. Limitation of Liability</h2>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
          <p className="text-gray-700 mb-4">
            <strong className="text-orange-900">IMPORTANT:</strong> The platform provides agricultural information and analytics for informational purposes only. We do not guarantee crop yields, weather accuracy, or financial outcomes.
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Service provided "as is" without warranties of any kind</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Not liable for indirect, incidental, or consequential damages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Total liability limited to fees paid in the 12 months prior to claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Not responsible for third-party API data accuracy (USDA, NASA, etc.)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Termination */}
      <div className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Termination</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3">By You</h3>
            <p className="text-gray-700 text-sm">
              You may terminate your account at any time through account settings or by contacting support. Your data will be deleted within 90 days per our data retention policy.
            </p>
          </div>
          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <h3 className="font-bold text-red-900 mb-3">By Us</h3>
            <p className="text-gray-700 text-sm">
              We may suspend or terminate your account for violation of these terms, non-payment, or illegal activity. We'll provide 30 days notice unless immediate termination is required.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white text-center">
        <Scale className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Questions About Terms?</h2>
        <p className="text-xl mb-6 opacity-90">Our legal team is here to help</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm opacity-90">Email</div>
            <div className="font-bold">legal@agritech-platform.com</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
            <div className="text-sm opacity-90">Address</div>
            <div className="font-bold text-sm">Lydian Technologies, Delaware, USA</div>
          </div>
        </div>
      </div>
    </div>
  );
}
