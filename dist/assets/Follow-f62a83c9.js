import{r as g,p as k,j as e,S as F,b,e as j}from"./index-06c6c1f5.js";import{N as S}from"./NoResult-cde6063e.js";import{S as C}from"./ScrollTop-7e4dffaf.js";import{u as I}from"./useFetchList-8f652331.js";import{g as L}from"./getPbImageURL-ebcdbcbf.js";import{d as y}from"./debounce-1252dfff.js";import{H as T}from"./Header-49b89639.js";import{a as B}from"./index.esm-c4f99d41.js";import{I as M}from"./index.esm-e904fcbc.js";import{M as E}from"./MetaData-baa07fc2.js";import"./useQuery-7f8ad36b.js";import"./useBaseQuery-d5fe4309.js";import"./index-ea9f9059.js";import"./PopUpModal-a427d51e.js";import"./iconBase-51491e03.js";import"./index.esm-a526b47c.js";function Y(){var h,p;const[c,n]=g.useState("following"),s=k.authStore.model.id,{data:f,isLoading:a,refetch:m}=I("follow",{expand:"followers,followings"}),t=f==null?void 0:f.filter(o=>o.owner===s)[0],d=((h=t==null?void 0:t.expand)==null?void 0:h.followings)||[],w=((p=t==null?void 0:t.expand)==null?void 0:p.followers)||[],u=d.map(o=>o.id);let x=[];x=c==="following"?d:w;const r=()=>{history.back()};function l(o){switch(o.target.innerText){case"팔로잉":n("following");break;case"팔로워":n("follower");break}}const i={title:"Best Place - 팔로우",description:"나를 따르는 팔로워, 내가 따르는 팔로잉",keywords:["팔로우","팔로워","팔로잉","커뮤니티"],image:"/public/logo.svg"};return e.jsxs(e.Fragment,{children:[e.jsx(E,{props:i}),e.jsx(C,{}),e.jsx(T,{}),e.jsxs("div",{className:"mx-auto max-w-xl",children:[e.jsxs("div",{className:"my-4 flex items-center gap-2",children:[e.jsx("button",{type:"button",onClick:r,className:"ml-1 px-1 text-4xl","aria-label":"뒤로 가기",children:e.jsx(B,{})}),e.jsx("h2",{className:"text-xl font-bold",children:"팔로잉/팔로워"})]}),e.jsxs("div",{className:"flex rounded-md shadow-sm",role:"group",children:[e.jsx("button",{type:"button",className:`text-md basis-1/2 border-b-2 border-r border-gray-200 bg-white px-4 py-2 font-medium text-gray-900 ${c==="following"?"block border-b-2 border-primary font-bold text-primary":"text-secondary hover:border-b-2 hover:border-secondary hover:font-bold focus:border-b-2 focus:border-secondary focus:font-bold"}`,onClick:l,children:"팔로잉"}),e.jsx("button",{type:"button",className:`text-md basis-1/2 border-b-2 border-gray-200 bg-white px-4 py-2 font-medium text-gray-900 ${c==="follower"?"block border-b-2 border-primary font-bold text-primary":"text-secondary hover:border-b-2 hover:border-secondary hover:font-bold focus:border-b-2 focus:border-secondary focus:font-bold"}`,onClick:l,children:"팔로워"})]}),a?e.jsx(F,{className:"mx-auto"}):x.length!==0?e.jsx("div",{children:x.map((o,N)=>e.jsxs("div",{className:"flex items-center justify-center border-b border-gray-100 px-4 py-3",children:[e.jsxs("dl",{className:"flex grow items-center gap-4",children:[e.jsx("dt",{className:"sr-only",children:"유저 사진"}),e.jsx("dd",{className:"rounded-full",children:o.avatar?e.jsx("img",{src:L(o,o.avatar),alt:"작성자 프로필",className:"h-10 w-10 rounded-full object-cover text-xs sm:h-14 sm:w-14"}):e.jsx(M,{className:"h-14 w-14 text-gray-100"})}),e.jsx("dt",{className:"sr-only",children:"유저 닉네임"}),e.jsx("dd",{children:e.jsx("p",{className:"text-sm sm:text-base overflow-hidden",children:o.nickname})})]}),e.jsx(v,{myId:s,item:o,data:f,refetch:m,myData:t,followingId:u})]},N))}):e.jsx(S,{title:"팔로잉/팔로워 정보가 없어요."})]})]})}function v({myId:c,item:n,data:s,refetch:f,myData:a,followingId:m}){const[t,d]=g.useState(!1),[w,u]=g.useState(!1);g.useEffect(()=>{var l;const r=((l=a==null?void 0:a.expand.followings)==null?void 0:l.map(i=>i.id))||[];r!=null&&r.includes(n.id)?d(!0):d(!1)},[n,a]);async function x(r){let l,i;const h=s==null?void 0:s.filter(o=>o.owner===r.target.id)[0];let p=s==null?void 0:s.filter(o=>o.owner===r.target.id)[0].followers;m.includes(r.target.id)?(l=m.filter(o=>o!==r.target.id),i=p.filter(o=>o!==c),d(!1)):(l=[...m,r.target.id],i=[...p,c],d(!0));try{await j("follow",a.id,{followings:l}),await j("follow",h.id,{followers:i})}catch(o){console.error(o)}f()}return e.jsx(e.Fragment,{children:t?e.jsx("button",{className:"h-8 rounded-md bg-secondary px-3 text-sm font-bold text-white hover:bg-gray-500 focus:bg-gray-500",id:n.id,onClick:y(r=>x(r),500),onMouseOver:()=>u(!0),onMouseOut:()=>u(!1),children:w?"언팔로우":"팔로잉"}):e.jsx("button",{className:"h-8 rounded-md border border-secondary px-3 text-sm font-bold text-secondary hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white",id:n.id,onClick:y(r=>x(r),500),children:"팔로우"})})}v.propTypes={myId:b.string,item:b.object,data:b.array,refetch:b.func,myData:b.object,followingId:b.array};export{Y as default};
