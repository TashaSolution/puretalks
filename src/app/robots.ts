import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'GPTBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'CCBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'Google-Extended',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'Amazonbot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/room/', '/api/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
