'use client';

import { Drone, Satellite, Cloud, LineChart, ShoppingCart, Shield, Zap, Activity } from 'lucide-react';
import { useLocale } from '@/contexts/LocaleContext';

export default function DashboardWidgets() {
  const { t } = useLocale();

  const widgets = [
    {
      icon: Drone,
      key: 'drone',
      gradient: 'from-blue-500 to-cyan-500',
      stats: '4 Drones'
    },
    {
      icon: Satellite,
      key: 'satellite',
      gradient: 'from-purple-500 to-pink-500',
      stats: 'NDVI 0.78'
    },
    {
      icon: Cloud,
      key: 'weather',
      gradient: 'from-orange-500 to-red-500',
      stats: '5-Day Forecast'
    },
    {
      icon: LineChart,
      key: 'analytics',
      gradient: 'from-green-500 to-emerald-500',
      stats: 'AI Powered'
    },
    {
      icon: ShoppingCart,
      key: 'marketplace',
      gradient: 'from-yellow-500 to-amber-500',
      stats: '1000+ Products'
    },
    {
      icon: Shield,
      key: 'security',
      gradient: 'from-red-500 to-rose-500',
      stats: 'Military Grade'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-400 dark:text-gray-300">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {widgets.map((widget) => {
            const Icon = widget.icon;
            return (
              <div
                key={widget.key}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${widget.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${widget.gradient} mb-6 relative z-10`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white dark:text-white mb-3 relative z-10">
                  {t(`features.widgets.${widget.key}.title`)}
                </h3>
                <p className="text-gray-400 dark:text-gray-300 mb-4 leading-relaxed relative z-10">
                  {t(`features.widgets.${widget.key}.description`)}
                </p>
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-sm font-semibold text-white dark:text-gray-300 relative z-10">
                  <Activity className="w-4 h-4" />
                  {widget.stats}
                </div>

                <div className="absolute bottom-6 right-6 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all">
                  <Zap className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
