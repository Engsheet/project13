import { pb } from "@/api/pocketbase";
import Kakaomap from "@/components/kakaomap";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getPbImageURL } from "@/utils";

function Favorites() {
  const myId = pb.authStore.model.id;
  const { data } = useUserInfo(myId, "favorites");
  const favorites = data?.expand.favorites;

  return (
    <main>
      <h2 className="sr-only">저장 페이지</h2>
      <div id="map" className="my-2 h-96 w-full rounded-lg bg-gray-300">
        <Kakaomap items={favorites} />
      </div>
      <h3 className="border-b py-4 text-lg font-bold">내가 저장한 장소</h3>
      <ul>
        {favorites?.map((item) => (
          <li key={crypto.randomUUID()} className="border-b border-gray-100 py-4">
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
  );
}

export default Favorites;
