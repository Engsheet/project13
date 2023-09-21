import { pb } from '@/api/pocketbase';
import { useNavigate } from 'react-router-dom';
import Button from '@c/Button';
import useReservation from '@h/useReservation';
import PlaceInfo from '@c/Reservation/PlaceInfo';
import ReservationDate from '@c/Reservation/ReservationDate';
import ReservationTime from '@c/Reservation/ReservationTime';
import ReservationGuestCount from '@c/Reservation/ReservationGuestCount';
import ReservationGuestInfo from '@c/Reservation/ReservationGuestInfo';
// import PhotoLayout from '@c/Feed/FeedItem/PhotoLayout';
import { alertMessage } from '@u/index';

function ReservationWrite() {
  const navigate = useNavigate();
  const {reservationData} = useReservation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await pb.collection('reservation').create(reservationData);
      alertMessage("예약되었습니다.");
      navigate("/reservation");
    } catch (error) {
      alertMessage("요청하신 작업을 수행하지 못했습니다.","❗");
      console.error('데이터 전송 실패:', error);
    }
  };

  return (
    <>
    <section className="gap-4 flex-wrap mx-auto max-w-3xl mt-4 my-8">
      <h1 className="hidden">가게정보</h1>
      <PlaceInfo/>
      <div className="flex flex-col gap-4 items-center mt-4 w-full h-80 p-4">
        <div className="w-full h-60 border ">이미지 불러오기!</div>
        <p className="border-t w-full p-4">예약순서에 따라 창가쪽 좌석 우선 배치됩니다.</p>
      </div>
    </section>
    <section>
      <h1 className="text-lg text-center font-semibold mb-4">예약정보를 입력하세요</h1>
      <form method="POST" className="flex flex-col">
        <ReservationDate/>
        {/* <ReservationTime/> */}
        <ReservationGuestCount/>
        <ReservationGuestInfo/>
        <div className="flex gap-2">
          <Button text="취소하기" onClick={() => navigate(-1)} bgColor="bg-gray-100" textColor="text-red-500"/>
          <Button type="submit" text="등록하기" onClick={handleSubmit}/>
        </div>
      </form>
    </section>
  </>
  )
}

export default ReservationWrite