"use strict";(()=>{var k="safebanner_consent";function d(){try{let e=localStorage.getItem(k);return e?JSON.parse(e):null}catch{return null}}function m(e){try{localStorage.setItem(k,JSON.stringify(e))}catch{}}function x(){try{localStorage.removeItem(k)}catch{}}function f(){return d()!==null}var ye=[{pattern:/^_ga/,category:"analytics"},{pattern:/^_gid/,category:"analytics"},{pattern:/^_gat/,category:"analytics"},{pattern:/^__utm/,category:"analytics"},{pattern:/^_hjid/,category:"analytics"},{pattern:/^mp_/,category:"analytics"},{pattern:/^amplitude/,category:"analytics"},{pattern:/^plausible/,category:"analytics"},{pattern:/^_fbp/,category:"marketing"},{pattern:/^_fbc/,category:"marketing"},{pattern:/^fr$/,category:"marketing"},{pattern:/^_gcl/,category:"marketing"},{pattern:/^_pinterest/,category:"marketing"},{pattern:/^_tt_/,category:"marketing"},{pattern:/^li_/,category:"marketing"},{pattern:/^IDE$/,category:"marketing"},{pattern:/^ads$/,category:"marketing"}];function E(){let e=document.cookie.split(";").map(n=>n.trim().split("=")[0]),t=[];for(let n of e){if(!n)continue;let a="necessary";for(let{pattern:o,category:i}of ye)if(o.test(n)){a=i;break}t.push({name:n,category:a})}return t}function T(e){let n=E().filter(a=>a.category===e);for(let a of n)document.cookie=`${a.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,document.cookie=`${a.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`}function he(e){let t=e.primaryColor||"#2563eb",n=e.position==="top",a=e.position?.includes("-"),o=e.theme==="auto",i=e.theme==="dark",s=e.layout==="bar",r=e.layout==="card",l=e.offset??16,p=e.maxWidth,h=a||r?16:0,M=e.borderRadius??h,ie=e.buttonStyle==="pill"?9999:e.buttonStyle==="square"?0:e.borderRadius!=null?Math.max(4,Math.round(e.borderRadius*.5)):6,re=i?"#1f2937":"#ffffff",se=i?"#f9fafb":"#111827",w=i?"#d1d5db":"#6b7280",ce=i?"#374151":"#f3f4f6",le=i?"#f9fafb":"#374151",j=i?"#6b7280":"#9ca3af",C;if(r)C=`
      left: 50%;
      bottom: ${l}px;
      max-width: ${p??480}px;
      width: calc(100% - ${l*2}px);
      transform: translateX(-50%) translateY(12px);
    `;else if(a){let me=e.position?.includes("right")?`right: ${l}px;`:`left: ${l}px;`,fe=n?`top: ${l}px;`:`bottom: ${l}px;`;C=`${me} ${fe} max-width: 400px;`}else n?C=`top: 0; left: 0; right: 0;
      ${p?`max-width: ${p}px; margin-left: auto; margin-right: auto;`:""}`:C=`bottom: 0; left: 0; right: 0;
      ${p?`max-width: ${p}px; margin-left: auto; margin-right: auto;`:""}`;let de=r?"transform: translateX(-50%) translateY(12px);":`transform: translateY(${n?"-8px":"8px"});`,pe=r?"transform: translateX(-50%) translateY(0);":"transform: translateY(0);",ue=o?`
    @media (prefers-color-scheme: dark) {
      .cm-banner {
        background: #1f2937 !important;
        color: #f9fafb !important;
      }
      .cm-text { color: #d1d5db !important; }
      .cm-btn-secondary { background: #374151 !important; color: #f9fafb !important; }
      .cm-btn-link { color: #d1d5db !important; }
      .cm-label-required { color: #9ca3af !important; }
      .cm-powered-by, .cm-powered-by a { color: #6b7280 !important; }
      .cm-bar-text { color: #d1d5db !important; }
    }
  `:"",ge=s?`
    .cm-banner {
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 60px;
      flex-wrap: wrap;
    }
    .cm-bar-text {
      font-size: 13px;
      color: ${w};
      flex: 1;
      min-width: 160px;
    }
    .cm-buttons {
      flex-wrap: nowrap;
      gap: 8px;
    }
    .cm-btn {
      padding: 7px 14px;
      font-size: 13px;
      white-space: nowrap;
    }
    .cm-btn-link {
      padding: 7px 8px;
    }
  `:"";return`
    .cm-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 99998;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
    .cm-overlay.cm-visible {
      opacity: 1;
    }
    ${s?".cm-overlay { display: none; }":""}

    .cm-banner {
      position: fixed;
      ${C}
      background: ${re};
      color: ${se};
      padding: 24px 28px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18), 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      ${M>0?`border-radius: ${M}px;`:""}
      opacity: 0;
      ${de}
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .cm-banner.cm-visible {
      opacity: 1;
      ${pe}
    }

    .cm-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .cm-text {
      margin: 0 0 16px 0;
      color: ${w};
    }

    .cm-link {
      color: ${t};
      text-decoration: none;
    }
    .cm-link:hover {
      text-decoration: underline;
    }

    .cm-buttons {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .cm-btn {
      padding: 10px 20px;
      border-radius: ${ie}px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: opacity 0.2s ease;
    }
    .cm-btn:hover {
      opacity: 0.9;
    }

    .cm-btn-primary {
      background: ${t};
      color: #ffffff;
    }

    .cm-btn-secondary {
      background: ${ce};
      color: ${le};
    }

    .cm-btn-link {
      background: transparent;
      color: ${w};
      padding: 10px 12px;
    }

    .cm-categories {
      margin: 16px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .cm-category {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .cm-checkbox {
      width: 18px;
      height: 18px;
      accent-color: ${t};
    }

    .cm-checkbox:disabled {
      opacity: 0.5;
    }

    .cm-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .cm-label-text {
      font-weight: 500;
    }

    .cm-label-required {
      font-size: 12px;
      color: #9ca3af;
    }

    .cm-powered-by {
      margin-top: 12px;
      font-size: 11px;
      color: ${j};
    }

    .cm-powered-by a {
      color: ${j};
      text-decoration: none;
    }

    .cm-powered-by a:hover {
      text-decoration: underline;
    }

    .cm-logo {
      display: block;
      max-height: 32px;
      max-width: 120px;
      width: auto;
      margin-bottom: 12px;
      object-fit: contain;
    }

    ${ge}
    ${ue}
  `}function q(e){let t="consent-manager-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=he(e),document.head.appendChild(n)}var U=["en","fr","de"],I=["es","it","nl","pt","pl","sv","da","fi","cs","no","ro","hu","el","tr","uk","bg","hr","sk","sl","lt","lv","et","mt","ga","ca","eu","gl","is","sq","sr","bs","mk","ru","ar","he","ja","ko","zh","hi","id","ms","th","vi","fa"],O={en:{title:"Cookie Consent",description:"We use cookies to improve your experience and analyze site traffic.",preferencesTitle:"Cookie Preferences",preferencesDescription:"Choose which cookies you want to accept.",acceptAll:"Accept All",rejectAll:"Reject All",customize:"Customize",save:"Save Preferences",necessary:"Necessary",analytics:"Analytics",marketing:"Marketing",required:"(Required)",privacyPolicy:"Privacy Policy"},fr:{title:"Consentement aux cookies",description:"Nous utilisons des cookies pour am\xE9liorer votre exp\xE9rience et analyser le trafic.",preferencesTitle:"Pr\xE9f\xE9rences de cookies",preferencesDescription:"Choisissez les cookies que vous souhaitez accepter.",acceptAll:"Tout accepter",rejectAll:"Tout refuser",customize:"Personnaliser",save:"Enregistrer",necessary:"N\xE9cessaires",analytics:"Analytiques",marketing:"Marketing",required:"(Requis)",privacyPolicy:"Politique de confidentialit\xE9"},de:{title:"Cookie-Einwilligung",description:"Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren.",preferencesTitle:"Cookie-Einstellungen",preferencesDescription:"W\xE4hlen Sie, welche Cookies Sie akzeptieren m\xF6chten.",acceptAll:"Alle akzeptieren",rejectAll:"Alle ablehnen",customize:"Anpassen",save:"Speichern",necessary:"Notwendig",analytics:"Analyse",marketing:"Marketing",required:"(Erforderlich)",privacyPolicy:"Datenschutzrichtlinie"}},A={...O};function v(e){if(!e)return null;let t=e.toLowerCase().slice(0,2);return Ce(t)?t:null}function Ce(e){return U.includes(e)||I.includes(e)}function F(e){Object.assign(A,e)}function H(e){let t=v(e);return t?!!A[t]:!1}function W(e){let t=v(e);return t&&A[t]||O.en}function P(e){let t=v(e);return t?I.includes(t):!1}function K(e,t){let n=v(e);return n&&(U.includes(n)||t)?n:"en"}var c=null,g=null;function Y(e){try{let t=new URL(e,window.location.origin);return t.protocol==="http:"||t.protocol==="https:"?t.toString():null}catch{return null}}function J(e){return document.createTextNode(e)}function be(e){if(!e)return null;let t=Y(e);if(!t)return null;let n=document.createElement("img");return n.src=t,n.className="cm-logo",n.alt="",n.setAttribute("aria-hidden","true"),n}function D(){let e=document.createElement("div");e.className="cm-powered-by";let t=document.createElement("a");return t.href="https://www.safebanner.com/?ref=badge",t.target="_blank",t.rel="noopener noreferrer",t.textContent="Powered by SafeBanner",e.appendChild(t),e}function V(e,t){if(!e)return null;let n=Y(e);if(!n)return null;let a=document.createElement("a");return a.href=n,a.className="cm-link",a.target="_blank",a.rel="noopener noreferrer",a.textContent=t,a}function u(e,t,n){let a=document.createElement("button");return a.className=n,a.dataset.action=t,a.textContent=e,a}function B(e,t,n,a,o,i){let s=document.createElement("label");s.className="cm-category";let r=document.createElement("input");r.type="checkbox",r.className="cm-checkbox",r.dataset.category=e,r.checked=n,r.disabled=a;let l=document.createElement("span");l.className="cm-label";let p=document.createElement("span");if(p.className="cm-label-text",p.textContent=t,l.appendChild(p),o&&i){let h=document.createElement("span");h.className="cm-label-required",h.textContent=i,l.appendChild(h)}return s.appendChild(r),s.appendChild(l),s}function xe(e,t){let n=document.createDocumentFragment(),a=be(e.logoUrl);a&&n.appendChild(a);let o=document.createElement("div");o.className="cm-title",o.textContent=e.bannerTitle||t.title,n.appendChild(o);let i=document.createElement("p");i.className="cm-text",i.appendChild(J((e.bannerDescription||t.description)+" "));let s=V(e.privacyPolicyUrl,t.privacyPolicy);s&&i.appendChild(s),n.appendChild(i);let r=document.createElement("div");return r.className="cm-buttons",r.appendChild(u(e.acceptLabel||t.acceptAll,"accept-all","cm-btn cm-btn-primary")),r.appendChild(u(e.rejectLabel||t.rejectAll,"reject-all","cm-btn cm-btn-secondary")),r.appendChild(u(e.customizeLabel||t.customize,"customize","cm-btn cm-btn-link")),n.appendChild(r),e.showBranding!==!1&&n.appendChild(D()),n}function ve(e,t){let n=document.createDocumentFragment(),a=d(),o=document.createElement("div");o.className="cm-title",o.textContent=t.preferencesTitle,n.appendChild(o);let i=document.createElement("p");i.className="cm-text",i.appendChild(J(t.preferencesDescription+" "));let s=V(e.privacyPolicyUrl,t.privacyPolicy);s&&i.appendChild(s),n.appendChild(i);let r=document.createElement("div");r.className="cm-categories",r.appendChild(B("necessary",t.necessary,!0,!0,!0,t.required)),r.appendChild(B("analytics",t.analytics,a?.analytics??!1,!1,!1)),r.appendChild(B("marketing",t.marketing,a?.marketing??!1,!1,!1)),n.appendChild(r);let l=document.createElement("div");return l.className="cm-buttons",l.appendChild(u(e.saveLabel||t.save,"save","cm-btn cm-btn-primary")),l.appendChild(u(e.acceptLabel||t.acceptAll,"accept-all","cm-btn cm-btn-secondary")),n.appendChild(l),e.showBranding!==!1&&n.appendChild(D()),n}function Le(){let e=c?.querySelector('[data-category="analytics"]')?.checked??!1,t=c?.querySelector('[data-category="marketing"]')?.checked??!1;return{necessary:!0,analytics:e,marketing:t,timestamp:Date.now()}}function Se(e,t){let n=document.createDocumentFragment(),a=document.createElement("span");a.className="cm-bar-text",a.textContent=e.bannerDescription||t.description,n.appendChild(a);let o=document.createElement("div");return o.className="cm-buttons",o.appendChild(u(e.acceptLabel||t.acceptAll,"accept-all","cm-btn cm-btn-primary")),o.appendChild(u(e.rejectLabel||t.rejectAll,"reject-all","cm-btn cm-btn-secondary")),o.appendChild(u(e.customizeLabel||t.customize,"customize","cm-btn cm-btn-link")),n.appendChild(o),e.showBranding!==!1&&n.appendChild(D()),n}function b(e){q(e);let t=W(e.lang),n=e.layout==="bar";g=document.createElement("div"),g.className="cm-overlay",document.body.appendChild(g),c=document.createElement("div"),c.className="cm-banner",c.setAttribute("role","dialog"),c.setAttribute("aria-label",e.bannerTitle||t.title),c.appendChild(n?Se(e,t):xe(e,t)),document.body.appendChild(c),requestAnimationFrame(()=>{g?.classList.add("cm-visible"),c?.classList.add("cm-visible")}),c.addEventListener("click",a=>{let i=a.target.dataset.action;if(i)switch(i){case"accept-all":{let s={necessary:!0,analytics:!0,marketing:!0,timestamp:Date.now()};m(s),y(),e.onAccept?.(s);break}case"reject-all":{let s={necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()};m(s),y(),e.onDecline?.();break}case"customize":{c&&(c.textContent="",c.appendChild(ve(e,t)));break}case"save":{let s=Le();m(s),y(),e.onUpdate?.(s);break}}})}function y(){g?.classList.remove("cm-visible"),c?.classList.remove("cm-visible"),setTimeout(()=>{g?.remove(),c?.remove(),g=null,c=null},300)}function L(){return c!==null}var X=!1,_="advanced";function z(){return typeof window<"u"&&typeof window.gtag=="function"}function Q(e,t){if(z())try{window.gtag("consent",e,t)}catch(n){console.warn("[SafeBanner] Failed to send Google consent signal:",n)}}function Z(e,t){let n=e?.analytics??!1,a=e?.marketing??!1,o={analytics_storage:n?"granted":"denied",ad_storage:a?"granted":"denied",ad_user_data:a?"granted":"denied",ad_personalization:a?"granted":"denied"};return t==="advanced"&&!a&&(o.ads_data_redaction=!0),o}function $(e="advanced"){if(_=e,z()){let n=window.dataLayer;Array.isArray(n)&&n.some(o=>Array.isArray(o)&&o[0]==="consent")&&console.warn("[SafeBanner] Google consent signals detected before SafeBanner initialized. Ensure SafeBanner script loads BEFORE Google tags for proper consent handling.")}window.dataLayer=window.dataLayer||[],z()||(window.gtag=function(){window.dataLayer.push(arguments)});let t=Z(null,e);t.wait_for_update=500,Q("default",t),X=!0}function N(e){X||$(_);let t=Z(e,_);Q("update",t)}var ee='script[type="text/safebanner"]',te="data-safebanner-activated",we=["id","nonce","integrity","crossorigin","referrerpolicy"];function ke(){let e=[],t=document.querySelectorAll(ee);for(let n of t){if(n.hasAttribute(te))continue;let a=n.dataset.consent;if(a!=="analytics"&&a!=="marketing")continue;let o=n.dataset.src||null,i=!o&&n.textContent?n.textContent.trim():null;!o&&!i||e.push({element:n,category:a,src:o,inline:i})}return e}function Ee(e){let t=document.createElement("script"),n=e.element.dataset.type;n&&(t.type=n);for(let a of we){let o=e.element.getAttribute(a)||e.element.dataset[a];o&&t.setAttribute(a,o)}e.src?(t.src=e.src,e.element.hasAttribute("data-async")&&(t.async=!0),e.element.hasAttribute("data-defer")&&(t.defer=!0)):e.inline&&(t.textContent=e.inline),e.element.setAttribute(te,"true"),e.element.parentNode?.insertBefore(t,e.element.nextSibling)}function ne(e){let t=ke();for(let n of t)e[n.category]&&Ee(n)}function ae(){return document.querySelectorAll(ee).length>0}var G="safebanner_license:",Te=24*60*60*1e3,Ae=320;function Pe(){let e=document.currentScript;if(!e)return{};let t="advanced",n=e.dataset.googleConsent;return(n==="basic"||n==="off")&&(t=n),{position:e.dataset.position||"bottom",theme:e.dataset.theme||"light",primaryColor:e.dataset.color,companyName:e.dataset.company,privacyPolicyUrl:e.dataset.privacy,lang:e.dataset.lang,googleConsentMode:t,projectKey:e.dataset.projectKey,consentExpiryDays:e.dataset.consentExpiryDays!=null?parseInt(e.dataset.consentExpiryDays,10):void 0,layout:e.dataset.layout,maxWidth:e.dataset.maxWidth!=null?parseInt(e.dataset.maxWidth,10):void 0,offset:e.dataset.offset!=null?parseInt(e.dataset.offset,10):void 0,logoUrl:e.dataset.logo,borderRadius:e.dataset.radius!=null?parseInt(e.dataset.radius,10):void 0,buttonStyle:e.dataset.buttonStyle,bannerTitle:e.dataset.bannerTitle,bannerDescription:e.dataset.bannerDescription,acceptLabel:e.dataset.acceptLabel,rejectLabel:e.dataset.rejectLabel,customizeLabel:e.dataset.customizeLabel,saveLabel:e.dataset.saveLabel}}function oe(){return document.currentScript}function Be(){let e=oe();if(!e?.src)return null;try{return new URL("/api/validate-key",e.src).toString()}catch{return null}}function De(){let e=oe();if(!e?.src)return null;try{return new URL("/safebanner-pro-translations.json",e.src).toString()}catch{return null}}function _e(e){try{let t=localStorage.getItem(`${G}${e}`);if(!t)return null;let n=JSON.parse(t);return n.expiresAt<Date.now()?(localStorage.removeItem(`${G}${e}`),null):n.valid}catch{return null}}function ze(e,t){try{localStorage.setItem(`${G}${e}`,JSON.stringify({valid:t,expiresAt:Date.now()+Te}))}catch{}}var R=class{constructor(t={}){this.initialized=!1;this.googleConsentInitialized=!1;this.hasProLicense=!1;this.validationStarted=!1;this.proTranslationsPromise=null;this.consentChangeListeners=[];this.config={...Pe(),...t},this.requestedLanguage=this.config.lang,this.applyLicenseState(this.getCachedLicenseState()),this.initGoogleConsentMode(),this.validateProjectKey()}initGoogleConsentMode(){if(this.googleConsentInitialized||this.config.googleConsentMode==="off")return;let t=this.config.googleConsentMode==="basic"?"basic":"advanced";$(t),this.googleConsentInitialized=!0;let n=d();n&&N(n)}async init(){if(!this.initialized){if(this.initialized=!0,this.hasProLicense&&this.config.consentExpiryDays&&f()){let t=d();if(t){let n=this.config.consentExpiryDays*24*60*60*1e3;Date.now()-t.timestamp>n&&x()}}if(f()){this.enforceConsent();return}await this.ensureRequestedLanguageLoaded(),b(this.getBannerConfig())}}sendGoogleConsentUpdate(t){this.config.googleConsentMode!=="off"&&N(t)}getCachedLicenseState(){return this.config.projectKey?_e(this.config.projectKey)===!0:!1}applyLicenseState(t){this.hasProLicense=t,this.config.lang=K(this.requestedLanguage,t),this.config.showBranding=!t}async ensureRequestedLanguageLoaded(){if(!this.hasProLicense||!P(this.requestedLanguage)||H(this.requestedLanguage))return;if(this.proTranslationsPromise)return this.proTranslationsPromise;let t=De();if(t)return this.proTranslationsPromise=(async()=>{try{let n=await fetch(t,{mode:"cors"});if(!n.ok)return;let a=await n.json();F(a)}catch{}finally{this.proTranslationsPromise=null}})(),this.proTranslationsPromise}async validateProjectKey(){if(this.validationStarted||!this.config.projectKey)return;this.validationStarted=!0;let t=Be();if(t)try{let n=await fetch(t,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectKey:this.config.projectKey,hostname:window.location.hostname})});if(!n.ok)return;let o=(await n.json()).valid===!0;ze(this.config.projectKey,o),await this.upgradeLicenseState(o)}catch{}}async upgradeLicenseState(t){let n=this.config.lang,a=this.config.showBranding;if(this.applyLicenseState(t),await this.ensureRequestedLanguageLoaded(),t){if(this.config.consentExpiryDays&&f()){let s=d();if(s){let r=this.config.consentExpiryDays*24*60*60*1e3;Date.now()-s.timestamp>r&&x()}}this.enforceConsent()}if(!L())return;let o=a!==this.config.showBranding,i=n!==this.config.lang&&P(this.requestedLanguage);o&&!this.config.showBranding&&document.querySelector(".cm-powered-by")?.remove(),(o||i)&&(y(),window.setTimeout(()=>{f()||b(this.getBannerConfig())},Ae))}getBannerConfig(){if(!this.hasProLicense){let n=[this.config.layout&&"data-layout",this.config.logoUrl&&"data-logo",this.config.bannerTitle&&"data-banner-title",this.config.bannerDescription&&"data-banner-description",this.config.buttonStyle&&"data-button-style",this.config.theme==="auto"&&'data-theme="auto"',this.config.acceptLabel&&"data-accept-label",this.config.rejectLabel&&"data-reject-label",this.config.consentExpiryDays&&"data-consent-expiry-days"].filter(Boolean);n.length>0&&console.info(`[SafeBanner] ${n.join(", ")} require${n.length===1?"s":""} a Pro license and will be ignored. Upgrade at https://www.safebanner.com/upgrade`)}let t=this.hasProLicense?{layout:this.config.layout,theme:this.config.theme,maxWidth:this.config.maxWidth,offset:this.config.offset,logoUrl:this.config.logoUrl,borderRadius:this.config.borderRadius,buttonStyle:this.config.buttonStyle,bannerTitle:this.config.bannerTitle,bannerDescription:this.config.bannerDescription,acceptLabel:this.config.acceptLabel,rejectLabel:this.config.rejectLabel,customizeLabel:this.config.customizeLabel,saveLabel:this.config.saveLabel}:{layout:void 0,theme:this.config.theme==="auto"?"light":this.config.theme,maxWidth:void 0,offset:void 0,logoUrl:void 0,borderRadius:void 0,buttonStyle:void 0,bannerTitle:void 0,bannerDescription:void 0,acceptLabel:void 0,rejectLabel:void 0,customizeLabel:void 0,saveLabel:void 0};return{...this.config,...t,onAccept:n=>{this.sendGoogleConsentUpdate(n),this.enforceConsent(),this.config.onAccept?.(n)},onDecline:()=>{let n=d();n&&this.sendGoogleConsentUpdate(n),this.enforceConsent(),this.config.onDecline?.()},onUpdate:n=>{this.sendGoogleConsentUpdate(n),this.enforceConsent(),this.config.onUpdate?.(n)}}}enforceConsent(){let t=d();if(t){this.hasProLicense?(t.analytics||T("analytics"),t.marketing||T("marketing"),ne(t)):ae()&&console.info('[SafeBanner] Script blocking (type="text/safebanner") requires a Pro license. Upgrade at https://www.safebanner.com/upgrade');for(let n of this.consentChangeListeners)try{n(t)}catch{}}}getConsent(){return d()}hasConsented(){return f()}hasConsentFor(t){let n=d();return n?n[t]:t==="necessary"}updateConsent(t){let a={...d()||{necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()},...t,necessary:!0,timestamp:Date.now()};m(a),this.sendGoogleConsentUpdate(a),this.enforceConsent(),this.config.onUpdate?.(a)}reset(){x(),this.sendGoogleConsentUpdate({necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()}),L()||b(this.getBannerConfig())}show(){L()||b(this.getBannerConfig())}hide(){y()}onConsentChange(t){return this.consentChangeListeners.push(t),()=>{let n=this.consentChangeListeners.indexOf(t);n!==-1&&this.consentChangeListeners.splice(n,1)}}detectCookies(){return E()}},S=new R;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>S.init()):S.init();window.safeBanner=S;var Ve=S;})();
