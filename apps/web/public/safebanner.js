"use strict";(()=>{var v="safebanner_consent";function l(){try{let t=localStorage.getItem(v);return t?JSON.parse(t):null}catch{return null}}function g(t){try{localStorage.setItem(v,JSON.stringify(t))}catch{}}function N(){try{localStorage.removeItem(v)}catch{}}function y(){return l()!==null}var F=[{pattern:/^_ga/,category:"analytics"},{pattern:/^_gid/,category:"analytics"},{pattern:/^_gat/,category:"analytics"},{pattern:/^__utm/,category:"analytics"},{pattern:/^_hjid/,category:"analytics"},{pattern:/^mp_/,category:"analytics"},{pattern:/^amplitude/,category:"analytics"},{pattern:/^plausible/,category:"analytics"},{pattern:/^_fbp/,category:"marketing"},{pattern:/^_fbc/,category:"marketing"},{pattern:/^fr$/,category:"marketing"},{pattern:/^_gcl/,category:"marketing"},{pattern:/^_pinterest/,category:"marketing"},{pattern:/^_tt_/,category:"marketing"},{pattern:/^li_/,category:"marketing"},{pattern:/^IDE$/,category:"marketing"},{pattern:/^ads$/,category:"marketing"}];function x(){let t=document.cookie.split(";").map(n=>n.trim().split("=")[0]),e=[];for(let n of t){if(!n)continue;let a="necessary";for(let{pattern:o,category:i}of F)if(o.test(n)){a=i;break}e.push({name:n,category:a})}return e}function S(t){let n=x().filter(a=>a.category===t);for(let a of n)document.cookie=`${a.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,document.cookie=`${a.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`}function H(t){let e=t.primaryColor||"#2563eb",n=t.position==="top",a=t.position?.includes("-");return`
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

    .cm-banner {
      position: fixed;
      ${n?"top: 0;":"bottom: 0;"}
      ${a?`${t.position?.includes("right")?"right: 16px;":"left: 16px;"} max-width: 400px;`:"left: 0; right: 0;"}
      ${a?n?"top: 16px;":"bottom: 16px;":""}
      background: ${t.theme==="dark"?"#1f2937":"#ffffff"};
      color: ${t.theme==="dark"?"#f9fafb":"#111827"};
      padding: 24px 28px;
      box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15), 0 -2px 8px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      ${a?"border-radius: 12px;":""}
      opacity: 0;
      transform: translateY(${n?"-8px":"8px"});
      transition: opacity 0.2s ease, transform 0.2s ease;
    }
    .cm-banner.cm-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .cm-title {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 8px 0;
    }

    .cm-text {
      margin: 0 0 16px 0;
      color: ${t.theme==="dark"?"#d1d5db":"#6b7280"};
    }

    .cm-link {
      color: ${e};
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
      border-radius: 6px;
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
      background: ${e};
      color: #ffffff;
    }

    .cm-btn-secondary {
      background: ${t.theme==="dark"?"#374151":"#f3f4f6"};
      color: ${t.theme==="dark"?"#f9fafb":"#374151"};
    }

    .cm-btn-link {
      background: transparent;
      color: ${t.theme==="dark"?"#d1d5db":"#6b7280"};
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
      accent-color: ${e};
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
      color: ${t.theme==="dark","#9ca3af"};
    }

    .cm-powered-by {
      margin-top: 12px;
      font-size: 11px;
      color: ${t.theme==="dark"?"#6b7280":"#9ca3af"};
    }

    .cm-powered-by a {
      color: ${t.theme==="dark"?"#6b7280":"#9ca3af"};
      text-decoration: none;
    }

    .cm-powered-by a:hover {
      text-decoration: underline;
    }
  `}function G(t){let e="consent-manager-styles";if(document.getElementById(e))return;let n=document.createElement("style");n.id=e,n.textContent=H(t),document.head.appendChild(n)}var M={en:{title:"Cookie Consent",description:"We use cookies to improve your experience and analyze site traffic.",preferencesTitle:"Cookie Preferences",preferencesDescription:"Choose which cookies you want to accept.",acceptAll:"Accept All",rejectAll:"Reject All",customize:"Customize",save:"Save Preferences",necessary:"Necessary",analytics:"Analytics",marketing:"Marketing",required:"(Required)",privacyPolicy:"Privacy Policy"},fr:{title:"Consentement aux cookies",description:"Nous utilisons des cookies pour am\xE9liorer votre exp\xE9rience et analyser le trafic.",preferencesTitle:"Pr\xE9f\xE9rences de cookies",preferencesDescription:"Choisissez les cookies que vous souhaitez accepter.",acceptAll:"Tout accepter",rejectAll:"Tout refuser",customize:"Personnaliser",save:"Enregistrer",necessary:"N\xE9cessaires",analytics:"Analytiques",marketing:"Marketing",required:"(Requis)",privacyPolicy:"Politique de confidentialit\xE9"},de:{title:"Cookie-Einwilligung",description:"Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren.",preferencesTitle:"Cookie-Einstellungen",preferencesDescription:"W\xE4hlen Sie, welche Cookies Sie akzeptieren m\xF6chten.",acceptAll:"Alle akzeptieren",rejectAll:"Alle ablehnen",customize:"Anpassen",save:"Speichern",necessary:"Notwendig",analytics:"Analyse",marketing:"Marketing",required:"(Erforderlich)",privacyPolicy:"Datenschutzrichtlinie"},es:{title:"Consentimiento de cookies",description:"Utilizamos cookies para mejorar tu experiencia y analizar el tr\xE1fico del sitio.",preferencesTitle:"Preferencias de cookies",preferencesDescription:"Elige qu\xE9 cookies deseas aceptar.",acceptAll:"Aceptar todo",rejectAll:"Rechazar todo",customize:"Personalizar",save:"Guardar preferencias",necessary:"Necesarias",analytics:"Anal\xEDtica",marketing:"Marketing",required:"(Obligatorio)",privacyPolicy:"Pol\xEDtica de privacidad"},it:{title:"Consenso ai cookie",description:"Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico del sito.",preferencesTitle:"Preferenze cookie",preferencesDescription:"Scegli quali cookie desideri accettare.",acceptAll:"Accetta tutto",rejectAll:"Rifiuta tutto",customize:"Personalizza",save:"Salva preferenze",necessary:"Necessari",analytics:"Analitici",marketing:"Marketing",required:"(Obbligatorio)",privacyPolicy:"Informativa sulla privacy"},nl:{title:"Cookie-toestemming",description:"We gebruiken cookies om je ervaring te verbeteren en het siteverkeer te analyseren.",preferencesTitle:"Cookievoorkeuren",preferencesDescription:"Kies welke cookies je wilt accepteren.",acceptAll:"Alles accepteren",rejectAll:"Alles weigeren",customize:"Aanpassen",save:"Voorkeuren opslaan",necessary:"Noodzakelijk",analytics:"Analyse",marketing:"Marketing",required:"(Vereist)",privacyPolicy:"Privacybeleid"},pt:{title:"Consentimento de cookies",description:"Usamos cookies para melhorar sua experi\xEAncia e analisar o tr\xE1fego do site.",preferencesTitle:"Prefer\xEAncias de cookies",preferencesDescription:"Escolha quais cookies deseja aceitar.",acceptAll:"Aceitar tudo",rejectAll:"Recusar tudo",customize:"Personalizar",save:"Salvar prefer\xEAncias",necessary:"Necess\xE1rios",analytics:"An\xE1lises",marketing:"Marketing",required:"(Obrigat\xF3rio)",privacyPolicy:"Pol\xEDtica de privacidade"}},K=["en","fr","de"],J=["es","it","nl","pt"];function w(t){if(!t)return null;let e=t.toLowerCase().slice(0,2);return e in M?e:null}function B(t){return M[w(t)||"en"]}function D(t){let e=w(t);return e?J.includes(e):!1}function j(t,e){let n=w(t);return n&&(K.includes(n)||e)?n:"en"}var r=null,p=null;function V(t){try{let e=new URL(t,window.location.origin);return e.protocol==="http:"||e.protocol==="https:"?e.toString():null}catch{return null}}function $(t){return document.createTextNode(t)}function q(){let t=document.createElement("div");t.className="cm-powered-by";let e=document.createElement("a");return e.href="https://www.safebanner.com",e.target="_blank",e.rel="noopener noreferrer",e.textContent="Powered by SafeBanner",t.appendChild(e),t}function I(t,e){if(!t)return null;let n=V(t);if(!n)return null;let a=document.createElement("a");return a.href=n,a.className="cm-link",a.target="_blank",a.rel="noopener noreferrer",a.textContent=e,a}function m(t,e,n){let a=document.createElement("button");return a.className=n,a.dataset.action=e,a.textContent=t,a}function L(t,e,n,a,o,i){let s=document.createElement("label");s.className="cm-category";let c=document.createElement("input");c.type="checkbox",c.className="cm-checkbox",c.dataset.category=t,c.checked=n,c.disabled=a;let d=document.createElement("span");d.className="cm-label";let b=document.createElement("span");if(b.className="cm-label-text",b.textContent=e,d.appendChild(b),o&&i){let k=document.createElement("span");k.className="cm-label-required",k.textContent=i,d.appendChild(k)}return s.appendChild(c),s.appendChild(d),s}function W(t,e){let n=document.createDocumentFragment(),a=document.createElement("div");a.className="cm-title",a.textContent=e.title,n.appendChild(a);let o=document.createElement("p");o.className="cm-text",o.appendChild($(e.description+" "));let i=I(t.privacyPolicyUrl,e.privacyPolicy);i&&o.appendChild(i),n.appendChild(o);let s=document.createElement("div");return s.className="cm-buttons",s.appendChild(m(e.acceptAll,"accept-all","cm-btn cm-btn-primary")),s.appendChild(m(e.rejectAll,"reject-all","cm-btn cm-btn-secondary")),s.appendChild(m(e.customize,"customize","cm-btn cm-btn-link")),n.appendChild(s),t.showBranding!==!1&&n.appendChild(q()),n}function Y(t,e){let n=document.createDocumentFragment(),a=l(),o=document.createElement("div");o.className="cm-title",o.textContent=e.preferencesTitle,n.appendChild(o);let i=document.createElement("p");i.className="cm-text",i.appendChild($(e.preferencesDescription+" "));let s=I(t.privacyPolicyUrl,e.privacyPolicy);s&&i.appendChild(s),n.appendChild(i);let c=document.createElement("div");c.className="cm-categories",c.appendChild(L("necessary",e.necessary,!0,!0,!0,e.required)),c.appendChild(L("analytics",e.analytics,a?.analytics??!1,!1,!1)),c.appendChild(L("marketing",e.marketing,a?.marketing??!1,!1,!1)),n.appendChild(c);let d=document.createElement("div");return d.className="cm-buttons",d.appendChild(m(e.save,"save","cm-btn cm-btn-primary")),d.appendChild(m(e.acceptAll,"accept-all","cm-btn cm-btn-secondary")),n.appendChild(d),t.showBranding!==!1&&n.appendChild(q()),n}function X(){let t=r?.querySelector('[data-category="analytics"]')?.checked??!1,e=r?.querySelector('[data-category="marketing"]')?.checked??!1;return{necessary:!0,analytics:t,marketing:e,timestamp:Date.now()}}function f(t){G(t);let e=B(t.lang);p=document.createElement("div"),p.className="cm-overlay",document.body.appendChild(p),r=document.createElement("div"),r.className="cm-banner",r.setAttribute("role","dialog"),r.setAttribute("aria-label",e.title),r.appendChild(W(t,e)),document.body.appendChild(r),requestAnimationFrame(()=>{p?.classList.add("cm-visible"),r?.classList.add("cm-visible")}),r.addEventListener("click",n=>{let o=n.target.dataset.action;if(o)switch(o){case"accept-all":{let i={necessary:!0,analytics:!0,marketing:!0,timestamp:Date.now()};g(i),u(),t.onAccept?.(i);break}case"reject-all":{let i={necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()};g(i),u(),t.onDecline?.();break}case"customize":{r&&(r.textContent="",r.appendChild(Y(t,e)));break}case"save":{let i=X();g(i),u(),t.onUpdate?.(i);break}}})}function u(){p?.classList.remove("cm-visible"),r?.classList.remove("cm-visible"),setTimeout(()=>{p?.remove(),r?.remove(),p=null,r=null},300)}function C(){return r!==null}var R=!1,E="advanced";function A(){return typeof window<"u"&&typeof window.gtag=="function"}function U(t,e){if(A())try{window.gtag("consent",t,e)}catch(n){console.warn("[SafeBanner] Failed to send Google consent signal:",n)}}function O(t,e){let n=t?.analytics??!1,a=t?.marketing??!1,o={analytics_storage:n?"granted":"denied",ad_storage:a?"granted":"denied",ad_user_data:a?"granted":"denied",ad_personalization:a?"granted":"denied"};return e==="advanced"&&!a&&(o.ads_data_redaction=!0),o}function z(t="advanced"){if(E=t,A()){let n=window.dataLayer;Array.isArray(n)&&n.some(o=>Array.isArray(o)&&o[0]==="consent")&&console.warn("[SafeBanner] Google consent signals detected before SafeBanner initialized. Ensure SafeBanner script loads BEFORE Google tags for proper consent handling.")}window.dataLayer=window.dataLayer||[],A()||(window.gtag=function(){window.dataLayer.push(arguments)});let e=O(null,t);e.wait_for_update=500,U("default",e),R=!0}function T(t){R||z(E);let e=O(t,E);U("update",e)}var P="safebanner_license:",Q=24*60*60*1e3,Z=320;function ee(){let t=document.currentScript;if(!t)return{};let e="advanced",n=t.dataset.googleConsent;return(n==="basic"||n==="off")&&(e=n),{position:t.dataset.position||"bottom",theme:t.dataset.theme||"light",primaryColor:t.dataset.color,companyName:t.dataset.company,privacyPolicyUrl:t.dataset.privacy,lang:t.dataset.lang,googleConsentMode:e,projectKey:t.dataset.projectKey}}function te(){return document.currentScript}function ne(){let t=te();if(!t?.src)return null;try{return new URL("/api/validate-key",t.src).toString()}catch{return null}}function ae(t){try{let e=localStorage.getItem(`${P}${t}`);if(!e)return null;let n=JSON.parse(e);return n.expiresAt<Date.now()?(localStorage.removeItem(`${P}${t}`),null):n.valid}catch{return null}}function oe(t,e){try{localStorage.setItem(`${P}${t}`,JSON.stringify({valid:e,expiresAt:Date.now()+Q}))}catch{}}var _=class{constructor(e={}){this.initialized=!1;this.googleConsentInitialized=!1;this.hasProLicense=!1;this.validationStarted=!1;this.config={...ee(),...e},this.requestedLanguage=this.config.lang,this.applyLicenseState(this.getCachedLicenseState()),this.initGoogleConsentMode(),this.validateProjectKey()}initGoogleConsentMode(){if(this.googleConsentInitialized||this.config.googleConsentMode==="off")return;let e=this.config.googleConsentMode==="basic"?"basic":"advanced";z(e),this.googleConsentInitialized=!0;let n=l();n&&T(n)}init(){if(!this.initialized){if(this.initialized=!0,y()){this.enforceConsent();return}f(this.getBannerConfig())}}sendGoogleConsentUpdate(e){this.config.googleConsentMode!=="off"&&T(e)}getCachedLicenseState(){return this.config.projectKey?ae(this.config.projectKey)===!0:!1}applyLicenseState(e){this.hasProLicense=e,this.config.lang=j(this.requestedLanguage,e),this.config.showBranding=!e}async validateProjectKey(){if(this.validationStarted||!this.config.projectKey)return;this.validationStarted=!0;let e=ne();if(e)try{let n=await fetch(e,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({projectKey:this.config.projectKey,hostname:window.location.hostname})});if(!n.ok)return;let o=(await n.json()).valid===!0;oe(this.config.projectKey,o),this.upgradeLicenseState(o)}catch{}}upgradeLicenseState(e){let n=this.config.lang,a=this.config.showBranding;if(this.applyLicenseState(e),!C())return;let o=a!==this.config.showBranding,i=n!==this.config.lang&&D(this.requestedLanguage);o&&!this.config.showBranding&&document.querySelector(".cm-powered-by")?.remove(),(o||i)&&(u(),window.setTimeout(()=>{y()||f(this.getBannerConfig())},Z))}getBannerConfig(){return{...this.config,onAccept:e=>{this.sendGoogleConsentUpdate(e),this.enforceConsent(),this.config.onAccept?.(e)},onDecline:()=>{let e=l();e&&this.sendGoogleConsentUpdate(e),this.enforceConsent(),this.config.onDecline?.()},onUpdate:e=>{this.sendGoogleConsentUpdate(e),this.enforceConsent(),this.config.onUpdate?.(e)}}}enforceConsent(){let e=l();e&&(e.analytics||S("analytics"),e.marketing||S("marketing"))}getConsent(){return l()}hasConsented(){return y()}hasConsentFor(e){let n=l();return n?n[e]:e==="necessary"}updateConsent(e){let a={...l()||{necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()},...e,necessary:!0,timestamp:Date.now()};g(a),this.sendGoogleConsentUpdate(a),this.enforceConsent(),this.config.onUpdate?.(a)}reset(){N(),this.sendGoogleConsentUpdate({necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()}),C()||f(this.getBannerConfig())}show(){C()||f(this.getBannerConfig())}hide(){u()}detectCookies(){return x()}},h=new _;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>h.init()):h.init();window.safeBanner=h;var be=h;})();
