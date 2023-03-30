import{c as u,r as $,a as H,h as o,T as G,A as J,g as U,C as f,M as O,J as X,K as Y,l as Z,_ as p,s as ee,Q as te,P as R,v as ne}from"./index.99900620.js";import{u as ae,c as le,a as ue,d as ie,Q as j,b as re,R as oe}from"./use-router-link.40f3e6ab.js";import{c as se,d as ce}from"./dom.c9a447ee.js";const K={left:"start",center:"center",right:"end",between:"between",around:"around",evenly:"evenly",stretch:"stretch"},de=Object.keys(K),ve={align:{type:String,validator:e=>de.includes(e)}};function fe(e){return u(()=>{const i=e.align===void 0?e.vertical===!0?"stretch":"left":e.align;return`${e.vertical===!0?"items":"justify"}-${K[i]}`})}const A={none:0,xs:4,sm:8,md:16,lg:24,xl:32},be={xs:8,sm:10,md:14,lg:20,xl:24},ge=["button","submit","reset"],me=/[^\s]\/[^\s]/,he=["flat","outline","push","unelevated"],ye=(e,i)=>e.flat===!0?"flat":e.outline===!0?"outline":e.push===!0?"push":e.unelevated===!0?"unelevated":i,ke={...ae,...le,type:{type:String,default:"button"},label:[Number,String],icon:String,iconRight:String,...he.reduce((e,i)=>(e[i]=Boolean)&&e,{}),square:Boolean,round:Boolean,rounded:Boolean,glossy:Boolean,size:String,fab:Boolean,fabMini:Boolean,padding:String,color:String,textColor:String,noCaps:Boolean,noWrap:Boolean,dense:Boolean,tabindex:[Number,String],ripple:{type:[Boolean,Object],default:!0},align:{...ve.align,default:"center"},stack:Boolean,stretch:Boolean,loading:{type:Boolean,default:null},disable:Boolean};function qe(e){const i=ue(e,be),v=fe(e),{hasRouterLink:x,hasLink:E,linkTag:B,linkAttrs:C,navigateOnClick:w}=ie({fallbackTag:"button"}),T=u(()=>{const a=e.fab===!1&&e.fabMini===!1?i.value:{};return e.padding!==void 0?Object.assign({},a,{padding:e.padding.split(/\s+/).map(d=>d in A?A[d]+"px":d).join(" "),minWidth:"0",minHeight:"0"}):a}),S=u(()=>e.rounded===!0||e.fab===!0||e.fabMini===!0),h=u(()=>e.disable!==!0&&e.loading!==!0),P=u(()=>h.value===!0?e.tabindex||0:-1),n=u(()=>ye(e,"standard")),L=u(()=>{const a={tabindex:P.value};return E.value===!0?Object.assign(a,C.value):ge.includes(e.type)===!0&&(a.type=e.type),B.value==="a"?(e.disable===!0?a["aria-disabled"]="true":a.href===void 0&&(a.role="button"),x.value!==!0&&me.test(e.type)===!0&&(a.type=e.type)):e.disable===!0&&(a.disabled="",a["aria-disabled"]="true"),e.loading===!0&&e.percentage!==void 0&&Object.assign(a,{role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":e.percentage}),a}),c=u(()=>{let a;e.color!==void 0?e.flat===!0||e.outline===!0?a=`text-${e.textColor||e.color}`:a=`bg-${e.color} text-${e.textColor||"white"}`:e.textColor&&(a=`text-${e.textColor}`);const d=e.round===!0?"round":`rectangle${S.value===!0?" q-btn--rounded":e.square===!0?" q-btn--square":""}`;return`q-btn--${n.value} q-btn--${d}`+(a!==void 0?" "+a:"")+(h.value===!0?" q-btn--actionable q-focusable q-hoverable":e.disable===!0?" disabled":"")+(e.fab===!0?" q-btn--fab":e.fabMini===!0?" q-btn--fab-mini":"")+(e.noCaps===!0?" q-btn--no-uppercase":"")+(e.dense===!0?" q-btn--dense":"")+(e.stretch===!0?" no-border-radius self-stretch":"")+(e.glossy===!0?" glossy":"")+(e.square?" q-btn--square":"")}),y=u(()=>v.value+(e.stack===!0?" column":" row")+(e.noWrap===!0?" no-wrap text-no-wrap":"")+(e.loading===!0?" q-btn__content--hidden":""));return{classes:c,style:T,innerClasses:y,attributes:L,hasLink:E,linkTag:B,navigateOnClick:w,isActionable:h}}const{passiveCapture:r}=Z;let b=null,g=null,m=null;var xe=se({name:"QBtn",props:{...ke,percentage:Number,darkPercentage:Boolean,onTouchstart:[Function,Array]},emits:["click","keydown","mousedown","keyup"],setup(e,{slots:i,emit:v}){const{proxy:x}=U(),{classes:E,style:B,innerClasses:C,attributes:w,hasLink:T,linkTag:S,navigateOnClick:h,isActionable:P}=qe(e),n=$(null),L=$(null);let c=null,y,a=null;const d=u(()=>e.label!==void 0&&e.label!==null&&e.label!==""),N=u(()=>e.disable===!0||e.ripple===!1?!1:{keyCodes:T.value===!0?[13,32]:[13],...e.ripple===!0?{}:e.ripple}),z=u(()=>({center:e.round})),Q=u(()=>{const t=Math.max(0,Math.min(100,e.percentage));return t>0?{transition:"transform 0.6s",transform:`translateX(${t-100}%)`}:{}}),D=u(()=>{if(e.loading===!0)return{onMousedown:q,onTouchstart:q,onClick:q,onKeydown:q,onKeyup:q};if(P.value===!0){const t={onClick:M,onKeydown:V,onMousedown:F};if(x.$q.platform.has.touch===!0){const l=e.onTouchstart!==void 0?"":"Passive";t[`onTouchstart${l}`]=W}return t}return{onClick:f}}),I=u(()=>({ref:n,class:"q-btn q-btn-item non-selectable no-outline "+E.value,style:B.value,...w.value,...D.value}));function M(t){if(n.value!==null){if(t!==void 0){if(t.defaultPrevented===!0)return;const l=document.activeElement;if(e.type==="submit"&&l!==document.body&&n.value.contains(l)===!1&&l.contains(n.value)===!1){n.value.focus();const _=()=>{document.removeEventListener("keydown",f,!0),document.removeEventListener("keyup",_,r),n.value!==null&&n.value.removeEventListener("blur",_,r)};document.addEventListener("keydown",f,!0),document.addEventListener("keyup",_,r),n.value.addEventListener("blur",_,r)}}h(t)}}function V(t){n.value!==null&&(v("keydown",t),O(t,[13,32])===!0&&g!==n.value&&(g!==null&&k(),t.defaultPrevented!==!0&&(n.value.focus(),g=n.value,n.value.classList.add("q-btn--active"),document.addEventListener("keyup",s,!0),n.value.addEventListener("blur",s,r)),f(t)))}function W(t){n.value!==null&&(v("touchstart",t),t.defaultPrevented!==!0&&(b!==n.value&&(b!==null&&k(),b=n.value,c=t.target,c.addEventListener("touchcancel",s,r),c.addEventListener("touchend",s,r)),y=!0,a!==null&&clearTimeout(a),a=setTimeout(()=>{a=null,y=!1},200)))}function F(t){n.value!==null&&(t.qSkipRipple=y===!0,v("mousedown",t),t.defaultPrevented!==!0&&m!==n.value&&(m!==null&&k(),m=n.value,n.value.classList.add("q-btn--active"),document.addEventListener("mouseup",s,r)))}function s(t){if(n.value!==null&&!(t!==void 0&&t.type==="blur"&&document.activeElement===n.value)){if(t!==void 0&&t.type==="keyup"){if(g===n.value&&O(t,[13,32])===!0){const l=new MouseEvent("click",t);l.qKeyEvent=!0,t.defaultPrevented===!0&&X(l),t.cancelBubble===!0&&Y(l),n.value.dispatchEvent(l),f(t),t.qKeyEvent=!0}v("keyup",t)}k()}}function k(t){const l=L.value;t!==!0&&(b===n.value||m===n.value)&&l!==null&&l!==document.activeElement&&(l.setAttribute("tabindex",-1),l.focus()),b===n.value&&(c!==null&&(c.removeEventListener("touchcancel",s,r),c.removeEventListener("touchend",s,r)),b=c=null),m===n.value&&(document.removeEventListener("mouseup",s,r),m=null),g===n.value&&(document.removeEventListener("keyup",s,!0),n.value!==null&&n.value.removeEventListener("blur",s,r),g=null),n.value!==null&&n.value.classList.remove("q-btn--active")}function q(t){f(t),t.qSkipRipple=!0}return H(()=>{k(!0)}),Object.assign(x,{click:M}),()=>{let t=[];e.icon!==void 0&&t.push(o(j,{name:e.icon,left:e.stack===!1&&d.value===!0,role:"img","aria-hidden":"true"})),d.value===!0&&t.push(o("span",{class:"block"},[e.label])),t=ce(i.default,t),e.iconRight!==void 0&&e.round===!1&&t.push(o(j,{name:e.iconRight,right:e.stack===!1&&d.value===!0,role:"img","aria-hidden":"true"}));const l=[o("span",{class:"q-focus-helper",ref:L})];return e.loading===!0&&e.percentage!==void 0&&l.push(o("span",{class:"q-btn__progress absolute-full overflow-hidden"+(e.darkPercentage===!0?" q-btn__progress--dark":"")},[o("span",{class:"q-btn__progress-indicator fit block",style:Q.value})])),l.push(o("span",{class:"q-btn__content text-center col items-center q-anchor--skip "+C.value},t)),e.loading!==null&&l.push(o(G,{name:"q-transition--fade"},()=>e.loading===!0?[o("span",{key:"loading",class:"absolute-full flex flex-center"},i.loading!==void 0?i.loading():[o(re)])]:null)),J(o(S.value,I.value,l),[[oe,N.value,void 0,z.value]])}}});const Ee={},Be={class:"fullscreen bg-blue text-white text-center q-pa-md flex flex-center"},Le=R("div",{style:{"font-size":"30vh"}}," 404 ",-1),_e=R("div",{class:"text-h2",style:{opacity:".4"}}," Oops. Nothing here... ",-1);function Ce(e,i){return ee(),te("div",Be,[R("div",null,[Le,_e,ne(xe,{class:"q-mt-xl",color:"white","text-color":"blue",unelevated:"",to:"/",label:"Go Home","no-caps":""})])])}var Pe=p(Ee,[["render",Ce]]);export{Pe as default};
