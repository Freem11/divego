export default async function handler(request, context) {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') || '';

  // Check if request is from a social media crawler
  const isSocialCrawler = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|skypeuripreview|slackbot|discordbot|pinterest|reddit|snapchat/i.test(userAgent);

  if (!isSocialCrawler) {
    return;
  }

  // Extract share parameters from URL
  const title = url.searchParams.get('title') || 'Scuba SEAsons - Dive into Amazing Underwater Adventures';
  const description = url.searchParams.get('description') || 'Discover the best diving spots and marine life encounters worldwide. Share your underwater adventures with the diving community.';
  const image = url.searchParams.get('image') || 'https://scuba-seasons.web.app/src/images/Matt_Manta_White.png';
  const type = url.searchParams.get('type') || 'website';
  const cleanUrl = `${url.protocol}//${url.host}${url.pathname}`;


  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <meta name="description" content="${description}">
        <link rel="canonical" href="${cleanUrl}">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="${type}">
        <meta property="og:url" content="${cleanUrl}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        <meta property="og:image" content="${image}">
        <meta property="og:site_name" content="Scuba SEAsons">
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:url" content="${cleanUrl}">
        <meta name="twitter:title" content="${title}">
        <meta name="twitter:description" content="${description}">
        <meta name="twitter:image" content="${image}">
        
        <meta http-equiv="refresh" content="0; url=${cleanUrl}">
    </head>
    <body>
        <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
            <h1>Scuba SEAsons</h1>
            <p>Redirecting to ${title}...</p>
            <p><a href="${cleanUrl}">Click here if you're not redirected automatically</a></p>
        </div>
    </body>
    </html>`;

  return new Response(html, {
    headers: {
      'Content-Type':  'text/html',
      'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
    },
  });
}
