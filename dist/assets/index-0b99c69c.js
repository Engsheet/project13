import{r as y,g as _}from"./index-06c6c1f5.js";import{s as P}from"./index-ea9f9059.js";const v=t=>{let e;const o=new Set,r=(s,f)=>{const u=typeof s=="function"?s(e):s;if(!Object.is(u,e)){const d=e;e=f??typeof u!="object"?u:Object.assign({},e,u),o.forEach(E=>E(e,d))}},n=()=>e,l={setState:r,getState:n,subscribe:s=>(o.add(s),()=>o.delete(s)),destroy:()=>{o.clear()}};return e=t(r,n,l),l},R=t=>t?v(t):v;var m={exports:{}},D={};/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S=y,g=P;function x(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var V=typeof Object.is=="function"?Object.is:x,I=g.useSyncExternalStore,A=S.useRef,w=S.useEffect,O=S.useMemo,T=S.useDebugValue;D.useSyncExternalStoreWithSelector=function(t,e,o,r,n){var c=A(null);if(c.current===null){var a={hasValue:!1,value:null};c.current=a}else a=c.current;c=O(function(){function s(i){if(!f){if(f=!0,u=i,i=r(i),n!==void 0&&a.hasValue){var p=a.value;if(n(p,i))return d=p}return d=i}if(p=d,V(u,i))return p;var h=r(i);return n!==void 0&&n(p,h)?p:(u=i,d=h)}var f=!1,u,d,E=o===void 0?null:o;return[function(){return s(e())},E===null?void 0:function(){return s(E())}]},[e,o,r,n]);var l=I(t,c[0],c[1]);return w(function(){a.hasValue=!0,a.value=l},[l]),T(l),l};m.exports=D;var B=m.exports;const j=_(B),{useSyncExternalStoreWithSelector:k}=j;function q(t,e=t.getState,o){const r=k(t.subscribe,t.getState,t.getServerState||t.getState,e,o);return y.useDebugValue(r),r}const b=t=>{const e=typeof t=="function"?R(t):t,o=(r,n)=>q(e,r,n);return Object.assign(o,e),o},W=t=>t?b(t):b;export{W as c};
