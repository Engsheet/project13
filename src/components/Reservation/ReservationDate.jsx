import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useReservation from "@h/useReservation";
import { format } from "date-fns";

function ReservationDate() {
  const { setReservationData } = useReservation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("09:00");

  const maxSelectableDate = new Date();
  maxSelectableDate.setDate(maxSelectableDate.getDate() + 21); // 현재 날짜로부터 3주 이내

  // 예약시간 09:00 ~ 20:00 option 선택
  const options = [];

  for (let hour = 9; hour <= 20; hour++) {
    const timeString = `${hour.toString().padStart(2, "0")}:00`;
    options.push(
      <option key={timeString} value={timeString} className={"time-list-item"}>
        {timeString}
      </option>
    );
  }

  const handleDateClick = (e) => setSelectedDate(e);
  const handleTimeClick = (e) => setSelectedTime(e.target.value);

  useEffect(() => {
    const formattedDate = format(new Date(selectedDate), "yyyy-MM-dd"); // '2023-00-00' 형식으로 변환
    const formattedTime = `${selectedTime}:00`; // // '09:00:00' 형식으로 변환
    const mergeDateAndTime = new Date(`${formattedDate} ${formattedTime}`); // 한국표준시 GMT로 변환
    setReservationData({ date: mergeDateAndTime });
  }, [selectedDate, selectedTime, setReservationData]);

  return (
    <>
      <div className="flex justify-center">
        <label htmlFor="date" className="hidden">
          캘린더
        </label>
        <Calendar
          id="date"
          calendarType={"gregory"}
          minDetail={"month"}
          fortmatShortWeekday={true}
          minDate={new Date()}
          maxDate={maxSelectableDate}
          dateFormat="yyyy.MM.dd(eee)"
          onClickDay={handleDateClick}
          // locale="en-US"
          prevAriaLabel="이전달"
          prevLabel="<"
          nextAriaLabel="다음달"
          nextLabel=">"
          navigationAriaLive="polite"
          prev2Label={null}
          next2Label={null}
          className="border border-primary p-4 text-center"
        />
      </div>
      {/* 날짜 */}
      <div className="flex flex-row items-center gap-4 border-b py-4">
        <label htmlFor="date" className="text-lg font-semibold">
          날짜
        </label>
        <span>{selectedDate && selectedDate.toLocaleDateString()}</span>
      </div>
      {/* 시간 */}
      <div className=" flex flex-row items-center gap-4 border-b py-4">
        <label htmlFor="time" className="text-lg font-semibold">
          시간
        </label>
        <select
          id="time"
          value={selectedTime}
          className="rounded border border-primary px-4 py-2"
          onChange={handleTimeClick}
        >
          {options}
        </select>
      </div>
    </>
  );
}

export default ReservationDate;
