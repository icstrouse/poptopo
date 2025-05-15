// @capacitor/core@5.7.8 downloaded from https://ga.jspm.io/npm:@capacitor/core@5.7.8/dist/index.js

const createCapacitorPlatforms=e=>{const t=new Map;t.set("web",{name:"web"});const n=e.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t};const addPlatform=(e,t)=>{n.platforms.set(e,t)};const setPlatform=e=>{n.platforms.has(e)&&(n.currentPlatform=n.platforms.get(e))};n.addPlatform=addPlatform;n.setPlatform=setPlatform;return n};const initPlatforms=e=>e.CapacitorPlatforms=createCapacitorPlatforms(e)
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */;const e=initPlatforms(typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:{});
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */const t=e.addPlatform;
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */const n=e.setPlatform;const legacyRegisterWebPlugin=(e,t)=>{var n;const o=t.config;const s=e.Plugins;if(!(o===null||o===void 0?void 0:o.name))throw new Error('Capacitor WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."');console.warn(`Capacitor plugin "${o.name}" is using the deprecated "registerWebPlugin()" function`);s[o.name]&&!((n=o===null||o===void 0?void 0:o.platforms)===null||n===void 0?void 0:n.includes(e.getPlatform()))||(s[o.name]=t)};var o;(function(e){e.Unimplemented="UNIMPLEMENTED";e.Unavailable="UNAVAILABLE"})(o||(o={}));class CapacitorException extends Error{constructor(e,t,n){super(e);this.message=e;this.code=t;this.data=n}}const getPlatformId=e=>{var t,n;return(e===null||e===void 0?void 0:e.androidBridge)?"android":((n=(t=e===null||e===void 0?void 0:e.webkit)===null||t===void 0?void 0:t.messageHandlers)===null||n===void 0?void 0:n.bridge)?"ios":"web"};const createCapacitor=e=>{var t,n,s,i,r;const a=e.CapacitorCustomPlatform||null;const c=e.Capacitor||{};const l=c.Plugins=c.Plugins||{};
/**
     * @deprecated Use `capCustomPlatform` instead, default functions like registerPlugin will function with the new object.
     */const d=e.CapacitorPlatforms;const defaultGetPlatform=()=>a!==null?a.name:getPlatformId(e);const u=((t=d===null||d===void 0?void 0:d.currentPlatform)===null||t===void 0?void 0:t.getPlatform)||defaultGetPlatform;const defaultIsNativePlatform=()=>u()!=="web";const p=((n=d===null||d===void 0?void 0:d.currentPlatform)===null||n===void 0?void 0:n.isNativePlatform)||defaultIsNativePlatform;const defaultIsPluginAvailable=e=>{const t=g.get(e);return!!(t===null||t===void 0?void 0:t.platforms.has(u()))||!!f(e)};const m=((s=d===null||d===void 0?void 0:d.currentPlatform)===null||s===void 0?void 0:s.isPluginAvailable)||defaultIsPluginAvailable;const defaultGetPluginHeader=e=>{var t;return(t=c.PluginHeaders)===null||t===void 0?void 0:t.find((t=>t.name===e))};const f=((i=d===null||d===void 0?void 0:d.currentPlatform)===null||i===void 0?void 0:i.getPluginHeader)||defaultGetPluginHeader;const handleError=t=>e.console.error(t);const pluginMethodNoop=(e,t,n)=>Promise.reject(`${n} does not have an implementation of "${t}".`);const g=new Map;const defaultRegisterPlugin=(e,t={})=>{const n=g.get(e);if(n){console.warn(`Capacitor plugin "${e}" already registered. Cannot register plugins twice.`);return n.proxy}const s=u();const i=f(e);let r;const loadPluginImplementation=async()=>{!r&&s in t?r=r=typeof t[s]==="function"?await t[s]():t[s]:a!==null&&!r&&"web"in t&&(r=r=typeof t.web==="function"?await t.web():t.web);return r};const createPluginMethod=(t,n)=>{var r,a;if(!i){if(t)return(a=t[n])===null||a===void 0?void 0:a.bind(t);throw new CapacitorException(`"${e}" plugin is not implemented on ${s}`,o.Unimplemented)}{const o=i===null||i===void 0?void 0:i.methods.find((e=>n===e.name));if(o)return o.rtype==="promise"?t=>c.nativePromise(e,n.toString(),t):(t,o)=>c.nativeCallback(e,n.toString(),t,o);if(t)return(r=t[n])===null||r===void 0?void 0:r.bind(t)}};const createPluginMethodWrapper=t=>{let n;const wrapper=(...i)=>{const r=loadPluginImplementation().then((r=>{const a=createPluginMethod(r,t);if(a){const e=a(...i);n=e===null||e===void 0?void 0:e.remove;return e}throw new CapacitorException(`"${e}.${t}()" is not implemented on ${s}`,o.Unimplemented)}));t==="addListener"&&(r.remove=async()=>n());return r};wrapper.toString=()=>`${t.toString()}() { [capacitor code] }`;Object.defineProperty(wrapper,"name",{value:t,writable:false,configurable:false});return wrapper};const d=createPluginMethodWrapper("addListener");const p=createPluginMethodWrapper("removeListener");const addListenerNative=(e,t)=>{const n=d({eventName:e},t);const remove=async()=>{const o=await n;p({eventName:e,callbackId:o},t)};const o=new Promise((e=>n.then((()=>e({remove:remove})))));o.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated.");await remove()};return o};const m=new Proxy({},{get(e,t){switch(t){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return i?addListenerNative:d;case"removeListener":return p;default:return createPluginMethodWrapper(t)}}});l[e]=m;g.set(e,{name:e,proxy:m,platforms:new Set([...Object.keys(t),...i?[s]:[]])});return m};const w=((r=d===null||d===void 0?void 0:d.currentPlatform)===null||r===void 0?void 0:r.registerPlugin)||defaultRegisterPlugin;c.convertFileSrc||(c.convertFileSrc=e=>e);c.getPlatform=u;c.handleError=handleError;c.isNativePlatform=p;c.isPluginAvailable=m;c.pluginMethodNoop=pluginMethodNoop;c.registerPlugin=w;c.Exception=CapacitorException;c.DEBUG=!!c.DEBUG;c.isLoggingEnabled=!!c.isLoggingEnabled;c.platform=c.getPlatform();c.isNative=c.isNativePlatform();return c};const initCapacitorGlobal=e=>e.Capacitor=createCapacitor(e);const s=initCapacitorGlobal(typeof globalThis!=="undefined"?globalThis:typeof self!=="undefined"?self:typeof window!=="undefined"?window:typeof global!=="undefined"?global:{});const i=s.registerPlugin;
/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */const r=s.Plugins;
/**
 * Provided for backwards compatibility. Use the registerPlugin() API
 * instead, and provide the web plugin as the "web" implmenetation.
 * For example
 *
 * export const Example = registerPlugin('Example', {
 *   web: () => import('./web').then(m => new m.Example())
 * })
 *
 * @deprecated Deprecated in v3, will be removed from v4.
 */const registerWebPlugin=e=>legacyRegisterWebPlugin(s,e);class WebPlugin{constructor(e){this.listeners={};this.windowListeners={};if(e){console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`);this.config=e}}addListener(e,t){const n=this.listeners[e];n||(this.listeners[e]=[]);this.listeners[e].push(t);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o);const remove=async()=>this.removeListener(e,t);const s=Promise.resolve({remove:remove});Object.defineProperty(s,"remove",{value:async()=>{console.warn("Using addListener() without 'await' is deprecated.");await remove()}});return s}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t){const n=this.listeners[e];n&&n.forEach((e=>e(t)))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:false,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e="not implemented"){return new s.Exception(e,o.Unimplemented)}unavailable(e="not available"){return new s.Exception(e,o.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const o=n.indexOf(t);this.listeners[e].splice(o,1);this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler);e.registered=true}removeWindowListener(e){if(e){window.removeEventListener(e.windowEventName,e.handler);e.registered=false}}}const a=i("WebView");
/**
 * Safely web encode a string value (inspired by js-cookie)
 * @param str The string value to encode
 */const encode=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape)
/**
 * Safely web decode a string value (inspired by js-cookie)
 * @param str The string value to decode
 */;const decode=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class CapacitorCookiesPluginWeb extends WebPlugin{async getCookies(){const e=document.cookie;const t={};e.split(";").forEach((e=>{if(e.length<=0)return;let[n,o]=e.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=decode(n).trim();o=decode(o).trim();t[n]=o}));return t}async setCookie(e){try{const t=encode(e.key);const n=encode(e.value);const o=`; expires=${(e.expires||"").replace("expires=","")}`;const s=(e.path||"/").replace("path=","");const i=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${n||""}${o}; path=${s}; ${i};`}catch(e){return Promise.reject(e)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(e){return Promise.reject(e)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}const c=i("CapacitorCookies",{web:()=>new CapacitorCookiesPluginWeb});
/**
 * Read in a Blob value and return it as a base64 string
 * @param blob The blob value to convert to a base64 string
 */const readBlobAsBase64=async e=>new Promise(((t,n)=>{const o=new FileReader;o.onload=()=>{const e=o.result;t(e.indexOf(",")>=0?e.split(",")[1]:e)};o.onerror=e=>n(e);o.readAsDataURL(e)}))
/**
 * Normalize an HttpHeaders map by lowercasing all of the values
 * @param headers The HttpHeaders object to normalize
 */;const normalizeHttpHeaders=(e={})=>{const t=Object.keys(e);const n=Object.keys(e).map((e=>e.toLocaleLowerCase()));const o=n.reduce(((n,o,s)=>{n[o]=e[t[s]];return n}),{});return o};
/**
 * Builds a string of url parameters that
 * @param params A map of url parameters
 * @param shouldEncode true if you should encodeURIComponent() the values (true by default)
 */const buildUrlParams=(e,t=true)=>{if(!e)return null;const n=Object.entries(e).reduce(((e,n)=>{const[o,s]=n;let i;let r;if(Array.isArray(s)){r="";s.forEach((e=>{i=t?encodeURIComponent(e):e;r+=`${o}=${i}&`}));r.slice(0,-1)}else{i=t?encodeURIComponent(s):s;r=`${o}=${i}`}return`${e}&${r}`}),"");return n.substr(1)};
/**
 * Build the RequestInit object based on the options passed into the initial request
 * @param options The Http plugin options
 * @param extra Any extra RequestInit values
 */const buildRequestInit=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t);const o=normalizeHttpHeaders(e.headers);const s=o["content-type"]||"";if(typeof e.data==="string")n.body=e.data;else if(s.includes("application/x-www-form-urlencoded")){const t=new URLSearchParams;for(const[n,o]of Object.entries(e.data||{}))t.set(n,o);n.body=t.toString()}else if(s.includes("multipart/form-data")||e.data instanceof FormData){const t=new FormData;if(e.data instanceof FormData)e.data.forEach(((e,n)=>{t.append(n,e)}));else for(const n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;const o=new Headers(n.headers);o.delete("content-type");n.headers=o}else(s.includes("application/json")||typeof e.data==="object")&&(n.body=JSON.stringify(e.data));return n};class CapacitorHttpPluginWeb extends WebPlugin{
/**
     * Perform an Http request given a set of options
     * @param options Options to build the HTTP request
     */
async request(e){const t=buildRequestInit(e,e.webFetchExtra);const n=buildUrlParams(e.params,e.shouldEncodeUrlParams);const o=n?`${e.url}?${n}`:e.url;const s=await fetch(o,t);const i=s.headers.get("content-type")||"";let{responseType:r="text"}=s.ok?e:{};i.includes("application/json")&&(r="json");let a;let c;switch(r){case"arraybuffer":case"blob":c=await s.blob();a=await readBlobAsBase64(c);break;case"json":a=await s.json();break;case"document":case"text":default:a=await s.text()}const l={};s.headers.forEach(((e,t)=>{l[t]=e}));return{data:a,headers:l,status:s.status,url:s.url}}
/**
     * Perform an Http GET request given a set of options
     * @param options Options to build the HTTP request
     */async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}
/**
     * Perform an Http POST request given a set of options
     * @param options Options to build the HTTP request
     */async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}
/**
     * Perform an Http PUT request given a set of options
     * @param options Options to build the HTTP request
     */async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}
/**
     * Perform an Http PATCH request given a set of options
     * @param options Options to build the HTTP request
     */async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}
/**
     * Perform an Http DELETE request given a set of options
     * @param options Options to build the HTTP request
     */async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}const l=i("CapacitorHttp",{web:()=>new CapacitorHttpPluginWeb});export{s as Capacitor,c as CapacitorCookies,CapacitorException,l as CapacitorHttp,e as CapacitorPlatforms,o as ExceptionCode,r as Plugins,WebPlugin,a as WebView,t as addPlatform,buildRequestInit,i as registerPlugin,registerWebPlugin,n as setPlatform};

