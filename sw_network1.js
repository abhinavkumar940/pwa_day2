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
    event.respondWith(async () => {
        // Call the backend server first
        const response = await fetch(event.request);

        if (response) {
            // if response is received, save it in our cache
            const cache = await caches.open(CACHE_NAME);
            await cache.add(event.request.url);
            console.log("dynamic url: ", event.request.url, " added");
            // and then return it
            return response;
        }

        const cachedResponse = await caches.match(event.request);

        return cachedResponse;
    })
});


self.addEventListener("message", function (message) {
    console.log(message);
})