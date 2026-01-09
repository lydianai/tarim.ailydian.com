'use client';

import { Mail, Phone, MapPin, MessageSquare, Clock, Send, Globe, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-earth-900/20 backdrop-blur-sm p-4 rounded-xl">
            <MessageSquare className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Contact Us</h1>
            <p className="text-xl text-white/90">We're Here to Help</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2 bg-earth-900 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-earth-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-earth-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 border border-earth-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="How can we help you?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                Message *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 border border-earth-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Cards */}
          <div className="bg-earth-900 rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-white mb-4 text-lg">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-white">Email</div>
                  <a href="mailto:support@agritech-platform.com" className="font-semibold text-white hover:text-green-600">
                    support@agritech-platform.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-white">Phone</div>
                  <a href="tel:+18005551234" className="font-semibold text-white hover:text-blue-600">
                    +1 (800) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-white">Address</div>
                  <div className="font-semibold text-white">
                    Lydian Technologies<br />
                    1234 Innovation Drive<br />
                    Wilmington, DE 19801, USA
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-white">Website</div>
                  <a href="https://tarim.ailydian.com" className="font-semibold text-white hover:text-orange-600">
                    tarim.ailydian.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
              <h3 className="font-bold text-white text-lg">Business Hours</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white">Monday - Friday</span>
                <span className="font-semibold text-white">9:00 AM - 6:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Saturday</span>
                <span className="font-semibold text-white">10:00 AM - 4:00 PM EST</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white">Sunday</span>
                <span className="font-semibold text-white">Closed</span>
              </div>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="text-xs text-white">
                  <strong>24/7 Support:</strong> Enterprise customers have access to round-the-clock technical support.
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-earth-900 rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-white mb-4 text-lg">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-blue-100 p-3 rounded-lg hover:bg-blue-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-blue-600" />
              </a>
              <a
                href="#"
                className="bg-sky-100 p-3 rounded-lg hover:bg-sky-200 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6 text-sky-600" />
              </a>
              <a
                href="#"
                className="bg-green-100 p-3 rounded-lg hover:bg-green-200 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-6 h-6 text-green-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="bg-earth-900 rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Contact by Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { dept: 'Sales', email: 'sales@agritech-platform.com', desc: 'Pricing and subscription inquiries', color: 'green' },
            { dept: 'Technical Support', email: 'support@agritech-platform.com', desc: 'Platform issues and troubleshooting', color: 'blue' },
            { dept: 'Partnerships', email: 'partners@agritech-platform.com', desc: 'Business collaboration opportunities', color: 'purple' },
            { dept: 'Media & Press', email: 'press@agritech-platform.com', desc: 'Media inquiries and press kit', color: 'orange' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 rounded-xl p-6 border border-${item.color}-200`}>
              <h3 className={`font-bold text-${item.color}-900 mb-2 text-lg`}>{item.dept}</h3>
              <a href={`mailto:${item.email}`} className={`text-sm font-semibold text-${item.color}-700 hover:text-${item.color}-900 block mb-2`}>
                {item.email}
              </a>
              <p className="text-xs text-white">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Quick Links */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 shadow-2xl text-white text-center">
        <MessageSquare className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Have a Question?</h2>
        <p className="text-xl mb-6 opacity-90">Check our FAQ or reach out directly</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-earth-900 text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-earth-900 transition-colors">
            View FAQ
          </button>
          <button className="bg-earth-900/20 backdrop-blur-sm text-white font-bold px-8 py-3 rounded-lg border-2 border-white hover:bg-earth-900/30 transition-colors">
            Live Chat
          </button>
        </div>
      </div>
    </div>
  );
}
