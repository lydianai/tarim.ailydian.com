'use client';

import { Shield, Lock, Eye, Database, Users, FileText, CheckCircle } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-earth-900/20 backdrop-blur-sm p-4 rounded-xl">
            <Shield className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
            <p className="text-xl text-white/90">Your Privacy is Our Priority</p>
          </div>
        </div>
        <div className="text-sm opacity-90 mt-4">Last Updated: December 17, 2025</div>
      </div>

      {/* Key Commitments */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6">Our Privacy Commitments</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: 'Data Encryption', desc: 'All data encrypted with industry-standard AES-256' },
            { icon: Eye, title: 'Transparency', desc: 'Clear information about data collection and usage' },
            { icon: Users, title: 'Your Control', desc: 'You control your data - request, export, or delete anytime' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <item.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-bold text-blue-900 mb-2 text-lg">{item.title}</h3>
              <p className="text-sm text-blue-800">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Information We Collect */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-100 p-3 rounded-lg">
            <Database className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-white">Information We Collect</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h3 className="font-bold text-green-900 mb-4 text-xl">1. Information You Provide</h3>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Account Information:</strong> Name, email address, farm location, crop types</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Agricultural Data:</strong> Soil samples, crop yields, pesticide usage</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Payment Information:</strong> Processed securely via Stripe (we don't store card details)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-bold text-purple-900 mb-4 text-xl">2. Automatically Collected Information</h3>
            <ul className="space-y-2 text-purple-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span><strong>Device Information:</strong> IP address, browser type, operating system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <span><strong>Cookies:</strong> Essential cookies for functionality, analytics cookies with your consent</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How We Use Your Information */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-white">How We Use Your Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Platform Services',
              items: [
                'Provide agricultural insights and recommendations',
                'Generate personalized crop analytics',
                'Deliver weather forecasts and alerts',
                'Enable blockchain supply chain tracking',
              ],
            },
            {
              title: 'Improvement & Research',
              items: [
                'Improve platform features and user experience',
                'Conduct agricultural research (anonymized data)',
                'Develop AI/ML models for better predictions',
                'Generate industry benchmarks and reports',
              ],
            },
            {
              title: 'Communication',
              items: [
                'Send service updates and notifications',
                'Respond to customer support inquiries',
                'Share relevant agricultural news',
                'Marketing communications (opt-in only)',
              ],
            },
            {
              title: 'Legal & Security',
              items: [
                'Comply with legal obligations',
                'Prevent fraud and abuse',
                'Enforce Terms of Service',
                'Protect user safety and security',
              ],
            },
          ].map((section, idx) => (
            <div key={idx} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-bold text-blue-900 mb-4 text-lg">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item, iidx) => (
                  <li key={iidx} className="flex items-start gap-2 text-sm text-blue-800">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Data Sharing */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6">Data Sharing & Disclosure</h2>
        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-300">
          <h3 className="font-bold text-orange-900 mb-4 text-xl">We NEVER Sell Your Data</h3>
          <p className="text-orange-900 mb-4">
            Your agricultural data is valuable and confidential. We only share data in these limited circumstances:
          </p>
          <ul className="space-y-3 text-orange-800">
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-700">•</span>
              <span><strong>With Your Consent:</strong> Explicit permission for specific data sharing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-700">•</span>
              <span><strong>Service Providers:</strong> Trusted partners (AWS, Vercel) under strict NDAs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-700">•</span>
              <span><strong>Legal Requirements:</strong> When required by law or to protect rights</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-700">•</span>
              <span><strong>Aggregated Data:</strong> Anonymized industry statistics (no personal identification)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Your Rights */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6">Your Privacy Rights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { right: 'Access', desc: 'Request a copy of all your data' },
            { right: 'Correction', desc: 'Update or correct your information' },
            { right: 'Deletion', desc: 'Request permanent data deletion' },
            { right: 'Portability', desc: 'Export your data in machine-readable format' },
            { right: 'Opt-Out', desc: 'Unsubscribe from marketing communications' },
            { right: 'Restriction', desc: 'Limit how we process your data' },
          ].map((item, idx) => (
            <div key={idx} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <div className="font-bold text-green-900 mb-1">{item.right}</div>
              <div className="text-sm text-green-800">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-white">
            <strong>To exercise your rights:</strong> Email privacy@agritech-platform.com with your request.
            We'll respond within 30 days.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 shadow-2xl text-white text-center">
        <Lock className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Questions About Privacy?</h2>
        <p className="text-xl mb-6 opacity-90">Contact our Data Protection Officer</p>
        <div className="bg-earth-900/20 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
          <div className="text-sm opacity-90">Email</div>
          <div className="font-bold text-lg">privacy@agritech-platform.com</div>
        </div>
      </div>
    </div>
  );
}
