if(!self.define){let e,s={};const t=(t,c)=>(t=new URL(t+".js",c).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let a={};const r=e=>t(e,i),u={module:{uri:i},exports:a,require:r};s[i]=Promise.all(c.map((e=>u[e]||r(e)))).then((e=>(n(...e),a)))}}define(["./workbox-86a8e45e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"e5d89a1e29d8a83cce030e2492ff6f8f"},{url:"/_next/static/a3AkBIkNuYcmvbDIZ0WlW/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/a3AkBIkNuYcmvbDIZ0WlW/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/117-57358450b328244e.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/629-2d708475a98ff54e.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/app/_not-found/page-f7ffd76be1f78086.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/app/layout-cbd3ebdc4ecc5247.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/app/page-c7e4a592a39b5c44.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/fd9d1056-6152edd448f7ce34.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/main-0ca7801883311aae.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/main-app-226319d1030023c7.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-17abec1bd4bca978.js",revision:"a3AkBIkNuYcmvbDIZ0WlW"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:t,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:.*/,new e.NetworkFirst({cacheName:"https-calls",networkTimeoutSeconds:15,plugins:[]}),"GET")}));
