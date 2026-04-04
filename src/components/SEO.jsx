import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  canonical,
  image = '/og-image.png',
}) {
  const siteName = 'Blendz Leo';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="language" content="Spanish" />
      <meta httpEquiv="content-language" content="es" />
    </Helmet>
  );
}
