!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";try{self["workbox:precaching:5.1.1"]&&_()}catch(e){}},function(e,t,n){"use strict";try{self["workbox:core:5.1.1"]&&_()}catch(e){}},function(e,t,n){"use strict";n.r(t);n(1);const s=(e,...t)=>{let n=e;return t.length>0&&(n+=" :: "+JSON.stringify(t)),n};class r extends Error{constructor(e,t){super(s(e,t)),this.name=e,this.details=t}}n(0);const a=[],c={get:()=>a,add(e){a.push(...e)}};const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},o=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),l=e=>e||o(i.precache),h=new Set;const u=(e,t)=>e.filter(e=>t in e),f=async({request:e,mode:t,plugins:n=[]})=>{const s=u(n,"cacheKeyWillBeUsed");let r=e;for(const e of s)r=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:r}),"string"==typeof r&&(r=new Request(r));return r},d=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:r=[]})=>{const a=await self.caches.open(e),c=await f({plugins:r,request:t,mode:"read"});let i=await a.match(c,s);for(const t of r)if("cachedResponseWillBeUsed"in t){const r=t.cachedResponseWillBeUsed;i=await r.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:i,request:c})}return i},p=async({cacheName:e,request:t,response:n,event:s,plugins:a=[],matchOptions:c})=>{const i=await f({plugins:a,request:t,mode:"write"});if(!n)throw new r("cache-put-with-no-response",{url:(o=i.url,new URL(String(o),location.href).href.replace(new RegExp("^"+location.origin),""))});var o;const l=await(async({request:e,response:t,event:n,plugins:s=[]})=>{let r=t,a=!1;for(const t of s)if("cacheWillUpdate"in t){a=!0;const s=t.cacheWillUpdate;if(r=await s.call(t,{request:e,response:r,event:n}),!r)break}return a||(r=r&&200===r.status?r:void 0),r||null})({event:s,plugins:a,response:n,request:i});if(!l)return void 0;const p=await self.caches.open(e),y=u(a,"cacheDidUpdate"),w=y.length>0?await d({cacheName:e,matchOptions:c,request:i}):null;try{await p.put(i,l)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of h)await e()}(),e}for(const t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:s,oldResponse:w,newResponse:l,request:i})},y=async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=u(s,"fetchDidFail"),c=a.length>0?e.clone():null;try{for(const t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,r=e.clone();e=await s.call(t,{request:r,event:n})}}catch(e){throw new r("plugin-error-request-will-fetch",{thrownError:e})}const i=e.clone();try{let r;r="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(r=await e.fetchDidSucceed.call(e,{event:n,request:i,response:r}));return r}catch(e){0;for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:c.clone(),request:i.clone()});throw e}};let w;async function g(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},r=t?t(s):s,a=function(){if(void 0===w){const e=new Response("");if("body"in e)try{new Response(e.body),w=!0}catch(e){w=!1}w=!1}return w}()?n.body:await n.blob();return new Response(a,r)}function m(e){if(!e)throw new r("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new r("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),a=new URL(n,location.href);return s.searchParams.set("__WB_REVISION__",t),{cacheKey:s.href,url:a.href}}class v{constructor(e){this._cacheName=l(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const n of e){"string"==typeof n?t.push(n):n&&void 0===n.revision&&t.push(n.url);const{cacheKey:e,url:s}=m(n),a="string"!=typeof n&&n.revision?"reload":"default";if(this._urlsToCacheKeys.has(s)&&this._urlsToCacheKeys.get(s)!==e)throw new r("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(s),secondEntry:e});if("string"!=typeof n&&n.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==n.integrity)throw new r("add-to-cache-list-conflicting-integrities",{url:s});this._cacheKeysToIntegrities.set(e,n.integrity)}if(this._urlsToCacheKeys.set(s,e),this._urlsToCacheModes.set(s,a),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const n=[],s=[],r=await self.caches.open(this._cacheName),a=await r.keys(),c=new Set(a.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)c.has(t)?s.push(e):n.push({cacheKey:t,url:e});const i=n.map(({cacheKey:n,url:s})=>{const r=this._cacheKeysToIntegrities.get(n),a=this._urlsToCacheModes.get(s);return this._addURLToCache({cacheKey:n,cacheMode:a,event:e,integrity:r,plugins:t,url:s})});await Promise.all(i);return{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),n=new Set(this._urlsToCacheKeys.values()),s=[];for(const r of t)n.has(r.url)||(await e.delete(r),s.push(r.url));return{deletedURLs:s}}async _addURLToCache({cacheKey:e,url:t,cacheMode:n,event:s,plugins:a,integrity:c}){const i=new Request(t,{integrity:c,cache:n,credentials:"same-origin"});let o,l=await y({event:s,plugins:a,request:i});for(const e of a||[])"cacheWillUpdate"in e&&(o=e);if(!(o?await o.cacheWillUpdate({event:s,request:i,response:l}):l.status<400))throw new r("bad-precaching-response",{url:t,status:l.status});l.redirected&&(l=await g(l)),await p({event:s,plugins:a,response:l,request:e===t?i:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,n=this.getCacheKeyForURL(t);if(n){return(await self.caches.open(this._cacheName)).match(n)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new r("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(n){if(e)return fetch(t);throw n}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new r("non-precached-url",{url:e});const n=this.createHandler(t),s=new Request(e);return()=>n({request:s})}}let R;const _=()=>(R||(R=new v),R);const U=(e,t)=>{const n=_().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:r}={}){const a=new URL(e,location.href);a.hash="",yield a.href;const c=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(a,t);if(yield c.href,n&&c.pathname.endsWith("/")){const e=new URL(c.href);e.pathname+=n,yield e.href}if(s){const e=new URL(c.href);e.pathname+=".html",yield e.href}if(r){const e=r({url:a});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let L=!1;function q(e){L||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:n=!0,urlManipulation:s}={})=>{const r=l();self.addEventListener("fetch",a=>{const c=U(a.request.url,{cleanURLs:n,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:s});if(!c)return void 0;let i=self.caches.open(r).then(e=>e.match(c)).then(e=>e||fetch(c));a.respondWith(i)})})(e),L=!0)}const T=e=>{const t=_(),n=c.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},K=e=>{const t=_();e.waitUntil(t.activate())};var b;(function(e){_().addToCacheList(e),e.length>0&&(self.addEventListener("install",T),self.addEventListener("activate",K))})([{'revision':'1179d65d7f2f6bfc56e5ed4fedd1425d','url':'./index.html'},{'revision':'14fec297d548e1492c6bd4f346e4e070','url':'css/account.81ecb1.css'},{'revision':'19c807ce839711785dbb60ba6be6418c','url':'css/app-details.8be57b.css'},{'revision':'1964e52f7ddb8f05d5bc346b1853cff5','url':'css/app.debef3.css'},{'revision':'43ecaaed4301543ef733822b9266ae35','url':'css/vendors~app.ffeb36.css'},{'revision':'1dfb73e22b9119f547fb880568f56ea2','url':'fonts/Framework7Icons-Regular.1dfb73.woff2'},{'revision':'3b973a05c0e1544f7ee8fa23c2a9315a','url':'fonts/Framework7Icons-Regular.3b973a.ttf'},{'revision':'535bcf7dd3feb41ec20507c3c5b81efb','url':'fonts/Framework7Icons-Regular.535bcf.woff'},{'revision':'9ee96e3a07dec6235d3f1a86787a92b7','url':'fonts/Framework7Icons-Regular.9ee96e.eot'},{'revision':'76ae6f48bb698ca0d7360288e447bc29','url':'images/arcade.76ae6f.jpg'},{'revision':'2018f571b496098d68cde8a73467e9b1','url':'images/avatar.2018f5.jpg'},{'revision':'1c095e5ef4d158f76de5fabb57456376','url':'js/404.f038c5.js'},{'revision':'a8240b78b05dc7f041f6ba5c81a3b039','url':'js/account.81ecb1.js'},{'revision':'08867e9940ee782c7eefac2523ae38e9','url':'js/app-details.8be57b.js'},{'revision':'0794feac72738d51ce169068868b829a','url':'js/app.debef3.js'},{'revision':'0310982d96f567afd5d9d3d27a80d4c8','url':'js/vendors~app.ffeb36.js'},{'revision':'e88a3e95b5364d46e95b35ae8c0dc27d','url':'js/vendors~app.ffeb36.js.LICENSE.txt'},{'revision':'8adadf50084fd937cf00c11f9056915a','url':'manifest.json'},{'revision':'e2cc99ba6d09c39570471cae78ec77ca','url':'static/apps-images/amazon-shopping-made-easy-icon.jpg'},{'revision':'6a7e4701f9710e57d1f822427d7164c2','url':'static/apps-images/brain-test-tricky-puzzles-icon.jpg'},{'revision':'b8e26aa684b5abeb1f597ff20924ce32','url':'static/apps-images/call-of-duty-mobile-icon.jpg'},{'revision':'8e7534e7771a40f0c3662a86eb9365e0','url':'static/apps-images/chores-icon.jpg'},{'revision':'bd79edbaf1ca2c95777d5a637574be66','url':'static/apps-images/crossy-road-icon.jpg'},{'revision':'9a9555abd91df30f9c6d12bc031c809e','url':'static/apps-images/cut-and-paint-icon.jpg'},{'revision':'c16d609df244b0b85f53e3a4da1afcb0','url':'static/apps-images/dentist-bling-icon.jpg'},{'revision':'9deb9c266f4b2e6fe7d05c3c7d625818','url':'static/apps-images/draw-climber-icon.jpg'},{'revision':'355f542605855c5f3d53acabcea39c77','url':'static/apps-images/facebook-icon.jpg'},{'revision':'8fbdc8c62c26518af44921d521b04563','url':'static/apps-images/gmail-email-by-google-icon.jpg'},{'revision':'107795bfbdb71004ce74574f53b3ef4b','url':'static/apps-images/instagram-icon.jpg'},{'revision':'772f3af1b6c90c11cf097b80441adee4','url':'static/apps-images/its-literally-just-mowing-icon.jpg'},{'revision':'5ac2f3f76a3fe2c20ca729c28297565e','url':'static/apps-images/johnny-trigger-icon.jpg'},{'revision':'03bce926dc2cf764d24cb3d1927bbefe','url':'static/apps-images/lucky-looter-icon.jpg'},{'revision':'86de73779fbab149d5c770a29aa70b50','url':'static/apps-images/messenger-icon.jpg'},{'revision':'e6fae5faba1ab4f169deeca71e781edc','url':'static/apps-images/netflix-icon.jpg'},{'revision':'b1b349bd0d4a15cc4bddfa0fb0e70b97','url':'static/apps-images/overtake-icon.jpg'},{'revision':'95af9b14bf3a539910cdd08a4e536f9c','url':'static/apps-images/picsart-photo-editor-collage-icon.jpg'},{'revision':'d941afd60e5f73708dad2fc4528a5d69','url':'static/apps-images/pushem-all-icon.jpg'},{'revision':'3bd119dd429142854c33b8e15722d16d','url':'static/apps-images/slap-kings-icon.jpg'},{'revision':'dc8c964207ffc825943f20d5aef434e6','url':'static/apps-images/slap-that-winner-slaps-all-icon.jpg'},{'revision':'8ade2987633a6c8f749a8d41583900b1','url':'static/apps-images/snapchat-icon.jpg'},{'revision':'0e6c7a8ac1ad1b2378be3fe39d8c13ff','url':'static/apps-images/the-seven-deadly-sins-icon.jpg'},{'revision':'1845e89c4cd24bb2a9b84a82f1f86c3e','url':'static/apps-images/tiktok-make-your-day-icon.jpg'},{'revision':'1a0bb52715b4516e626d409eda308508','url':'static/apps-images/trivia-io-icon.jpg'},{'revision':'d117190434c7793dfdffde03124331b9','url':'static/apps-images/will-it-shred-icon.jpg'},{'revision':'b2744999c448d2e99a5d4a8dd23fb590','url':'static/apps-images/youtube-watch-listen-stream-icon.jpg'},{'revision':'b2530c0335524a2a8865dd50ec5dc5b1','url':'static/icons/128x128.png'},{'revision':'685cbce053438636920b11fc09cb8040','url':'static/icons/144x144.png'},{'revision':'518980bbfab8de50b34611102dd34f9b','url':'static/icons/152x152.png'},{'revision':'997fcb9cfe01b1cd24c8cd10e6b50546','url':'static/icons/192x192.png'},{'revision':'bac75d4f8d23c7fb106431226184de69','url':'static/icons/256x256.png'},{'revision':'a5ee51720fba847f86bc4abef04f492e','url':'static/icons/512x512.png'},{'revision':'6aea0b42ebc46963b3ac819b259b799d','url':'static/icons/apple-splash-1125x2436.png'},{'revision':'db16c8ceb1d5eb9f7bacba394e5c845b','url':'static/icons/apple-splash-1242x2208.png'},{'revision':'13fc4cc45b844c8a7d412cfc07dc20cb','url':'static/icons/apple-splash-1536x2048.png'},{'revision':'cc60b735593b00465ec8962cb7e12611','url':'static/icons/apple-splash-1668x2224.png'},{'revision':'c59901a82324090222e67baa5c559219','url':'static/icons/apple-splash-2048x2732.png'},{'revision':'ad2a10f4422df06c034b7a635c215587','url':'static/icons/apple-splash-640x1136.png'},{'revision':'588ba443da14dc3b978d72b316a7f219','url':'static/icons/apple-splash-750x1334.png'},{'revision':'8fb69eb3e78506d6a0b2cd44a9a272b4','url':'static/icons/apple-touch-icon.png'},{'revision':'7714917ef0e27a2cad66b151f4f3068d','url':'static/icons/favicon.png'}]||[]),q(b),self.addEventListener("install",(function(e){self.skipWaiting()})),self.addEventListener("message",(function(e){if("skipWaiting"===e.data)return self.skipWaiting()}))}]);
//# sourceMappingURL=service-worker.js.map