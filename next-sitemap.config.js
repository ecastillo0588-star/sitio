module.exports = {
  siteUrl: 'https://eghealthsolutions.com.ar',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 50000,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://eghealthsolutions.com.ar/sitemap.xml',
    ],
  },
};
