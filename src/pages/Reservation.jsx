import { pb } from "@/api/pocketbase";
import NoResult from "@/components/Feed/NoResult";
import ReservationCount from "@/components/ReservationList/ReservationCount";
import ReservationList from "@/components/ReservationList/ReservationList";
import ReservedList from "@/components/ReservationList/ReservedList";
import ScrollToTop from "@/components/ScrollTop";
import Spinner from "@/components/Spinner";
import { useFetchList } from "@/hooks/useFetchList";
import MetaData from "@c/MetaData";

//@ 예약 페이지 컴포넌트
function Reservation() {
  let userInfo = pb.authStore.model;
  const { data: reservation, isLoading } = useFetchList("reservation", {
    filter: `booker = '${userInfo.id}'`,
    expand: "place",
    sort: "-date",
  });

  if (isLoading) return <Spinner />;

  let reservedList = [];
  let progressList = [];
  let visitedList = [];
  let canceledList = [];

  reservation.forEach((item) => {
    !item.canceled && !item.visited
      ? (reservedList = [...reservedList, item])
      : (progressList = [...progressList, item]);
  });

  progressList.forEach((item) => {
    !item.canceled ? (visitedList = [...visitedList, item]) : (canceledList = [...canceledList, item]);
  });

  const metaData = {
    title: "Best Place - 방문/예약",
    description: "내 방문/예약 정보 확인하기",
    keywords: ["맛집", "리뷰", "커뮤니티"],
    image: "/logo.svg",
  };

  return reservation.length !== 0 ? (
    <div>
      <MetaData props={metaData} />
      <ScrollToTop />
      {/* 현재 예약중 리스트 */}
      <ReservedList userInfo={userInfo} reservedList={reservedList.reverse()} />

      {/* 예약 횟수 */}
      <ReservationCount userInfo={userInfo} visitedList={visitedList} />

      {/* 예약 리스트 */}
      <ReservationList
        userInfo={userInfo}
        progressList={progressList}
        visitedList={visitedList}
        canceledList={canceledList}
      />
    </div>
  ) : (
    <NoResult title={"회원님의 예약 정보가 없어요."} contents={"원하는 장소를 예약하고, 예약 정보를 관리해보세요!"} />
  );
}

export default Reservation;
