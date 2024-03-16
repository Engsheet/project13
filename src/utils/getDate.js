export const getDate = (date, format) => {
  date = new Date(date);
  const map = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
    day: getDay(date.getDay()),
  };

  return format.replace(/mm|dd|yy|yyy|day/gi, (matched) => map[matched]);
};

export const getDay = (date) => {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  return week[date];
};

// 날짜 포맷
export function dateFormat(datetime) {
  const todayDate = new Date();
  const todayYear = todayDate.getFullYear().toString().slice(-2);
  const reservationDate = new Date(datetime);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const year = reservationDate.getFullYear().toString().slice(-2);
  const month = reservationDate.getMonth() + 1;
  const day = reservationDate.getDate();
  const dayOfWeek = week[reservationDate.getDay()];

  return `${todayYear !== year ? year + "." : ""} ${month}. ${day} ${dayOfWeek}`;
}

// 시간 포맷
export function timeFormat(datetime) {
  const reservationDate = new Date(datetime);
  const hour = reservationDate.getHours();
  const minute = reservationDate.getMinutes();
  const ampm = hour < 12 ? "오전" : "오후";

  return `${ampm} ${hour <= 12 ? hour : hour - 12}:${minute < 10 ? "0" + minute : minute}`;
}

// 날짜 계산
export function calcDay(firstDatetime, secondDatetime = null) {
  const firstDate = new Date(firstDatetime);
  const secondDate = secondDatetime ? new Date(secondDatetime) : new Date();

  const betweenTime = Math.floor((firstDate.getTime() - secondDate.getTime()) / 1000 / 60);
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }
}
