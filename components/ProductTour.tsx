'use client';

import { useEffect, useState, useCallback } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLocale } from '@/contexts/LocaleContext';
import { Play } from 'lucide-react';

export default function ProductTour() {
  const { t } = useLocale();
  const [showButton, setShowButton] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const startTour = useCallback(() => {
    if (!isMounted) return;
    const driverObj = driver({
      showProgress: true,
      showButtons: ['next', 'previous', 'close'],
      steps: [
        {
          element: '#dashboard-container',
          popover: {
            title: t('productTour.steps.welcome.title'),
            description: t('productTour.steps.welcome.description'),
            side: 'bottom',
            align: 'center'
          }
        },
        {
          element: '#dark-mode-toggle',
          popover: {
            title: t('productTour.steps.darkMode.title'),
            description: t('productTour.steps.darkMode.description'),
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '#language-switcher',
          popover: {
            title: t('productTour.steps.language.title'),
            description: t('productTour.steps.language.description'),
            side: 'left',
            align: 'start'
          }
        },
        {
          element: '[data-tour="drone-tab"]',
          popover: {
            title: t('productTour.steps.droneTab.title'),
            description: t('productTour.steps.droneTab.description'),
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '[data-tour="satellite-tab"]',
          popover: {
            title: t('productTour.steps.satelliteTab.title'),
            description: t('productTour.steps.satelliteTab.description'),
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '[data-tour="weather-tab"]',
          popover: {
            title: t('productTour.steps.weatherTab.title'),
            description: t('productTour.steps.weatherTab.description'),
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '[data-tour="analytics-tab"]',
          popover: {
            title: t('productTour.steps.analyticsTab.title'),
            description: t('productTour.steps.analyticsTab.description'),
            side: 'right',
            align: 'start'
          }
        },
        {
          element: '[data-tour="marketplace-tab"]',
          popover: {
            title: t('productTour.steps.marketplaceTab.title'),
            description: t('productTour.steps.marketplaceTab.description'),
            side: 'right',
            align: 'start'
          }
        },
        {
          popover: {
            title: t('productTour.steps.complete.title'),
            description: t('productTour.steps.complete.description')
          }
        }
      ],
      nextBtnText: t('productTour.next'),
      prevBtnText: t('productTour.prev'),
      doneBtnText: t('productTour.done'),
      onDestroyed: () => {
        localStorage.setItem('tourCompleted', 'true');
        setShowButton(true);
      }
    });

    driverObj.drive();
    setShowButton(false);
  }, [t, isMounted]);

  useEffect(() => {
    if (!isMounted) return undefined;

    const tourCompleted = localStorage.getItem('tourCompleted');
    if (!tourCompleted) {
      const timer = setTimeout(() => {
        startTour();
      }, 2000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [startTour, isMounted]);

  if (!showButton) return null;

  return (
    <button
      onClick={startTour}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full shadow-2xl transition-all hover:scale-105 animate-pulse"
      aria-label="Start product tour"
    >
      <Play className="w-5 h-5" />
      <span className="hidden sm:inline">{t('productTour.start')}</span>
    </button>
  );
}
