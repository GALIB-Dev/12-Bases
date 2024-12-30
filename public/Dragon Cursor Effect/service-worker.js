// Add error handling and URL filtering
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith('chrome-extension://')) {
    return; // Skip chrome-extension URLs
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Only cache valid HTTP/HTTPS responses
          if (response && response.status === 200 && 
              (event.request.url.startsWith('http://') || 
               event.request.url.startsWith('https://'))) {
            const responseClone = response.clone();
            caches.open('v1').then(cache => {
              try {
                cache.put(event.request, responseClone);
              } catch (err) {
                console.warn('Cache put failed:', err);
              }
            });
          }
          return response;
        });
      })
  );
});
