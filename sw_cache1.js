const CACHE_NAME = "pwa_day_1";
const urlsToCache = [
    "/",
];

self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log("Cache opened!");
            return cache.addAll(urlsToCache);
        })
    )
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                // Cached resource found!
                return response;
            }
            caches.open(CACHE_NAME).then(function (cache) {
                console.log("Cache opened!");
                cache.add(event.request.url).then(() => {
                    console.log("dynamic url: ", event.request.url, " added")
                }).catch(console.error);
            })
            // No cached response found!
            return fetch(event.request);

        })
    )
});


self.addEventListener("message", function (message) {
    console.log(message);
})