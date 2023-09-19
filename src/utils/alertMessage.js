import toast from 'react-hot-toast';

export default function alertMessage(text="확인되었습니다.", icon="✔") {
  toast(text,{
    duration: 2000,
    icon: icon,
    style:{
      background: "#e0f2fe",
      color: "#000",
      borderRadius: "28px",
      padding: "12px"
    },
    ariaProps:{
      role: "alert",
      'aria-live': 'polite'
    }
  });    
}