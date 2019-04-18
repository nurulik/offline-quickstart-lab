//cache disimpan dengan nama "nurulindah-cache"
var	CACHE_NAME	=	'nurulindah-cache';
//file yang di cache
var	urlsToCache	=	[
		'.',
		'index.html',
		'styles/main.css'
];

//proses installasi service worker, 
self.addEventListener('install',	function(event)	{
		event.waitUntil(
				caches.open(CACHE_NAME)
				.then(function(cache)	{
						return	cache.addAll(urlsToCache);
				})
		);
});

//mencoba untuk menyocokkan permintaan dengan konten cache. jika sumber daya terdapat di cache, maka dikembalikkan ke asli/awal. 
self.addEventListener('fetch',	function(event)	{
		event.respondWith(
				caches.match(event.request)
				.then(function(response)	{
						return	response	||	fetchAndCache(event.request);
				})
		);
});

function	fetchAndCache(url)	{
		return	fetch(url)
		.then(function(response)	{
				//mengecek apakah didapatkan respon yang benar. jika error, maka akan ditampilkan pesan error pada console log 
				if	(!response.ok)	{
						throw	Error(response.statusText);
				}
				//jika respon yang didapatkan benar, maka respon akan disalin lalu disimpan di "nurulindah-cache" dan respon dikembalikan ke yang asli / awal
				return	caches.open(CACHE_NAME)
				.then(function(cache)	{
						cache.put(url,	response.clone());
						return	response;
				});
		})
		.catch(function(error)	{
				//jika error, maka akan ditampilkan pesan error pada console log
				console.log('Request	failed:',	error);
		});
}
