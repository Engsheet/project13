import { useState, useEffect } from "react";
import useReservation from "@h/useReservation";
import { alertMessage } from "@/utils";

function ReservationGuestCount() {
  const { setReservationData } = useReservation();
  const [guestCount, setGuestCount] = useState(1);

  const handleGuestCountChange = (e) => {
    const count = +e.target.value;
    if (isNaN(count)) {
      setGuestCount(1);
    }
    if (count > 10) {
      setGuestCount(String(10));
      alertMessage("최대 10명까지 예약 가능합니다.", "❗");
    } else {
      setGuestCount(String(count));
    }
  };

  useEffect(() => {
    setReservationData({ guestCount: +guestCount });
  }, [guestCount, setReservationData]);

  return (
    <>
      <div className="flex flex-row items-center gap-4 border-b py-4">
        <label htmlFor="guestCount" className="text-lg font-semibold">
          인원
        </label>
        <input
          type="number"
          min="1"
          max="10"
          id="guestCount"
          value={guestCount}
          inputMode="numeric"
          onChange={handleGuestCountChange}
          className="rounded border border-primary px-4 py-2"
        />
        <span>명</span>
      </div>
    </>
  );
}

export default ReservationGuestCount;
