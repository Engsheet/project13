import{d as m,j as e,S as d,L as x}from"./index-06c6c1f5.js";import{F as h,S as f}from"./ScrollTopButton-3739b1c5.js";import{u as g,a as j}from"./region-43499ee0.js";import{g as u}from"./getPbImageURL-ebcdbcbf.js";import{F as w}from"./FeedItemHeader-aa1df1b8.js";import{H as N}from"./Header-49b89639.js";import{N as b}from"./NoResult-cde6063e.js";import{M as v}from"./MetaData-baa07fc2.js";import"./index.esm-bcf7d115.js";import"./iconBase-51491e03.js";import"./useBaseQuery-d5fe4309.js";import"./index-ea9f9059.js";import"./index-0b99c69c.js";import"./middleware-763781cb.js";import"./useFetchList-8f652331.js";import"./useQuery-7f8ad36b.js";import"./follow-af2673d1.js";import"./debounce-1252dfff.js";import"./index.esm-e904fcbc.js";import"./PopUpModal-a427d51e.js";import"./index.esm-a526b47c.js";function G(){const{userId:r}=m(),{data:a,isLoading:i,hasNextPage:o,fetchNextPage:l}=g("reviews",{filter:`writer.id='${r}'`}),t=a==null?void 0:a.flatMap(s=>s.items),n=j(async(s,c)=>{c.unobserve(s.target),o&&!i&&l()},{threshold:1});if(i)return e.jsx(d,{});const p={title:`Best Place - ${t[0].expand.writer.nickname}의 리뷰`,description:`${t[0].expand.writer.nickname}가 작성한 리뷰 타일`,keywords:[`${t[0].expand.writer.nickname}`,"리뷰","맛집후기"],image:`${a[0].items[0].photos}`};return t.length!==0?e.jsxs("div",{className:"relative min-h-screen pb-28",children:[e.jsx(v,{props:p}),e.jsx(N,{}),e.jsx("header",{className:"bg-gray-50 py-4 shadow-[0_6px_6px_-2px_rgba(0,0,0,0.1)]",children:e.jsx(w,{item:t[0],isUser:!0})}),e.jsxs("main",{className:"mx-auto max-w-3xl p-3",children:[e.jsx("h2",{className:"sr-only",children:"유저 리뷰 페이지"}),e.jsx("ul",{className:"my-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3",children:t==null?void 0:t.map(s=>e.jsx(x,{to:`/user-review-list/${r}`,state:s.id,children:e.jsx("li",{children:e.jsxs("figure",{className:"relative",children:[e.jsx("img",{src:u(s,s.photos[0]),alt:`${s.expand.writer.nickname}님의 ${s.expand.place.title} 리뷰`,className:"aspect-square min-h-[180px] w-full rounded-lg object-cover"}),e.jsxs("figcaption",{className:"absolute bottom-0 flex w-full flex-col rounded-b-lg bg-black bg-opacity-50 p-2 text-white",children:[e.jsx("span",{className:"overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light",title:s.expand.place.address,children:s.expand.place.address}),e.jsx("span",{className:"overflow-hidden text-ellipsis whitespace-nowrap",title:s.expand.place.title,children:s.expand.place.title})]})]})})},s.id))})]}),e.jsx("div",{ref:n,className:"h-[1px]"}),e.jsx(h,{isUser:!0}),e.jsx("div",{className:"fixed bottom-4 right-4 z-10 flex flex-col gap-3 text-white",children:e.jsx(f,{})})]}):e.jsx(b,{title:"이 회원님이 작성한 리뷰가 없어요.",contents:""})}export{G as default};
