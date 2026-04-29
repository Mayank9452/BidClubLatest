import{c as e,b as x,g as p,u as m,j as a,A as y,B as u,V as b}from"./index-JCcjIq94.js";/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=e("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=e("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=e("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=e("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=e("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.462.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=e("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]),N=75;function M({isOpen:o=!1,isToggle:n=!1,setIsOpen:l}){const d=x(),i=p(),{t}=m(),c=[{id:"home",label:t.navbarHome,icon:j,path:["/dashboard","/"]},{id:"leaderboard",label:t.navbarLeaderboard,icon:w,path:["/leaderboard"]},{id:"notification",label:t.navbarNotification,icon:f,path:["/notification"]},{id:"games",label:t.navbarGames,icon:g,path:["/games"]}];return a.jsxs(a.Fragment,{children:[a.jsx("div",{style:{height:N}}),a.jsxs("div",{className:"fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[480px] z-50 grid",children:[n&&a.jsxs("div",{className:"flex justify-between",children:[a.jsxs("button",{className:"glass-card-light w-16 text-xs px-2 py-1 gap-1 pt-2 shadow shadow-white flex justify-center items-center rounded-t-md",style:{border:"none"},onClick:()=>d(-1),children:[a.jsx(v,{className:"h-4 w-4"}),t.navbarBack]}),a.jsx("button",{className:"glass-card-light w-12 shadow shadow-white flex justify-center items-center rounded-t-md",style:{border:"none"},onClick:()=>l==null?void 0:l(!o),children:a.jsx(k,{className:`transform transition-all duration-300 ${o?"":"rotate-180"}`})})]}),a.jsx(y,{children:!o&&a.jsxs("div",{style:{paddingTop:20,paddingBottom:5},className:`relative px-2 sm:px-5 ${n?"":"rounded-t-md pb-1 sm:pb-2 pt-2 sm:pt-3"}`,children:[a.jsx("div",{className:`absolute w-full start-0 bottom-0 h-[calc(100%-15px)] sm:h-[calc(100%-20px)] -z-[99] bg-deep-navy px-4 ${n?"":"rounded-t-md border-primary/20"}`,style:{border:"none",borderTop:`${n?"0px":"1px"} solid hsl(240 6% 20%)`}}),a.jsx("div",{className:"flex justify-around items-end",children:c.map(s=>{const h=s.icon,r=s.path.includes(i.pathname);return a.jsxs(u,{variant:"ghost",size:"sm",onClick:()=>d(s.path[0]),className:b("flex flex-col items-center gap-1 h-auto py-2 px-3 transition-smooth hover:gradient-light/30 font-ex",r?"gradient-light text-black [&_*]:text-black":"text-white-foreground hover:text-foreground pb-3 font-extrabold"),children:[a.jsx(h,{size:24,className:`transition-smooth ${r?"animate-bounce-in":""}`}),a.jsx("span",{className:"text-xs ",children:s.label}),r&&a.jsx("div",{className:"w-1 h-1 rounded-full bg-primary animate-glow-pulse"})]},s.id)})})]})})]})]})}export{M as B,g as G,w as T,f as a};
