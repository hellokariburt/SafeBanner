"use strict";(()=>{var y="consent_manager_state";function s(){try{let e=localStorage.getItem(y);return e?JSON.parse(e):null}catch{return null}}function i(e){try{localStorage.setItem(y,JSON.stringify(e))}catch{}}function b(){try{localStorage.removeItem(y)}catch{}}function g(){return s()!==null}var v=[{pattern:/^_ga/,category:"analytics"},{pattern:/^_gid/,category:"analytics"},{pattern:/^_gat/,category:"analytics"},{pattern:/^__utm/,category:"analytics"},{pattern:/^_hjid/,category:"analytics"},{pattern:/^mp_/,category:"analytics"},{pattern:/^amplitude/,category:"analytics"},{pattern:/^plausible/,category:"analytics"},{pattern:/^_fbp/,category:"marketing"},{pattern:/^_fbc/,category:"marketing"},{pattern:/^fr$/,category:"marketing"},{pattern:/^_gcl/,category:"marketing"},{pattern:/^_pinterest/,category:"marketing"},{pattern:/^_tt_/,category:"marketing"},{pattern:/^li_/,category:"marketing"},{pattern:/^IDE$/,category:"marketing"},{pattern:/^ads$/,category:"marketing"}];function f(){let e=document.cookie.split(";").map(n=>n.trim().split("=")[0]),t=[];for(let n of e){if(!n)continue;let o="necessary";for(let{pattern:r,category:x}of v)if(r.test(n)){o=x;break}t.push({name:n,category:o})}return t}function u(e){let n=f().filter(o=>o.category===e);for(let o of n)document.cookie=`${o.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`,document.cookie=`${o.name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`}function S(e){let t=e.primaryColor||"#2563eb",n=e.position==="top",o=e.position?.includes("-");return`
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
      ${o?`${e.position?.includes("right")?"right: 16px;":"left: 16px;"} max-width: 400px;`:"left: 0; right: 0;"}
      ${o?n?"top: 16px;":"bottom: 16px;":""}
      background: ${e.theme==="dark"?"#1f2937":"#ffffff"};
      color: ${e.theme==="dark"?"#f9fafb":"#111827"};
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
      color: ${e.theme==="dark"?"#d1d5db":"#6b7280"};
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
      background: ${t};
      color: #ffffff;
    }

    .cm-btn-secondary {
      background: ${e.theme==="dark"?"#374151":"#f3f4f6"};
      color: ${e.theme==="dark"?"#f9fafb":"#374151"};
    }

    .cm-btn-link {
      background: transparent;
      color: ${e.theme==="dark"?"#d1d5db":"#6b7280"};
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
      color: ${e.theme==="dark","#9ca3af"};
    }
  `}function h(e){let t="consent-manager-styles";if(document.getElementById(t))return;let n=document.createElement("style");n.id=t,n.textContent=S(e),document.head.appendChild(n)}var a=null,c=null;function k(e,t){let n=e.companyName||"We",o=e.privacyPolicyUrl?`<a href="${e.privacyPolicyUrl}" class="cm-link" target="_blank" rel="noopener">Privacy Policy</a>`:"",r=s();return t?`
      <div class="cm-title">Cookie Preferences</div>
      <p class="cm-text">Choose which cookies you want to accept. ${o}</p>
      <div class="cm-categories">
        <label class="cm-category">
          <input type="checkbox" class="cm-checkbox" data-category="necessary" checked disabled>
          <span class="cm-label">
            <span class="cm-label-text">Necessary</span>
            <span class="cm-label-required">(Required)</span>
          </span>
        </label>
        <label class="cm-category">
          <input type="checkbox" class="cm-checkbox" data-category="analytics" ${r?.analytics?"checked":""}>
          <span class="cm-label">
            <span class="cm-label-text">Analytics</span>
          </span>
        </label>
        <label class="cm-category">
          <input type="checkbox" class="cm-checkbox" data-category="marketing" ${r?.marketing?"checked":""}>
          <span class="cm-label">
            <span class="cm-label-text">Marketing</span>
          </span>
        </label>
      </div>
      <div class="cm-buttons">
        <button class="cm-btn cm-btn-primary" data-action="save">Save Preferences</button>
        <button class="cm-btn cm-btn-secondary" data-action="accept-all">Accept All</button>
      </div>
    `:`
    <div class="cm-title">Cookie Consent</div>
    <p class="cm-text">${n} use cookies to improve your experience and analyze site traffic. ${o}</p>
    <div class="cm-buttons">
      <button class="cm-btn cm-btn-primary" data-action="accept-all">Accept All</button>
      <button class="cm-btn cm-btn-secondary" data-action="reject-all">Reject All</button>
      <button class="cm-btn cm-btn-link" data-action="customize">Customize</button>
    </div>
  `}function w(){let e=a?.querySelector('[data-category="analytics"]')?.checked??!1,t=a?.querySelector('[data-category="marketing"]')?.checked??!1;return{necessary:!0,analytics:e,marketing:t,timestamp:Date.now()}}function p(e){h(e),c=document.createElement("div"),c.className="cm-overlay",document.body.appendChild(c),a=document.createElement("div"),a.className="cm-banner",a.innerHTML=k(e,!1),document.body.appendChild(a),requestAnimationFrame(()=>{c?.classList.add("cm-visible"),a?.classList.add("cm-visible")}),a.addEventListener("click",t=>{let o=t.target.dataset.action;if(o)switch(o){case"accept-all":{let r={necessary:!0,analytics:!0,marketing:!0,timestamp:Date.now()};i(r),l(),e.onAccept?.(r);break}case"reject-all":{let r={necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()};i(r),l(),e.onDecline?.();break}case"customize":{a&&(a.innerHTML=k(e,!0));break}case"save":{let r=w();i(r),l(),e.onUpdate?.(r);break}}})}function l(){c?.classList.remove("cm-visible"),a?.classList.remove("cm-visible"),setTimeout(()=>{c?.remove(),a?.remove(),c=null,a=null},300)}function C(){return a!==null}function $(){let e=document.currentScript;return e?{position:e.dataset.position||"bottom",theme:e.dataset.theme||"light",primaryColor:e.dataset.color,companyName:e.dataset.company,privacyPolicyUrl:e.dataset.privacy}:{}}var m=class{constructor(t={}){this.initialized=!1;this.config={...$(),...t}}init(){if(!this.initialized){if(this.initialized=!0,g()){this.enforceConsent();return}p({...this.config,onAccept:t=>{this.enforceConsent(),this.config.onAccept?.(t)},onDecline:()=>{this.enforceConsent(),this.config.onDecline?.()},onUpdate:t=>{this.enforceConsent(),this.config.onUpdate?.(t)}})}}enforceConsent(){let t=s();t&&(t.analytics||u("analytics"),t.marketing||u("marketing"))}getConsent(){return s()}hasConsented(){return g()}hasConsentFor(t){let n=s();return n?n[t]:t==="necessary"}updateConsent(t){let o={...s()||{necessary:!0,analytics:!1,marketing:!1,timestamp:Date.now()},...t,necessary:!0,timestamp:Date.now()};i(o),this.enforceConsent(),this.config.onUpdate?.(o)}reset(){b(),C()||p(this.config)}show(){C()||p(this.config)}hide(){l()}detectCookies(){return f()}},d=new m;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>d.init()):d.init();window.ConsentManager=m;window.consentManager=d;var I=d;})();
