"use strict";(()=>{var k="safebanner_consent";function d(){try{let e=localStorage.getItem(k);return e?JSON.parse(e):null}catch{return null}}function m(e){try{localStorage.setItem(k,JSON.stringify(e))}catch{}}function j(){try{localStorage.removeItem(k)}catch{}}function C(){return d()!==null}var ue=[{pattern:/^_ga/,category:"analytics"},{pattern:/^_gid/,category:"analytics"},{pattern:/^_gat/,category:"analytics"},{pattern:/^__utm/,category:"analytics"},{pattern:/^_hjid/,category:"analytics"},{pattern:/^mp_/,category:"analytics"},{pattern:/^amplitude/,category:"analytics"},{pattern:/^plausible/,category:"analytics"},{pattern:/^_fbp/,category:"marketing"},{pattern:/^_fbc/,category:"marketing"},{pattern:/^fr$/,category:"marketing"},{pattern:/^_gcl/,category:"marketing"},{pattern:/^_pinterest/,category:"marketing"},{pattern:/^_tt_/,category:"marketing"},{pattern:/^li_/,category:"marketing"},{pattern:/^IDE$/,category:"marketing"},{pattern:/^ads$/,category:"marketing"}];function w(){let e=document.cookie.split(";").map(n=>n.trim().split("=")[0]),t=[];for(let n of e){if(!n)continue;let a="necessary";for(let{pattern:o,category:r}of ue)if(o.test(n)){a=r;break}t.push({name:n,category:a})}return t}function E(e){let n=w().filter(a=>a.category===e);for(let a of n)document.cookie=`${a.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,document.cookie=`${a.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`}function ge(e){let t=e.primaryColor||"#2563eb",n=e.position==="top",a=e.position?.includes("-"),o=e.theme==="auto",r=e.theme==="dark",s=e.layout==="bar",i=e.layout==="card",l=e.offset??16,p=e.maxWidth,y=a||i?16:0,R=e.borderRadius??y,te=e.buttonStyle==="pill"?9999:e.buttonStyle==="square"?0:e.borderRadius!=null?Math.max(4,Math.round(e.borderRadius*.5)):6,ne=r?"#1f2937":"#ffffff",ae=r?"#f9fafb":"#111827",S=r?"#d1d5db":"#6b7280",oe=r?"#374151":"#f3f4f6",re=r?"#f9fafb":"#374151",M=r?"#6b7280":"#9ca3af",h;if(i)h=`
      left: 50%;
      bottom: ${l}px;
      max-width: ${p??480}px;
      width: calc(100% - ${l*2}px);
      transform: translateX(-50%) translateY(12px);
    `;else if(a){let de=e.position?.includes("right")?`right: ${l}px;`:`left: ${l}px;`,pe=n?`top: ${l}px;`:`bottom: ${l}px;`;h=`${de} ${pe} max-width: 400px;`}else n?h=`top: 0; left: 0; right: 0;
      ${p?`max-width: ${p}px; margin-left: auto; margin-right: auto;`:""}`:h=`bottom: 0; left: 0; right: 0;
      ${p?`max-width: ${p}px; margin-left: auto; margin-right: auto;`:""}`;let ie=i?"transform: translateX(-50%) translateY(12px);":`transform: translateY(${n?"-8px":"8px"});`,se=i?"transform: translateX(-50%) translateY(0);":"transform: translateY(0);",ce=o?`
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
  `:"",le=s?`
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
      color: ${S};
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
      ${h}
      background: ${ne};
      color: ${ae};
      padding: 24px 28px;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18), 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      ${R>0?`border-radius: ${R}px;`:""}
      opacity: 0;
      ${ie}
      transition: opacity 0.25s ease, transform 0.25s ease;
    }
    .cm-banner.cm-visible {
      opacity: 1;
      ${se}
    }

    .cm-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .cm-text {
      margin: 0 0 16px 0;
      color: ${S};
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
      border-radius: ${te}px;
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
      background: ${oe};
      color: ${re};
    }

    .cm-btn-link {
      background: transparent;
      color: ${S};
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
      color: ${M};
    }

    .cm-powered-by a {
      color: ${M};
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

    ${le}
    ${ce}
  `}function q(e){let t="consent-manager-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=ge(e),document.head.appendChild(n)}var U=["en","fr","de"],I=["es","it","nl","pt","pl","sv","da","fi","cs","no","ro","hu","el","tr","uk","bg","hr","sk","sl","lt","lv","et","mt","ga","ca","eu","gl","is","sq","sr","bs","mk","ru","ar","he","ja","ko","zh","hi","id","ms","th","vi","fa"],F={en:{title:"Cookie Consent",description:"We use cookies to improve your experience and analyze site traffic.",preferencesTitle:"Cookie Preferences",preferencesDescription:"Choose which cookies you want to accept.",acceptAll:"Accept All",rejectAll:"Reject All",customize:"Customize",save:"Save Preferences",necessary:"Necessary",analytics:"Analytics",marketing:"Marketing",required:"(Required)",privacyPolicy:"Privacy Policy"},fr:{title:"Consentement aux cookies",description:"Nous utilisons des cookies pour am\xE9liorer votre exp\xE9rience et analyser le trafic.",preferencesTitle:"Pr\xE9f\xE9rences de cookies",preferencesDescription:"Choisissez les cookies que vous souhaitez accepter.",acceptAll:"Tout accepter",rejectAll:"Tout refuser",customize:"Personnaliser",save:"Enregistrer",necessary:"N\xE9cessaires",analytics:"Analytiques",marketing:"Marketing",required:"(Requis)",privacyPolicy:"Politique de confidentialit\xE9"},de:{title:"Cookie-Einwilligung",description:"Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren.",preferencesTitle:"Cookie-Einstellungen",preferencesDescription:"W\xE4hlen Sie, welche Cookies Sie akzeptieren m\xF6chten.",acceptAll:"Alle akzeptieren",rejectAll:"Alle ablehnen",customize:"Anpassen",save:"Speichern",necessary:"Notwendig",analytics:"Analyse",marketing:"Marketing",required:"(Erforderlich)",privacyPolicy:"Datenschutzrichtlinie"}},T={...F};function x(e){if(!e)return null;let t=e.toLowerCase().slice(0,2);return me(t)?t:null}function me(e){return U.includes(e)||I.includes(e)}function O(e){Object.assign(T,e)}function H(e){let t=x(e);return t?!!T[t]:!1}function W(e){let t=x(e);return t&&T[t]||F.en}function A(e){let t=x(e);return t?I.includes(t):!1}function K(e,t){let n=x(e);return n&&(U.includes(n)||t)?n:"en"}var c=null,g=null;function J(e){try{let t=new URL(e,window.location.origin);return t.protocol==="http:"||t.protocol==="https:"?t.toString():null}catch{return null}}function Y(e){return document.createTextNode(e)}function fe(e){if(!e)return null;let t=J(e);if(!t)return null;let n=document.createElement("img");return n.src=t,n.className="cm-logo",n.alt="",n.setAttribute("aria-hidden","true"),n}function _(){let e=document.createElement("div");e.className="cm-powered-by";let t=document.createElement("a");return t.href="https://www.safebanner.com",t.target="_blank",t.rel="noopener noreferrer",t.textContent="Powered by SafeBanner",e.appendChild(t),e}function X(e,t){if(!e)return null;let n=J(e);if(!n)return null;let a=document.createElement("a");return a.href=n,a.className="cm-link",a.target="_blank",a.rel="noopener noreferrer",a.textContent=t,a}function u(e,t,n){let a=document.createElement("button");return a.className=n,a.dataset.action=t,a.textContent=e,a}function P(e,t,n,a,o,r){let s=document.createElement("label");s.className="cm-category";let i=document.createElement("input");i.type="checkbox",i.className="cm-checkbox",i.dataset.category=e,i.checked=n,i.disabled=a;let l=document.createElement("span");l.className="cm-label";let p=document.createElement("span");if(p.className="cm-label-text",p.textContent=t,l.appendChild(p),o&&r){let y=document.createElement("span");y.className="cm-label-required",y.textContent=r,l.appendChild(y)}return s.appendChild(i),s.appendChild(l),s}function ye(e,t){let n=document.createDocumentFragment(),a=fe(e.logoUrl);a&&n.appendChild(a);let o=document.createElement("div");o.className="cm-title",o.textContent=e.bannerTitle||t.title,n.appendChild(o);let r=document.createElement("p");r.className="cm-text",r.appendChild(Y((e.bannerDescription||t.description)+" "));let s=X(e.privacyPolicyUrl,t.privacyPolicy);s&&r.appendChild(s),n.appendChild(r);let i=document.createElement("div");return i.className="cm-buttons",i.appendChild(u(e.acceptLabel||t.acceptAll,"accept-all","cm-btn cm-btn-primary")),i.appendChild(u(e.rejectLabel||t.rejectAll,"reject-all","cm-btn cm-btn-secondary")),i.appendChild(u(e.customizeLabel||t.customize,"customize","cm-btn cm-btn-link")),n.appendChild(i),e.showBranding!==!1&&n.appendChild(_()),n}function he(e,t){let n=document.createDocumentFragment(),a=d(),o=document.createElement("div");o.className="cm-title",o.textContent=t.preferencesTitle,n.appendChild(o);let r=document.createElement("p");r.className="cm-text",r.appendChild(Y(t.preferencesDescription+" "));let s=X(e.privacyPolicyUrl,t.privacyPolicy);s&&r.appendChild(s),n.appendChild(r);let i=document.createElement("div");i.className="cm-categories",i.appendChild(P("necessary",t.necessary,!0,!0,!0,t.required)),i.appendChild(P("analytics",t.analytics,a?.analytics??!1,!1,!1)),i.appendChild(P("marketing",t.marketing,a?.marketing??!1,!1,!1)),n.appendChild(i);let l=document.createElement("div");return l.className="cm-buttons",l.appendChild(u(e.saveLabel||t.save,"save","cm-btn cm-btn-primary")),l.appendChild(u(e.acceptLabel||t.acceptAll,"accept-all","cm-btn cm-btn-secondary")),n.appendChild(l),e.showBranding!==!1&&n.appendChild(_()),n}function be(){let e=c?.querySelector('[data-category="analytics"]')?.checked??!1,t=c?.querySelector('[data-category="marketing"]')?.checked??!1;return{necessary:!0,analytics:e,marketing:t,timestamp:Date.now()}}function Ce(e,t){let n=document.createDocumentFragment(),a=document.createElement("span");a.className="cm-bar-text",a.textContent=e.bannerDescription||t.description,n.appendChild(a);let o=document.createElement("div");return o.className="cm-buttons",o.appendChild(u(e.acceptLabel||t.acceptAll,"accept-all","cm-btn cm-btn-primary")),o.appendChild(u(e.rejectLabel||t.rejectAll,"reject-all","cm-btn cm-btn-secondary")),o.appendChild(u(e.customizeLabel||t.customize,"customize","cm-btn cm-btn-link")),n.appendChild(o),e.showBranding!==!1&&n.appendChild(_()),n}function b(e){q(e);let t=W(e.lang),n=e.layout==="bar";g=document.createElement("div"),g.className="cm-overlay",document.body.appendChild(g),c=document.createElement("div"),c.className="cm-banner",c.setAttribute("role","dialog"),c.setAttribute("aria-label",e.bannerTitle||t.title),c.appendChild(n?Ce(e,t):ye(e,t)),document.body.appendChild(c),requestAnimationFrame(()=>{g?.classList.add("cm-visible"),c?.classList.add("cm-visible")}),c.addEventListener("click",a=>{let r=a.target.dataset.action;if(r)switch(r){case"accept-all":{let s={necessary:!0,analytics:!0,marketing:!0,timestamp:Date.now()};m(s),f(),e.onAccept?.(s);break}case"reject-all":{let s={necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()};m(s),f(),e.onDecline?.();break}case"customize":{c&&(c.textContent="",c.appendChild(he(e,t)));break}case"save":{let s=be();m(s),f(),e.onUpdate?.(s);break}}})}function f(){g?.classList.remove("cm-visible"),c?.classList.remove("cm-visible"),setTimeout(()=>{g?.remove(),c?.remove(),g=null,c=null},300)}function v(){return c!==null}var V=!1,z="advanced";function $(){return typeof window<"u"&&typeof window.gtag=="function"}function Q(e,t){if($())try{window.gtag("consent",e,t)}catch(n){console.warn("[SafeBanner] Failed to send Google consent signal:",n)}}function Z(e,t){let n=e?.analytics??!1,a=e?.marketing??!1,o={analytics_storage:n?"granted":"denied",ad_storage:a?"granted":"denied",ad_user_data:a?"granted":"denied",ad_personalization:a?"granted":"denied"};return t==="advanced"&&!a&&(o.ads_data_redaction=!0),o}function D(e="advanced"){if(z=e,$()){let n=window.dataLayer;Array.isArray(n)&&n.some(o=>Array.isArray(o)&&o[0]==="consent")&&console.warn("[SafeBanner] Google consent signals detected before SafeBanner initialized. Ensure SafeBanner script loads BEFORE Google tags for proper consent handling.")}window.dataLayer=window.dataLayer||[],$()||(window.gtag=function(){window.dataLayer.push(arguments)});let t=Z(null,e);t.wait_for_update=500,Q("default",t),V=!0}function B(e){V||D(z);let t=Z(e,z);Q("update",t)}var G="safebanner_license:",xe=24*60*60*1e3,ve=320;function Le(){let e=document.currentScript;if(!e)return{};let t="advanced",n=e.dataset.googleConsent;return(n==="basic"||n==="off")&&(t=n),{position:e.dataset.position||"bottom",theme:e.dataset.theme||"light",primaryColor:e.dataset.color,companyName:e.dataset.company,privacyPolicyUrl:e.dataset.privacy,lang:e.dataset.lang,googleConsentMode:t,projectKey:e.dataset.projectKey,layout:e.dataset.layout,maxWidth:e.dataset.maxWidth!=null?parseInt(e.dataset.maxWidth,10):void 0,offset:e.dataset.offset!=null?parseInt(e.dataset.offset,10):void 0,logoUrl:e.dataset.logo,borderRadius:e.dataset.radius!=null?parseInt(e.dataset.radius,10):void 0,buttonStyle:e.dataset.buttonStyle,bannerTitle:e.dataset.bannerTitle,bannerDescription:e.dataset.bannerDescription,acceptLabel:e.dataset.acceptLabel,rejectLabel:e.dataset.rejectLabel,customizeLabel:e.dataset.customizeLabel,saveLabel:e.dataset.saveLabel}}function ee(){return document.currentScript}function Se(){let e=ee();if(!e?.src)return null;try{return new URL("/api/validate-key",e.src).toString()}catch{return null}}function ke(){let e=ee();if(!e?.src)return null;try{return new URL("/safebanner-pro-translations.json",e.src).toString()}catch{return null}}function we(e){try{let t=localStorage.getItem(`${G}${e}`);if(!t)return null;let n=JSON.parse(t);return n.expiresAt<Date.now()?(localStorage.removeItem(`${G}${e}`),null):n.valid}catch{return null}}function Ee(e,t){try{localStorage.setItem(`${G}${e}`,JSON.stringify({valid:t,expiresAt:Date.now()+xe}))}catch{}}var N=class{constructor(t={}){this.initialized=!1;this.googleConsentInitialized=!1;this.hasProLicense=!1;this.validationStarted=!1;this.proTranslationsPromise=null;this.config={...Le(),...t},this.requestedLanguage=this.config.lang,this.applyLicenseState(this.getCachedLicenseState()),this.initGoogleConsentMode(),this.validateProjectKey()}initGoogleConsentMode(){if(this.googleConsentInitialized||this.config.googleConsentMode==="off")return;let t=this.config.googleConsentMode==="basic"?"basic":"advanced";D(t),this.googleConsentInitialized=!0;let n=d();n&&B(n)}async init(){if(!this.initialized){if(this.initialized=!0,C()){this.enforceConsent();return}await this.ensureRequestedLanguageLoaded(),b(this.getBannerConfig())}}sendGoogleConsentUpdate(t){this.config.googleConsentMode!=="off"&&B(t)}getCachedLicenseState(){return this.config.projectKey?we(this.config.projectKey)===!0:!1}applyLicenseState(t){this.hasProLicense=t,this.config.lang=K(this.requestedLanguage,t),this.config.showBranding=!t}async ensureRequestedLanguageLoaded(){if(!this.hasProLicense||!A(this.requestedLanguage)||H(this.requestedLanguage))return;if(this.proTranslationsPromise)return this.proTranslationsPromise;let t=ke();if(t)return this.proTranslationsPromise=(async()=>{try{let n=await fetch(t,{mode:"cors"});if(!n.ok)return;let a=await n.json();O(a)}catch{}finally{this.proTranslationsPromise=null}})(),this.proTranslationsPromise}async validateProjectKey(){if(this.validationStarted||!this.config.projectKey)return;this.validationStarted=!0;let t=Se();if(t)try{let n=await fetch(t,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectKey:this.config.projectKey,hostname:window.location.hostname})});if(!n.ok)return;let o=(await n.json()).valid===!0;Ee(this.config.projectKey,o),await this.upgradeLicenseState(o)}catch{}}async upgradeLicenseState(t){let n=this.config.lang,a=this.config.showBranding;if(this.applyLicenseState(t),await this.ensureRequestedLanguageLoaded(),!v())return;let o=a!==this.config.showBranding,r=n!==this.config.lang&&A(this.requestedLanguage);o&&!this.config.showBranding&&document.querySelector(".cm-powered-by")?.remove(),(o||r)&&(f(),window.setTimeout(()=>{C()||b(this.getBannerConfig())},ve))}getBannerConfig(){let t=this.hasProLicense?{layout:this.config.layout,theme:this.config.theme,maxWidth:this.config.maxWidth,offset:this.config.offset,logoUrl:this.config.logoUrl,borderRadius:this.config.borderRadius,buttonStyle:this.config.buttonStyle,bannerTitle:this.config.bannerTitle,bannerDescription:this.config.bannerDescription,acceptLabel:this.config.acceptLabel,rejectLabel:this.config.rejectLabel,customizeLabel:this.config.customizeLabel,saveLabel:this.config.saveLabel}:{layout:void 0,theme:this.config.theme==="auto"?"light":this.config.theme,maxWidth:void 0,offset:void 0,logoUrl:void 0,borderRadius:void 0,buttonStyle:void 0,bannerTitle:void 0,bannerDescription:void 0,acceptLabel:void 0,rejectLabel:void 0,customizeLabel:void 0,saveLabel:void 0};return{...this.config,...t,onAccept:n=>{this.sendGoogleConsentUpdate(n),this.enforceConsent(),this.config.onAccept?.(n)},onDecline:()=>{let n=d();n&&this.sendGoogleConsentUpdate(n),this.enforceConsent(),this.config.onDecline?.()},onUpdate:n=>{this.sendGoogleConsentUpdate(n),this.enforceConsent(),this.config.onUpdate?.(n)}}}enforceConsent(){let t=d();t&&(t.analytics||E("analytics"),t.marketing||E("marketing"))}getConsent(){return d()}hasConsented(){return C()}hasConsentFor(t){let n=d();return n?n[t]:t==="necessary"}updateConsent(t){let a={...d()||{necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()},...t,necessary:!0,timestamp:Date.now()};m(a),this.sendGoogleConsentUpdate(a),this.enforceConsent(),this.config.onUpdate?.(a)}reset(){j(),this.sendGoogleConsentUpdate({necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()}),v()||b(this.getBannerConfig())}show(){v()||b(this.getBannerConfig())}hide(){f()}detectCookies(){return w()}},L=new N;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>L.init()):L.init();window.safeBanner=L;var Ue=L;})();
