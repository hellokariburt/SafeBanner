"use strict";(()=>{var x="safebanner_consent";function l(){try{let t=localStorage.getItem(x);return t?JSON.parse(t):null}catch{return null}}function m(t){try{localStorage.setItem(x,JSON.stringify(t))}catch{}}function L(){try{localStorage.removeItem(x)}catch{}}function k(){return l()!==null}var U=[{pattern:/^_ga/,category:"analytics"},{pattern:/^_gid/,category:"analytics"},{pattern:/^_gat/,category:"analytics"},{pattern:/^__utm/,category:"analytics"},{pattern:/^_hjid/,category:"analytics"},{pattern:/^mp_/,category:"analytics"},{pattern:/^amplitude/,category:"analytics"},{pattern:/^plausible/,category:"analytics"},{pattern:/^_fbp/,category:"marketing"},{pattern:/^_fbc/,category:"marketing"},{pattern:/^fr$/,category:"marketing"},{pattern:/^_gcl/,category:"marketing"},{pattern:/^_pinterest/,category:"marketing"},{pattern:/^_tt_/,category:"marketing"},{pattern:/^li_/,category:"marketing"},{pattern:/^IDE$/,category:"marketing"},{pattern:/^ads$/,category:"marketing"}];function v(){let t=document.cookie.split(";").map(n=>n.trim().split("=")[0]),e=[];for(let n of t){if(!n)continue;let o="necessary";for(let{pattern:a,category:r}of U)if(a.test(n)){o=r;break}e.push({name:n,category:o})}return e}function S(t){let n=v().filter(o=>o.category===t);for(let o of n)document.cookie=`${o.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,document.cookie=`${o.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`}function q(t){let e=t.primaryColor||"#2563eb",n=t.position==="top",o=t.position?.includes("-");return`
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
      ${o?`${t.position?.includes("right")?"right: 16px;":"left: 16px;"} max-width: 400px;`:"left: 0; right: 0;"}
      ${o?n?"top: 16px;":"bottom: 16px;":""}
      background: ${t.theme==="dark"?"#1f2937":"#ffffff"};
      color: ${t.theme==="dark"?"#f9fafb":"#111827"};
      padding: 20px 24px;
      box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
      z-index: 99999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      ${o?"border-radius: 12px;":""}
      transform: translateY(${n?"-100%":"100%"});
      transition: transform 0.3s ease;
    }
    .cm-banner.cm-visible {
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
  `}function M(t){let e="consent-manager-styles";if(document.getElementById(e))return;let n=document.createElement("style");n.id=e,n.textContent=q(t),document.head.appendChild(n)}var w={en:{title:"Cookie Consent",description:"We use cookies to improve your experience and analyze site traffic.",preferencesTitle:"Cookie Preferences",preferencesDescription:"Choose which cookies you want to accept.",acceptAll:"Accept All",rejectAll:"Reject All",customize:"Customize",save:"Save Preferences",necessary:"Necessary",analytics:"Analytics",marketing:"Marketing",required:"(Required)",privacyPolicy:"Privacy Policy"},fr:{title:"Consentement aux cookies",description:"Nous utilisons des cookies pour am\xE9liorer votre exp\xE9rience et analyser le trafic.",preferencesTitle:"Pr\xE9f\xE9rences de cookies",preferencesDescription:"Choisissez les cookies que vous souhaitez accepter.",acceptAll:"Tout accepter",rejectAll:"Tout refuser",customize:"Personnaliser",save:"Enregistrer",necessary:"N\xE9cessaires",analytics:"Analytiques",marketing:"Marketing",required:"(Requis)",privacyPolicy:"Politique de confidentialit\xE9"},de:{title:"Cookie-Einwilligung",description:"Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und den Datenverkehr zu analysieren.",preferencesTitle:"Cookie-Einstellungen",preferencesDescription:"W\xE4hlen Sie, welche Cookies Sie akzeptieren m\xF6chten.",acceptAll:"Alle akzeptieren",rejectAll:"Alle ablehnen",customize:"Anpassen",save:"Speichern",necessary:"Notwendig",analytics:"Analyse",marketing:"Marketing",required:"(Erforderlich)",privacyPolicy:"Datenschutzrichtlinie"}};function D(t){if(!t)return w.en;let e=t.toLowerCase().slice(0,2);return w[e]||w.en}var i=null,p=null;function R(t){try{let e=new URL(t,window.location.origin);return e.protocol==="http:"||e.protocol==="https:"?e.toString():null}catch{return null}}function N(t){return document.createTextNode(t)}function B(t,e){if(!t)return null;let n=R(t);if(!n)return null;let o=document.createElement("a");return o.href=n,o.className="cm-link",o.target="_blank",o.rel="noopener noreferrer",o.textContent=e,o}function g(t,e,n){let o=document.createElement("button");return o.className=n,o.dataset.action=e,o.textContent=t,o}function E(t,e,n,o,a,r){let s=document.createElement("label");s.className="cm-category";let c=document.createElement("input");c.type="checkbox",c.className="cm-checkbox",c.dataset.category=t,c.checked=n,c.disabled=o;let d=document.createElement("span");d.className="cm-label";let h=document.createElement("span");if(h.className="cm-label-text",h.textContent=e,d.appendChild(h),a&&r){let b=document.createElement("span");b.className="cm-label-required",b.textContent=r,d.appendChild(b)}return s.appendChild(c),s.appendChild(d),s}function j(t,e){let n=document.createDocumentFragment(),o=document.createElement("div");o.className="cm-title",o.textContent=e.title,n.appendChild(o);let a=document.createElement("p");a.className="cm-text",a.appendChild(N(e.description+" "));let r=B(t.privacyPolicyUrl,e.privacyPolicy);r&&a.appendChild(r),n.appendChild(a);let s=document.createElement("div");return s.className="cm-buttons",s.appendChild(g(e.acceptAll,"accept-all","cm-btn cm-btn-primary")),s.appendChild(g(e.rejectAll,"reject-all","cm-btn cm-btn-secondary")),s.appendChild(g(e.customize,"customize","cm-btn cm-btn-link")),n.appendChild(s),n}function F(t,e){let n=document.createDocumentFragment(),o=l(),a=document.createElement("div");a.className="cm-title",a.textContent=e.preferencesTitle,n.appendChild(a);let r=document.createElement("p");r.className="cm-text",r.appendChild(N(e.preferencesDescription+" "));let s=B(t.privacyPolicyUrl,e.privacyPolicy);s&&r.appendChild(s),n.appendChild(r);let c=document.createElement("div");c.className="cm-categories",c.appendChild(E("necessary",e.necessary,!0,!0,!0,e.required)),c.appendChild(E("analytics",e.analytics,o?.analytics??!1,!1,!1)),c.appendChild(E("marketing",e.marketing,o?.marketing??!1,!1,!1)),n.appendChild(c);let d=document.createElement("div");return d.className="cm-buttons",d.appendChild(g(e.save,"save","cm-btn cm-btn-primary")),d.appendChild(g(e.acceptAll,"accept-all","cm-btn cm-btn-secondary")),n.appendChild(d),n}function H(){let t=i?.querySelector('[data-category="analytics"]')?.checked??!1,e=i?.querySelector('[data-category="marketing"]')?.checked??!1;return{necessary:!0,analytics:t,marketing:e,timestamp:Date.now()}}function f(t){M(t);let e=D(t.lang);p=document.createElement("div"),p.className="cm-overlay",document.body.appendChild(p),i=document.createElement("div"),i.className="cm-banner",i.setAttribute("role","dialog"),i.setAttribute("aria-label",e.title),i.appendChild(j(t,e)),document.body.appendChild(i),requestAnimationFrame(()=>{p?.classList.add("cm-visible"),i?.classList.add("cm-visible")}),i.addEventListener("click",n=>{let a=n.target.dataset.action;if(a)switch(a){case"accept-all":{let r={necessary:!0,analytics:!0,marketing:!0,timestamp:Date.now()};m(r),u(),t.onAccept?.(r);break}case"reject-all":{let r={necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()};m(r),u(),t.onDecline?.();break}case"customize":{i&&(i.textContent="",i.appendChild(F(t,e)));break}case"save":{let r=H();m(r),u(),t.onUpdate?.(r);break}}})}function u(){p?.classList.remove("cm-visible"),i?.classList.remove("cm-visible"),setTimeout(()=>{p?.remove(),i?.remove(),p=null,i=null},300)}function T(){return i!==null}var $=!1,A="advanced";function _(){return typeof window<"u"&&typeof window.gtag=="function"}function P(t,e){if(_())try{window.gtag("consent",t,e)}catch(n){console.warn("[SafeBanner] Failed to send Google consent signal:",n)}}function I(t,e){let n=t?.analytics??!1,o=t?.marketing??!1,a={analytics_storage:n?"granted":"denied",ad_storage:o?"granted":"denied",ad_user_data:o?"granted":"denied",ad_personalization:o?"granted":"denied"};return e==="advanced"&&!o&&(a.ads_data_redaction=!0),a}function G(t="advanced"){if(A=t,_()){let n=window.dataLayer;Array.isArray(n)&&n.some(a=>Array.isArray(a)&&a[0]==="consent")&&console.warn("[SafeBanner] Google consent signals detected before SafeBanner initialized. Ensure SafeBanner script loads BEFORE Google tags for proper consent handling.")}window.dataLayer=window.dataLayer||[],_()||(window.gtag=function(){window.dataLayer.push(arguments)});let e=I(null,t);e.wait_for_update=500,P("default",e),$=!0}function z(t){$||G(A);let e=I(t,A);P("update",e)}function O(){let t=document.currentScript;if(!t)return{};let e="advanced",n=t.dataset.googleConsent;return(n==="basic"||n==="off")&&(e=n),{position:t.dataset.position||"bottom",theme:t.dataset.theme||"light",primaryColor:t.dataset.color,companyName:t.dataset.company,privacyPolicyUrl:t.dataset.privacy,lang:t.dataset.lang,googleConsentMode:e}}var y=class{constructor(e={}){this.initialized=!1;this.googleConsentInitialized=!1;this.config={...O(),...e},this.initGoogleConsentMode()}initGoogleConsentMode(){if(this.googleConsentInitialized||this.config.googleConsentMode==="off")return;let e=this.config.googleConsentMode==="basic"?"basic":"advanced";G(e),this.googleConsentInitialized=!0;let n=l();n&&z(n)}init(){if(!this.initialized){if(this.initialized=!0,k()){this.enforceConsent();return}f({...this.config,onAccept:e=>{this.sendGoogleConsentUpdate(e),this.enforceConsent(),this.config.onAccept?.(e)},onDecline:()=>{let e=l();e&&this.sendGoogleConsentUpdate(e),this.enforceConsent(),this.config.onDecline?.()},onUpdate:e=>{this.sendGoogleConsentUpdate(e),this.enforceConsent(),this.config.onUpdate?.(e)}})}}sendGoogleConsentUpdate(e){this.config.googleConsentMode!=="off"&&z(e)}enforceConsent(){let e=l();e&&(e.analytics||S("analytics"),e.marketing||S("marketing"))}getConsent(){return l()}hasConsented(){return k()}hasConsentFor(e){let n=l();return n?n[e]:e==="necessary"}updateConsent(e){let o={...l()||{necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()},...e,necessary:!0,timestamp:Date.now()};m(o),this.sendGoogleConsentUpdate(o),this.enforceConsent(),this.config.onUpdate?.(o)}reset(){L(),this.sendGoogleConsentUpdate({necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()}),T()||f(this.config)}show(){T()||f(this.config)}hide(){u()}detectCookies(){return v()}},C=new y;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>C.init()):C.init();window.SafeBanner=y;window.safeBanner=C;var re=C;})();
