import { pb } from "@/api/pocketbase";
import NoResult from "@/components/Feed/NoResult";
import Kakaomap from "@/components/Kakaomap";
import PopUpModal from "@/components/PopUpModal";
import ScrollToTop from "@/components/ScrollTop";
import Spinner from "@/components/Spinner";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getPbImageURL } from "@/utils";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import MetaData from "@c//MetaData";

function Favorites() {
  const myId = pb.authStore.model.id;
  const userFavorites = pb.authStore.model.favorites;
  const [openModal, setOpenModal] = useState(false);
  const [itemId, setItemId] = useState("");
  const { data, refetch, isLoading } = useUserInfo(myId, "favorites");
  const favorites = data?.expand?.favorites?.length && data?.expand.favorites;

  const handleDelete = async () => {
    const favorites = userFavorites.filter((el) => el !== itemId);
    try {
      await pb.collection("users").update(myId, {
        favorites,
      });
    } catch (error) {
      console.error(error);
    }

    setOpenModal(false);
    refetch();
  };

  if (isLoading) return <Spinner />;

  const metaData = {
    title: "Best Place - 저장",
    description: "즐겨찾기에 저장한 맛집들",
    keywords: ["지도", "맛집", "즐겨찾기"],
    image: "/logo.svg",
  };

  return (
    <>
      <MetaData props={metaData} />
      <ScrollToTop />
      <PopUpModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="이 장소를 리스트에서 삭제합니다."
        actionTitle="삭제"
        handleEvent={handleDelete}
      />
      {favorites ? (
        <main>
          <h2 className="sr-only">저장 페이지</h2>
          <div id="map" className="my-2 h-96 w-full rounded-lg bg-gray-300">
            <Kakaomap items={favorites} />
          </div>
          <h3 className="border-b py-4 text-lg font-bold">내가 저장한 장소</h3>
          <ul>
            {favorites?.map((item) => (
              <li key={crypto.randomUUID()} className="border-b border-gray-100 py-4">
                <div className="flex justify-between">
                  <dl className="grid grid-cols-[fit-content(100ch)_1fr] items-center gap-x-2">
                    <dt className="sr-only">플레이스 이름</dt>
                    <dd className="col-start-1 row-start-1 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold">
                      {item.title}
                    </dd>
                    <dt className="sr-only">플레이스 카테고리</dt>
                    <dd className="col-start-2 row-start-1 text-sm font-light text-gray-500">{item.category}</dd>
                    <dt className="sr-only">플레이스 주소</dt>
                    <dd className="col-start-1 col-end-3 overflow-hidden text-ellipsis whitespace-nowrap font-light">
                      {item.address}
                    </dd>
                  </dl>

                  <button
                    type="button"
                    onClick={() => {
                      setItemId(item.id);
                      setOpenModal(true);
                    }}
                    aria-label="장소 삭제하기"
                  >
                    <BsTrashFill className="text-xl text-secondary" aria-hidden />
                  </button>
                </div>
                <figure className="flex h-28 gap-1 pt-3">
                  {item.photos.slice(0, 3).map((photo, index) => (
                    <img
                      key={photo}
                      src={getPbImageURL(item, photo)}
                      alt={`${item.title}의 ${index + 1}번째 사진`}
                      className="w-1/3 rounded-lg object-cover"
                    />
                  ))}
                </figure>
              </li>
            ))}
          </ul>
        </main>
      ) : (
        <NoResult title={"회원님이 저장한 장소가 없어요."} contents={"자주 방문하는 장소를 저장해보세요!"} />
      )}
    </>
  );
}

export default Favorites;
