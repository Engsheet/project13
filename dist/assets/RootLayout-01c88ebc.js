import{p as d,r as n,j as e,L as l,N as f,O as p}from"./index-06c6c1f5.js";import{u as c}from"./useFetchList-8f652331.js";import{u}from"./follow-af2673d1.js";import{g as h}from"./getPbImageURL-ebcdbcbf.js";import{B as j}from"./index.esm-1ff9b723.js";import{I as b}from"./index.esm-e904fcbc.js";import{F as g,S as v}from"./ScrollTopButton-3739b1c5.js";import{H as N}from"./Header-49b89639.js";import{G as y}from"./iconBase-51491e03.js";import"./useQuery-7f8ad36b.js";import"./useBaseQuery-d5fe4309.js";import"./index-ea9f9059.js";import"./index-0b99c69c.js";import"./middleware-763781cb.js";import"./index.esm-bcf7d115.js";import"./PopUpModal-a427d51e.js";import"./index.esm-a526b47c.js";function w(){const s=d.authStore.model,o=u(m=>m.followCount),{data:r}=c("reviews",{filter:`writer='${s.id}'`}),{data:a}=c("follow",{filter:`owner='${s.id}'`}),t=a&&a[0],[x,i]=n.useState(!1);return e.jsx("div",{className:"mx-auto flex max-w-3xl justify-start px-3 py-3 pt-5",children:e.jsx("div",{className:"mx-auto flex flex-col items-center sm:mx-[12%]",children:e.jsxs("dl",{className:"relative flex items-center justify-center gap-x-6 gap-y-2",children:[e.jsxs("div",{children:[e.jsx("dt",{className:"sr-only",children:"내 프로필 사진"}),e.jsx("dd",{className:`h-24 w-24 rounded-full p-[3px] shadow-[0_1px_6px_rgba(0,0,0,0.3)] hover:bg-primary sm:h-24 sm:w-24 ${!x||"bg-primary"}`,children:e.jsx(l,{to:"/update-user-data",className:"outline-none",onFocus:()=>i(!0),onBlur:()=>i(!1),children:s.avatar?e.jsx("img",{src:h(s,s.avatar),alt:"유저 프로필 사진",className:"h-full w-full rounded-full object-cover"}):e.jsx(b,{className:"h-full w-full text-gray-100"})})})]}),e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("dt",{className:"sr-only",children:"내 닉네임"}),e.jsx("dd",{className:"w-fit pb-0.5 sm:pb-2",children:e.jsxs(l,{to:"/update-user-data",className:"group mx-2.5 sm:mx-4 flex items-center gap-1 text-2xl font-bold",children:[e.jsx("span",{children:s.nickname}),e.jsx(j,{"aria-label":"프로필 수정",title:"프로필 수정",className:"mx-0.5 text-base text-primary group-hover:text-black group-focus:text-black"})]})}),e.jsx("dt",{className:"sr-only",children:"나의 활동"}),e.jsx("dd",{children:e.jsxs("div",{className:"flex",children:[e.jsx(l,{to:"/my-review",className:"group",children:e.jsxs("div",{className:"flex flex-col items-center border-r border-primary px-3 sm:px-4 text-sm hover:font-bold group-focus:font-bold",children:[e.jsx("span",{children:"리뷰"}),e.jsx("span",{className:"font-semibold",children:r&&(r==null?void 0:r.length)})]})}),e.jsx(l,{to:"/follow",className:"group",children:e.jsxs("div",{className:"flex flex-col items-center border-r border-primary px-2 sm:px-4 text-sm hover:font-bold group-focus:font-bold",children:[e.jsx("span",{children:"팔로잉"}),e.jsx("span",{className:"font-semibold",children:o.following||(t==null?void 0:t.followings.length)})]})}),e.jsx(l,{to:"/follow",className:"group",children:e.jsxs("div",{className:"flex flex-col items-center px-2 sm:px-4 text-sm hover:font-bold group-focus:font-bold",children:[e.jsx("span",{children:"팔로워"}),e.jsx("span",{className:"font-semibold",children:o.follower||(t==null?void 0:t.followers.length)})]})})]})})]})]})})})}const L=[{title:"피드",url:""},{title:"리뷰",url:"my-review"},{title:"방문/예약",url:"reservation"},{title:"북마크",url:"favorite"}];function k(){return e.jsx("nav",{className:"sticky top-[-4px] z-10 mb-2 border-gray-800 bg-gray-50 shadow-md",children:e.jsx("ul",{className:"mx-auto flex max-w-2xl items-center justify-around sm:text-lg",children:L.map(s=>e.jsx("li",{children:e.jsx(f,{to:`/${s.url}`,className:({isActive:o})=>{const r="px-3 py-2";return o?`${r} block border-b-2 border-primary font-bold text-primary`:`${r} text-secondary hover:border-b-2 hover:border-secondary hover:font-bold focus:border-b-2 focus:border-secondary focus:font-bold`},children:s.title})},crypto.randomUUID()))})})}function S(s){return y({tag:"svg",attr:{viewBox:"0 0 1024 1024"},child:[{tag:"path",attr:{d:"M880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32zm-622.3-84c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9z"}}]})(s)}function F(){return e.jsx(l,{to:"/reservation",className:"flex aspect-square w-11 items-center justify-center rounded-full bg-primary text-lg hover:bg-secondary focus:bg-secondary sm:w-[52px] sm:text-xl","aria-label":"리뷰 쓰기",children:e.jsx(S,{})})}function T(){return e.jsxs("div",{className:"relative min-h-screen pb-28",children:[e.jsx(N,{}),e.jsx("div",{className:"relative bg-gray-50",children:e.jsx(w,{})}),e.jsx(k,{}),e.jsx(n.Suspense,{children:e.jsx("main",{className:"mx-auto max-w-3xl p-3 px-6",children:e.jsx(p,{})})}),e.jsx(g,{}),e.jsxs("div",{className:"fixed bottom-4 right-4 flex flex-col gap-3 text-white",children:[e.jsx(v,{}),e.jsx(F,{})]})]})}export{T as default};
