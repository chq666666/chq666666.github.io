/**
 * 自动引入模板，在原有 sw-precache 插件默认模板基础上做的二次开发
 *
 * 因为是自定导入的模板，项目一旦生成，不支持随 sw-precache 的版本自动升级。
 * 可以到 Lavas 官网下载 basic 模板内获取最新模板进行替换
 *
 */

/* eslint-disable */

'use strict';

var precacheConfig = [["/2023/09/26/近场论文笔记一/index.html","e69177420b4a120287e3c6ce05c64683"],["/2023/11/21/文献阅读/index.html","c1ab9913e709182173205f881fe367e7"],["/2023/12/02/DTFT、DFT、循环卷积与线性卷积/index.html","4a35bea9aa417ad6c73e8262b1729f90"],["/2023/12/08/矩阵/index.html","881bf0fd209d2cf5f49e046c26965e78"],["/2023/12/18/文献阅读二/index.html","392e6c56d9a1fe8da02d13cfbc92be96"],["/2023/12/27/测试/index.html","61fd793569d17d379a039d329ba37ade"],["/2024/06/20/DOA-estimation/index.html","2767058dc91057c461c264857af2bcdb"],["/about/index.html","b247e1ca1f5ffe9c36ece3b578306576"],["/archives/2023/09/index.html","093a406a176a9b640ce92ee55cedbaba"],["/archives/2023/11/index.html","98db46707fa61198294df5f69f70d34d"],["/archives/2023/12/index.html","18fe471e2c7e2ddcabf92062abea5160"],["/archives/2023/index.html","e22517fea5c6f66fa08d963736584498"],["/archives/2024/06/index.html","cfaaa05a3556b1e44bbba9777ab7d03d"],["/archives/2024/index.html","e5967ac5b24f86da1555439b62e1fea8"],["/archives/index.html","49380347462f1ce845eb47fa83b95bba"],["/categories/index.html","f5974c175239bf6a194d08c9d37f64af"],["/categories/数学/index.html","e00aafb36277817e3368a4446016d5c8"],["/categories/通信/index.html","6a6fdc1e5d424385fcc942a5625374a7"],["/categories/随笔/index.html","ded509502b9a4ec9f82ae99e2920cc81"],["/comment/index.html","e4764d62f90a9d906c178591be3308e7"],["/css/backgound.css","aa9e8bc850d56f15ea89a95656ecbef9"],["/css/costom.css","3d57ebf5aeed343a247a82c156d0fd18"],["/css/custom.css","b0d90e0b1a5a98320e809c589c79a62d"],["/css/iconfont.css","bbc06c23d81f2c708c8a8f6290b53dc4"],["/css/index.css","26094a7064e53972e0e4bf5e2497b5b7"],["/css/shuoshuo.css","990f6856c52d232f45deff956634c9f8"],["/css/var.css","d41d8cd98f00b204e9800998ecf8427e"],["/img/1.jpg","5edb2f3abba07e1680d83584ce9822a9"],["/img/10.jpg","27d0198e7ee7e08be592b968e491d620"],["/img/11.jpg","289197ec3869857a64c5453dbaf14fe8"],["/img/12.jpg","1c6348d97a92e5b7fc678f165eee82be"],["/img/13.jpg","19e5f2d10f2c51f800f252deca61cb0c"],["/img/3.jpg","7202e4a5d48623553fd7edc68b581fd6"],["/img/4.jpg","7969072f90eeb5882b211032ad2b09e4"],["/img/404.jpg","4ef3cfb882b6dd4128da4c8745e9a507"],["/img/5.jpg","aded406fdf788bc6d8db2e2d042a3dbd"],["/img/6.jpg","f19341c008dadf766cf82709832b46f7"],["/img/7.jpg","74388e7e996a4cd8329523f33c782e46"],["/img/8.jpg","1c89477ff5b71bb96cd549df9d98cb4a"],["/img/background.jpg","d76b5fcb57e1653fa70cf6637308db34"],["/img/favicon.jpg","653fea817134d6263a8e4ddd1a152952"],["/img/favicon.png","7a8c47cb5a2149c1a1af21e90ecd9ca7"],["/img/friend_404.gif","68af0be9d22722e74665ef44dd532ba8"],["/img/touxiang.jpg","e7ab811cd62ecee9f8fe37e026243e84"],["/img/wenzhangbeijing.jpg","ac3843ddb07b45b2005645f903007c82"],["/index.html","7efcff9072e549c9748d676a4428ed3b"],["/js/custom.js","3cd705a8c63c4f196deb3b0dd41ff3a4"],["/js/main.js","c1abc98ff6aa69f598f43b8604fb7b3e"],["/js/search/algolia.js","5e2a2c65f28bddbb3d94529453e91716"],["/js/search/local-search.js","2e3ff3d156bb208f752d95375ebca557"],["/js/tw_cn.js","fd395fc3b4df9c7da17e730d173cfbea"],["/js/utils.js","2fd35bd141fd541a188ef52dd30108d5"],["/js/waterfall/waterfall.js","f3f0cd691926609d9d5f87f3b2dd25ed"],["/link/index.html","f497030401705f0f719d46549cd1dc55"],["/photos/dalian/1.jpg","b6a42caece80f592fa140ec95b928b69"],["/photos/dalian/2.jpg","6568206abbb1ae6cbb14055121e2a8b3"],["/photos/dalian/3.jpg","24737f7dae66f8c31b6a9ab00e2e4b60"],["/photos/dalian/4.jpg","8b78878fcb7cb4d2810bca00bb99296c"],["/photos/dalian/5.jpg","6b7002a95307f74834adf898adfbe660"],["/photos/dalian/6.jpg","cbd323937e370382e88b3ecc00d9c250"],["/photos/dalian/7.jpg","c0b136c89d886d9c3cd7502943375b64"],["/photos/dalian/8.jpg","d15b6ecbaacec9a271d24bc3ba12c961"],["/photos/dalian/index.html","955c8ebf5fd90320ff30e477e65390da"],["/photos/datong/1.jpg","926855f1e35a94a74be9899c2cf77837"],["/photos/datong/2.jpg","a2f884df986bd16a91b3b981a24f4a37"],["/photos/datong/3.jpg","c4082cee9e5d97baff9c508a8c89078d"],["/photos/datong/4.jpg","5a84b8551a5cbc6ac53c5b2d1d6eb38b"],["/photos/datong/5.jpg","171c2b7ad3dc88367f6266c724404009"],["/photos/datong/6.jpg","8d9803136184b706e64cbaa33e4bb842"],["/photos/datong/7.jpg","80682366d61c12eb6039784584e14b7e"],["/photos/datong/index.html","ac42108d0292e7d694b11ed57ab12c19"],["/photos/guangzhou/1.jpg","dad77d328a16178d09d17d3552b06ac5"],["/photos/guangzhou/2.jpg","baa5fd9b8a5139b304364acc9f88738d"],["/photos/guangzhou/3.jpg","0c9f91e0e6e39db9f0776acd2744cb84"],["/photos/guangzhou/4.jpg","2ba4f7d0c26ce58e830b566d3f5a8f96"],["/photos/guangzhou/5.jpg","c6d439cc53b7c1fed092bbb6da2bb542"],["/photos/guangzhou/index.html","15638862e273526b2b32bfb0067443cb"],["/photos/harbin/1.jpg","91c53a8c503fe72bbd8ff238cc2e54d5"],["/photos/harbin/2.jpg","5bc7cbf2a03079711c629f9ec1b016d9"],["/photos/harbin/3.jpg","ac2ccff65f50ee856b5305c6787c9947"],["/photos/harbin/4.jpg","fd58c85f26967da2c2413f4ce7c951fa"],["/photos/harbin/5.jpg","aae0924aa52a994e228ac486d503e64f"],["/photos/harbin/6.jpg","f8da5162caf3f480c0bd2ea5e2d00a2f"],["/photos/harbin/7.jpg","a194da632f77a9e563299217e4bfa2da"],["/photos/harbin/index.html","cf2f8806ec6a3235e8c0a687e47700d8"],["/photos/hongkong/hongkong5.jpg","9698da2ca55ef61ecf2e41648f9caa1e"],["/photos/hongkong/index.html","0f5855c7e6d6d36c9f619b36c71b78a6"],["/photos/index.html","c6f8e1eaf196a1b16afd7387268439ca"],["/photos/mohe/1.jpg","bbca2e26581a1865604ff03a2ebae7a4"],["/photos/mohe/2.jpg","103080805a6472a886ecf836ca4d0052"],["/photos/mohe/3.jpg","32174f418fcd40198272c1ba8493c793"],["/photos/mohe/4.jpg","4970abd7320d2379f3a3f471f6558687"],["/photos/mohe/5.jpg","e455da04f158502b17da3048a44eb5c0"],["/photos/mohe/6.jpg","fe913f9eade4781a9b644a7dc413fce3"],["/photos/mohe/7.jpg","426873c059100dddb1bb1155d27cdb15"],["/photos/mohe/8.jpg","b5ade963fe86ec7cd25802093818d5d0"],["/photos/mohe/9.jpg","b4684c84d09357851afd84d45fd68612"],["/photos/mohe/index.html","3cf7e1e8fd2e122738c74c0129afb003"],["/photos/shenzhen/index.html","d0e1ec1285e6adf0a7a0e390c226e381"],["/photos/shenzhen/shenzhen1.jpg","da222fd43901ca17dae34b5b91ab4bfb"],["/photos/shenzhen/shenzhen10.jpg","f933e657ddcc5b390ee28645b55d8e70"],["/photos/shenzhen/shenzhen11.jpg","c42c225d32cd6008a4cfd24124de3a9f"],["/photos/shenzhen/shenzhen12.jpg","943d24c9bfa5ee5b4f211c0ffb579aa4"],["/photos/shenzhen/shenzhen13.jpg","e440581100edde29b124d902761c597e"],["/photos/shenzhen/shenzhen14.jpg","5ed9ce18965400d98fe77300b197ea49"],["/photos/shenzhen/shenzhen15.jpg","19d4bddab44b7077b96533c9fcff22ac"],["/photos/shenzhen/shenzhen2.jpg","753700f30ee5cff2d0cf1d5241652e9a"],["/photos/shenzhen/shenzhen3.jpg","0773fe22f08f6b7db3aaf0da86917be3"],["/photos/shenzhen/shenzhen4.jpg","5a83578026f6614d1407d5c307f889aa"],["/photos/shenzhen/shenzhen5.jpg","dce1ff3e39e1563cef0270096ee435a5"],["/photos/shenzhen/shenzhen7.jpg","dfcecb81cabaf988f1df2cd9db546a51"],["/photos/shenzhen/shenzhen8.jpg","5f8c35e098d53cee2d94e59010425000"],["/photos/shenzhen/shenzhen9.jpg","c2459fe0c004edfc7d00386221f542be"],["/photos/shunde/1.jpg","0cfb2d1f5b97e33dc8cb0b9ef4844863"],["/photos/shunde/2.jpg","f1fe4faadf2d191fe277187b7762369b"],["/photos/shunde/3.jpg","787ff18035b3038de75775f7b058c1e3"],["/photos/shunde/4.jpg","01762b393e651ea3683907be52e270f5"],["/photos/shunde/5.jpg","7ebcad3544b0eb3bfd7b33d496511b94"],["/photos/shunde/6.jpg","d42bed56f1c716eec5c8fb8d8ee1b73d"],["/photos/shunde/index.html","d88d004b8620dce7a2dd263e326db4aa"],["/photos/xinzhou/1.jpg","e4d56e55718c9b2378f903ffad4a81cb"],["/photos/xinzhou/2.jpg","a2a4c73e68766b55b79022f19990a4ec"],["/photos/xinzhou/3.jpg","12051dee9be3b4b6f5c562d82d35c38a"],["/photos/xinzhou/4.jpg","6588255e188673c759e694d36c45f1c9"],["/photos/xinzhou/5.jpg","c5029b055540e5cef23b9a743e12f671"],["/photos/xinzhou/6.jpg","97ae80352af31c91395b3c48f3706816"],["/photos/xinzhou/7.jpg","8196afd2fb665d539c9d958c88f72385"],["/photos/xinzhou/8.jpg","7f5e52c5b56dfa83cbd0bbce2beb1367"],["/photos/xinzhou/index.html","e476b0328775fdb15a338025e3688ba7"],["/pic/DTFT、DFT、循环卷积与线性卷积/1.jpg","c9aa093ddc72b951b10b0d29e059cc63"],["/pic/DTFT、DFT、循环卷积与线性卷积/2.jpg","ac3843ddb07b45b2005645f903007c82"],["/pic/文献阅读/1.png","4693b15f183510d0f18ad01c28e4a85d"],["/pic/文献阅读/2.jpg","67658359218ec56ad4cd4383c06536bf"],["/pic/文献阅读二/1.jpg","4a439505572692fe1db8e350893c0968"],["/pic/文献阅读二/2.jpg","09904b9798df51e0b5cf959dedb39067"],["/pic/文献阅读二/3.jpg","91ca66f236019c815a5cdc6d0d32125a"],["/pic/近场论文笔记一/1-1.png","175a1238da5aa1a63f2b3e7c3c8224a7"],["/pic/近场论文笔记一/1-2.png","c02312e8023e957621795ab5df3c2604"],["/shuoshuo/index.html","44d6cc5495acda78a97ce7fc716a0d04"],["/sw-register.js","f872c862ab824e98ab61ecf64c93e10e"],["/tags/DOA估计/index.html","d52b7d7c4a228259341b694a77da67d3"],["/tags/DSP/index.html","d353a4e2189d3e0718583a4883b69875"],["/tags/index.html","2102e00e93787201bdcd87f76ace8b18"],["/tags/矩阵/index.html","e181b7a8725148373cd25ed5774347a3"],["/tags/近场论文笔记/index.html","09d9a55c3ea571d1018963cbeefe823b"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');
var firstRegister = 1; // 默认1是首次安装SW， 0是SW更新


var ignoreUrlParametersMatching = [/^utm_/];


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var cleanResponse = function (originalResponse) {
    // 如果没有重定向响应，不需干啥
    if (!originalResponse.redirected) {
        return Promise.resolve(originalResponse);
    }

    // Firefox 50 及以下不知处 Response.body 流, 所以我们需要读取整个body以blob形式返回。
    var bodyPromise = 'body' in originalResponse ?
        Promise.resolve(originalResponse.body) :
        originalResponse.blob();

    return bodyPromise.then(function (body) {
        // new Response() 可同时支持 stream or Blob.
        return new Response(body, {
            headers: originalResponse.headers,
            status: originalResponse.status,
            statusText: originalResponse.statusText
        });
    });
};

var createCacheKey = function (originalUrl, paramName, paramValue,
    dontCacheBustUrlsMatching) {

    // 创建一个新的URL对象，避免影响原始URL
    var url = new URL(originalUrl);

    // 如果 dontCacheBustUrlsMatching 值没有设置，或是没有匹配到，将值拼接到url.serach后
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
        url.search += (url.search ? '&' : '') +
            encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
};

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // 如果 whitelist 是空数组，则认为全部都在白名单内
    if (whitelist.length === 0) {
        return true;
    }

    // 否则逐个匹配正则匹配并返回
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function (whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // 移除 hash; 查看 https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // 是否包含 '?'
        .split('&') // 分割成数组 'key=value' 的形式
        .map(function (kv) {
            return kv.split('='); // 分割每个 'key=value' 字符串成 [key, value] 形式
        })
        .filter(function (kv) {
            return ignoreUrlParametersMatching.every(function (ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // 如果 key 没有匹配到任何忽略参数正则，就 Return true
            });
        })
        .map(function (kv) {
            return kv.join('='); // 重新把 [key, value] 格式转换为 'key=value' 字符串
        })
        .join('&'); // 将所有参数 'key=value' 以 '&' 拼接

    return url.toString();
};


var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
    precacheConfig.map(function (item) {
        var relativeUrl = item[0];
        var hash = item[1];
        var absoluteUrl = new URL(relativeUrl, self.location);
        var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
        return [absoluteUrl.toString(), cacheKey];
    })
);

function setOfCachedUrls(cache) {
    return cache.keys().then(function (requests) {
        // 如果原cacheName中没有缓存任何收，就默认是首次安装，否则认为是SW更新
        if (requests && requests.length > 0) {
            firstRegister = 0; // SW更新
        }
        return requests.map(function (request) {
            return request.url;
        });
    }).then(function (urls) {
        return new Set(urls);
    });
}

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return setOfCachedUrls(cache).then(function (cachedUrls) {
                return Promise.all(
                    Array.from(urlsToCacheKeys.values()).map(function (cacheKey) {
                        // 如果缓存中没有匹配到cacheKey，添加进去
                        if (!cachedUrls.has(cacheKey)) {
                            var request = new Request(cacheKey, { credentials: 'same-origin' });
                            return fetch(request).then(function (response) {
                                // 只要返回200才能继续，否则直接抛错
                                if (!response.ok) {
                                    throw new Error('Request for ' + cacheKey + ' returned a ' +
                                        'response with status ' + response.status);
                                }

                                return cleanResponse(response).then(function (responseToCache) {
                                    return cache.put(cacheKey, responseToCache);
                                });
                            });
                        }
                    })
                );
            });
        })
            .then(function () {
            
            // 强制 SW 状态 installing -> activate
            return self.skipWaiting();
            
        })
    );
});

self.addEventListener('activate', function (event) {
    var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.keys().then(function (existingRequests) {
                return Promise.all(
                    existingRequests.map(function (existingRequest) {
                        // 删除原缓存中相同键值内容
                        if (!setOfExpectedUrls.has(existingRequest.url)) {
                            return cache.delete(existingRequest);
                        }
                    })
                );
            });
        }).then(function () {
            
            return self.clients.claim();
            
        }).then(function () {
                // 如果是首次安装 SW 时, 不发送更新消息（是否是首次安装，通过指定cacheName 中是否有缓存信息判断）
                // 如果不是首次安装，则是内容有更新，需要通知页面重载更新
                if (!firstRegister) {
                    return self.clients.matchAll()
                        .then(function (clients) {
                            if (clients && clients.length) {
                                clients.forEach(function (client) {
                                    client.postMessage('sw.update');
                                })
                            }
                        })
                }
            })
    );
});



    self.addEventListener('fetch', function (event) {
        if (event.request.method === 'GET') {

            // 是否应该 event.respondWith()，需要我们逐步的判断
            // 而且也方便了后期做特殊的特殊
            var shouldRespond;


            // 首先去除已配置的忽略参数及hash
            // 查看缓存简直中是否包含该请求，包含就将shouldRespond 设为true
            var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
            shouldRespond = urlsToCacheKeys.has(url);

            // 如果 shouldRespond 是 false, 我们在url后默认增加 'index.html'
            // (或者是你在配置文件中自行配置的 directoryIndex 参数值)，继续查找缓存列表
            var directoryIndex = 'index.html';
            if (!shouldRespond && directoryIndex) {
                url = addDirectoryIndex(url, directoryIndex);
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 仍是 false，检查是否是navigation
            // request， 如果是的话，判断是否能与 navigateFallbackWhitelist 正则列表匹配
            var navigateFallback = '';
            if (!shouldRespond &&
                navigateFallback &&
                (event.request.mode === 'navigate') &&
                isPathWhitelisted([], event.request.url)
            ) {
                url = new URL(navigateFallback, self.location).toString();
                shouldRespond = urlsToCacheKeys.has(url);
            }

            // 如果 shouldRespond 被置为 true
            // 则 event.respondWith()匹配缓存返回结果，匹配不成就直接请求.
            if (shouldRespond) {
                event.respondWith(
                    caches.open(cacheName).then(function (cache) {
                        return cache.match(urlsToCacheKeys.get(url)).then(function (response) {
                            if (response) {
                                return response;
                            }
                            throw Error('The cached response that was expected is missing.');
                        });
                    }).catch(function (e) {
                        // 如果捕获到异常错误，直接返回 fetch() 请求资源
                        console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                        return fetch(event.request);
                    })
                );
            }
        }
    });









/* eslint-enable */
