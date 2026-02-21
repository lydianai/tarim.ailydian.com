import { MetadataRoute } from 'next'
import { SUPPORTED_LANGUAGES } from '@/lib/seo-config-advanced'

/**
 * ADVANCED MULTI-LANGUAGE SITEMAP
 * Generated for all supported languages with hreflang alternates
 */

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://tarim.ailydian.com'
  const currentDate = new Date()

  // All routes with their priorities and frequencies
  const routes = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/dashboard', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/login', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/forgot-password', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/landing', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/tarim-dashboard', priority: 0.9, changeFrequency: 'daily' as const },
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Generate entries for each route with all language alternatives
  routes.forEach(route => {
    // Add main URL with all language alternates
    sitemap.push({
      url: `${baseUrl}${route.path}`,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.entries(SUPPORTED_LANGUAGES).reduce((acc, [code, lang]) => {
          acc[lang.hreflang] = `${baseUrl}${route.path}?lang=${code}`
          return acc
        }, {} as Record<string, string>),
      },
    })

    // Add explicit language-specific URLs for better indexing
    Object.entries(SUPPORTED_LANGUAGES).forEach(([code]) => {
      sitemap.push({
        url: `${baseUrl}${route.path}?lang=${code}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority * 0.95, // Slightly lower priority than main URL
        alternates: {
          languages: Object.entries(SUPPORTED_LANGUAGES).reduce((acc, [c, l]) => {
            acc[l.hreflang] = `${baseUrl}${route.path}?lang=${c}`
            return acc
          }, {} as Record<string, string>),
        },
      })
    })
  })

  return sitemap
}
