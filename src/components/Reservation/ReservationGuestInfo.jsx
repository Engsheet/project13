import useReservation from "@h/useReservation";
import WriteText from "@c/WriteText";

function ReservationGuestInfo() {
  const { handleInputChange, reservationData } = useReservation();

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 border-b py-4">
        <label htmlFor="guestInfo" className="text-lg font-semibold">
          예약자 정보
        </label>
        <p>
          <span className="text-red-600">*</span> 표시는 필수입력 사항입니다.
        </p>
        <div id="guestInfo" className="ml-3 flex flex-col gap-4 font-semibold">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <label htmlFor="reservedName" className="flex text-sm sm:text-base">
              예약명<span className="align-text-bottom text-red-600">*</span>
            </label>
            <input
              type="text"
              id="reservedName"
              name="reservedName"
              placeholder="이름 또는 단체명을 입력하세요"
              required
              inputMode="text"
              onChange={handleInputChange}
              className="w-full rounded border border-primary px-4 py-2 sm:w-5/6"
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <label htmlFor="tel" className="flex text-sm sm:text-base">
              연락처<span className="align-text-bottom text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="tel"
              name="tel"
              placeholder="전화번호를 입력하세요"
              required
              inputMode="tel"
              onChange={handleInputChange}
              className="w-full rounded border border-primary px-4 py-2 sm:w-5/6"
            />
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <label htmlFor="reservedName" className="flex text-sm sm:text-base">
              이메일<span className="align-text-bottom text-red-600">*</span>
            </label>
            <input
              type="email"
              id="reservedName"
              name="email"
              placeholder="example@naver.com"
              required
              inputMode="email"
              defaultValue={reservationData.email}
              onChange={handleInputChange}
              className="w-full rounded border border-primary px-4 py-2 sm:w-5/6"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
            <label htmlFor="requirements" className="flex text-sm sm:w-[19%] sm:text-base">
              요청사항
            </label>
            <WriteText
              id="requirements"
              name="requirements"
              placeholder="업체에 요청하실 내용을 적어주세요"
              inputMode="text"
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationGuestInfo;
