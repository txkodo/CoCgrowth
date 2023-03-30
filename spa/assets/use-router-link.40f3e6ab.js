import{c as T,h as F,d as C,i as H,b as U}from"./dom.c9a447ee.js";import{c,h as f,g as N,M as Y,Y as X,Z,K as G,$ as J}from"./index.99900620.js";const A={xs:18,sm:24,md:32,lg:38,xl:46},W={size:String};function ee(e,t=A){return c(()=>e.size!==void 0?{fontSize:e.size in t?`${t[e.size]}px`:e.size}:null)}const O="0 0 24 24",B=e=>e,E=e=>`ionicons ${e}`,Q={"mdi-":e=>`mdi ${e}`,"icon-":B,"bt-":e=>`bt ${e}`,"eva-":e=>`eva ${e}`,"ion-md":E,"ion-ios":E,"ion-logo":E,"iconfont ":B,"ti-":e=>`themify-icon ${e}`,"bi-":e=>`bootstrap-icons ${e}`},V={o_:"-outlined",r_:"-round",s_:"-sharp"},D={sym_o_:"-outlined",sym_r_:"-rounded",sym_s_:"-sharp"},te=new RegExp("^("+Object.keys(Q).join("|")+")"),re=new RegExp("^("+Object.keys(V).join("|")+")"),L=new RegExp("^("+Object.keys(D).join("|")+")"),ne=/^[Mm]\s?[-+]?\.?\d/,se=/^img:/,ie=/^svguse:/,ae=/^ion-/,oe=/^(fa-(solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;var he=T({name:"QIcon",props:{...W,tag:{type:String,default:"i"},name:String,color:String,left:Boolean,right:Boolean},setup(e,{slots:t}){const{proxy:{$q:s}}=N(),r=ee(e),i=c(()=>"q-icon"+(e.left===!0?" on-left":"")+(e.right===!0?" on-right":"")+(e.color!==void 0?` text-${e.color}`:"")),l=c(()=>{let a,n=e.name;if(n==="none"||!n)return{none:!0};if(s.iconMapFn!==null){const o=s.iconMapFn(n);if(o!==void 0)if(o.icon!==void 0){if(n=o.icon,n==="none"||!n)return{none:!0}}else return{cls:o.cls,content:o.content!==void 0?o.content:" "}}if(ne.test(n)===!0){const[o,d=O]=n.split("|");return{svg:!0,viewBox:d,nodes:o.split("&&").map(y=>{const[m,k,h]=y.split("@@");return f("path",{style:k,d:m,transform:h})})}}if(se.test(n)===!0)return{img:!0,src:n.substring(4)};if(ie.test(n)===!0){const[o,d=O]=n.split("|");return{svguse:!0,src:o.substring(7),viewBox:d}}let g=" ";const p=n.match(te);if(p!==null)a=Q[p[1]](n);else if(oe.test(n)===!0)a=n;else if(ae.test(n)===!0)a=`ionicons ion-${s.platform.is.ios===!0?"ios":"md"}${n.substring(3)}`;else if(L.test(n)===!0){a="notranslate material-symbols";const o=n.match(L);o!==null&&(n=n.substring(6),a+=D[o[1]]),g=n}else{a="notranslate material-icons";const o=n.match(re);o!==null&&(n=n.substring(2),a+=V[o[1]]),g=n}return{cls:a,content:g}});return()=>{const a={class:i.value,style:r.value,"aria-hidden":"true",role:"presentation"};return l.value.none===!0?f(e.tag,a,F(t.default)):l.value.img===!0?f("span",a,C(t.default,[f("img",{src:l.value.src})])):l.value.svg===!0?f("span",a,C(t.default,[f("svg",{viewBox:l.value.viewBox||"0 0 24 24"},l.value.nodes)])):l.value.svguse===!0?f("span",a,C(t.default,[f("svg",{viewBox:l.value.viewBox},[f("use",{"xlink:href":l.value.src})])])):(l.value.cls!==void 0&&(a.class+=" "+l.value.cls),f(e.tag,a,C(t.default,[l.value.content])))}}});function le(e,t=250){let s=!1,r;return function(){return s===!1&&(s=!0,setTimeout(()=>{s=!1},t),r=e.apply(this,arguments)),r}}function P(e,t,s,r){s.modifiers.stop===!0&&G(e);const i=s.modifiers.color;let l=s.modifiers.center;l=l===!0||r===!0;const a=document.createElement("span"),n=document.createElement("span"),g=J(e),{left:p,top:o,width:d,height:y}=t.getBoundingClientRect(),m=Math.sqrt(d*d+y*y),k=m/2,h=`${(d-m)/2}px`,_=l?h:`${g.left-p-k}px`,q=`${(y-m)/2}px`,w=l?q:`${g.top-o-k}px`;n.className="q-ripple__inner",U(n,{height:`${m}px`,width:`${m}px`,transform:`translate3d(${_},${w},0) scale3d(.2,.2,1)`,opacity:0}),a.className=`q-ripple${i?" text-"+i:""}`,a.setAttribute("dir","ltr"),a.appendChild(n),t.appendChild(a);const R=()=>{a.remove(),clearTimeout(S)};s.abort.push(R);let S=setTimeout(()=>{n.classList.add("q-ripple__inner--enter"),n.style.transform=`translate3d(${h},${q},0) scale3d(1,1,1)`,n.style.opacity=.2,S=setTimeout(()=>{n.classList.remove("q-ripple__inner--enter"),n.classList.add("q-ripple__inner--leave"),n.style.opacity=0,S=setTimeout(()=>{a.remove(),s.abort.splice(s.abort.indexOf(R),1)},275)},250)},50)}function M(e,{modifiers:t,value:s,arg:r}){const i=Object.assign({},e.cfg.ripple,t,s);e.modifiers={early:i.early===!0,stop:i.stop===!0,center:i.center===!0,color:i.color||r,keyCodes:[].concat(i.keyCodes||13)}}var ye=H({name:"ripple",beforeMount(e,t){const s=t.instance.$.appContext.config.globalProperties.$q.config||{};if(s.ripple===!1)return;const r={cfg:s,enabled:t.value!==!1,modifiers:{},abort:[],start(i){r.enabled===!0&&i.qSkipRipple!==!0&&i.type===(r.modifiers.early===!0?"pointerdown":"click")&&P(i,e,r,i.qKeyEvent===!0)},keystart:le(i=>{r.enabled===!0&&i.qSkipRipple!==!0&&Y(i,r.modifiers.keyCodes)===!0&&i.type===`key${r.modifiers.early===!0?"down":"up"}`&&P(i,e,r,!0)},300)};M(r,t),e.__qripple=r,X(r,"main",[[e,"pointerdown","start","passive"],[e,"click","start","passive"],[e,"keydown","keystart","passive"],[e,"keyup","keystart","passive"]])},updated(e,t){if(t.oldValue!==t.value){const s=e.__qripple;s!==void 0&&(s.enabled=t.value!==!1,s.enabled===!0&&Object(t.value)===t.value&&M(s,t))}},beforeUnmount(e){const t=e.__qripple;t!==void 0&&(t.abort.forEach(s=>{s()}),Z(t,"main"),delete e._qripple)}});const ue={size:{type:[Number,String],default:"1em"},color:String};function ce(e){return{cSize:c(()=>e.size in A?`${A[e.size]}px`:e.size),classes:c(()=>"q-spinner"+(e.color?` text-${e.color}`:""))}}var ke=T({name:"QSpinner",props:{...ue,thickness:{type:Number,default:5}},setup(e){const{cSize:t,classes:s}=ce(e);return()=>f("svg",{class:s.value+" q-spinner-mat",width:t.value,height:t.value,viewBox:"25 25 50 50"},[f("circle",{class:"path",cx:"50",cy:"50",r:"20",fill:"none",stroke:"currentColor","stroke-width":e.thickness,"stroke-miterlimit":"10"})])}});function fe(e){return e.appContext.config.globalProperties.$router!==void 0}function j(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}function I(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function pe(e,t){for(const s in t){const r=t[s],i=e[s];if(typeof r=="string"){if(r!==i)return!1}else if(Array.isArray(i)===!1||i.length!==r.length||r.some((l,a)=>l!==i[a]))return!1}return!0}function K(e,t){return Array.isArray(t)===!0?e.length===t.length&&e.every((s,r)=>s===t[r]):e.length===1&&e[0]===t}function de(e,t){return Array.isArray(e)===!0?K(e,t):Array.isArray(t)===!0?K(t,e):e===t}function ve(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(de(e[s],t[s])===!1)return!1;return!0}const xe={to:[String,Object],replace:Boolean,exact:Boolean,activeClass:{type:String,default:"q-router-link--active"},exactActiveClass:{type:String,default:"q-router-link--exact-active"},href:String,target:String,disable:Boolean};function $e({fallbackTag:e,useDisableForRouterLinkProps:t=!0}={}){const s=N(),{props:r,proxy:i,emit:l}=s,a=fe(s),n=c(()=>r.disable!==!0&&r.href!==void 0),g=t===!0?c(()=>a===!0&&r.disable!==!0&&n.value!==!0&&r.to!==void 0&&r.to!==null&&r.to!==""):c(()=>a===!0&&n.value!==!0&&r.to!==void 0&&r.to!==null&&r.to!==""),p=c(()=>g.value===!0?w(r.to):null),o=c(()=>p.value!==null),d=c(()=>n.value===!0||o.value===!0),y=c(()=>r.type==="a"||d.value===!0?"a":r.tag||e||"div"),m=c(()=>n.value===!0?{href:r.href,target:r.target}:o.value===!0?{href:p.value.href,target:r.target}:{}),k=c(()=>{if(o.value===!1)return-1;const{matched:u}=p.value,{length:v}=u,x=u[v-1];if(x===void 0)return-1;const $=i.$route.matched;if($.length===0)return-1;const b=$.findIndex(I.bind(null,x));if(b>-1)return b;const z=j(u[v-2]);return v>1&&j(x)===z&&$[$.length-1].path!==z?$.findIndex(I.bind(null,u[v-2])):b}),h=c(()=>o.value===!0&&k.value!==-1&&pe(i.$route.params,p.value.params)),_=c(()=>h.value===!0&&k.value===i.$route.matched.length-1&&ve(i.$route.params,p.value.params)),q=c(()=>o.value===!0?_.value===!0?` ${r.exactActiveClass} ${r.activeClass}`:r.exact===!0?"":h.value===!0?` ${r.activeClass}`:"":"");function w(u){try{return i.$router.resolve(u)}catch{}return null}function R(u,{returnRouterError:v,to:x=r.to,replace:$=r.replace}={}){if(r.disable===!0)return u.preventDefault(),Promise.resolve(!1);if(u.metaKey||u.altKey||u.ctrlKey||u.shiftKey||u.button!==void 0&&u.button!==0||r.target==="_blank")return Promise.resolve(!1);u.preventDefault();const b=i.$router[$===!0?"replace":"push"](x);return v===!0?b:b.then(()=>{}).catch(()=>{})}function S(u){if(o.value===!0){const v=x=>R(u,x);l("click",u,v),u.defaultPrevented!==!0&&v()}else l("click",u)}return{hasRouterLink:o,hasHrefLink:n,hasLink:d,linkTag:y,resolvedLink:p,linkIsActive:h,linkIsExactActive:_,linkClass:q,linkAttrs:m,getLink:w,navigateToRouterLink:R,navigateOnClick:S}}export{he as Q,ye as R,ee as a,ke as b,xe as c,$e as d,W as u,fe as v};