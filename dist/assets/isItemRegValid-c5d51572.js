import{a as t}from"./alertMessage-026c37b5.js";import"./index-06c6c1f5.js";const r=/^[a-zA-Z0-9ㄱ-힣]{2,10}$/,s=/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,n=/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,16}$/,c=/^[a-zA-Z0-9]{4,20}$/,i=/^01[016789]-?\d{3,4}-?\d{4}$/;function m(e){return s.test(e)}function g(e){return i.test(e)}function d(e,a){switch(!0){case e==="nickname":return r.test(a);case e==="username":return c.test(a);case e==="email":return s.test(a);case e==="password":return n.test(a);default:return!0}}function l(e){switch(!0){case e==="username":t("아이디는 소문자/대문자/숫자로 이루어진 4~20자리 문자여야 합니다");break;case e==="nickname":t("닉네임은 특수문자 제외 2~10자리 문자입니다.");break;case e==="email":t("사용가능한 이메일 양식이 아닙니다");break;case e==="password":t("비밀번호는 숫자/영어/특수문자를 포함하는 8~16자리 문자여야 합니다");break}}export{g as a,d as b,l as c,m as i};