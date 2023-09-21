import { pb } from "@/api/pocketbase";
import { useUserAuth } from "@/hooks/useUserAuth";
import { bool, shape, string } from "prop-types";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsBookmarkStar, BsFillBookmarkStarFill } from "react-icons/bs";

function FeedItemFooter({ item, isPlace = false }) {
  const userId = pb.authStore.model.id;
  const userFavorites = pb.authStore.model.favorites;
  const [isSave, setIsSave] = useState(false);
  const { data, refetch } = useUserAuth();

  useEffect(() => {
    data?.record.favorites.includes(item.expand.place.id) ? setIsSave(true) : setIsSave(false);
  }, [data, item.expand.place.id]);

  const handleSave = async () => {
    let favorites;

    if (isSave) {
      favorites = userFavorites.filter((el) => el !== item.expand.place.id);
      setIsSave(false);
    } else {
      favorites = [...userFavorites, item.expand.place.id];
      setIsSave(true);
    }

    try {
      await pb.collection("users").update(userId, {
        favorites,
      });
    } catch (error) {
      console.error(error);
    }
    refetch();
  };

  return (
    <div className={`${isPlace ? "" : "rounded-lg border"} mb-2 p-4`}>
      <div className={`flex items-center justify-between ${isPlace ? "mx-auto max-w-3xl px-2" : ""}`}>
      <Link to={"/reservation-write"} state={{
          userId: userId,
          placeId: item.expand.place.id,
          title: item.expand.place.title,
          category: item.expand.place.category,
          address: item.expand.place.address
      }}>
        <dl className="grid grid-cols-[36px_1fr] gap-1">
          <dt className="sr-only">플레이스 이름</dt>
          <dd className="col-start-1 col-end-3 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
            {item.expand.place.title}
          </dd>
          <dt className="sr-only">플레이스 카테고리</dt>
          <dd className="col-start-1 w-fit text-sm text-gray-500">
            {item.expand.place.category} <span aria-hidden>·</span>
          </dd>
          <dt className="sr-only">플레이스 주소</dt>
          <dd className="col-start-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
            {item.expand.place.address}
          </dd>
        </dl>
      </Link>
        {isSave ? (
          <button aria-label="플레이스 저장하기" className="ml-2 flex flex-col items-center gap-1 text-primary">
            <BsFillBookmarkStarFill className="text-2xl" onClick={handleSave} />
            <span className="text-xs">저장됨</span>
          </button>
        ) : (
          <button aria-label="플레이스 저장하기" className="ml-2 flex flex-col items-center gap-1 text-gray-400">
            <BsBookmarkStar className="text-2xl" onClick={handleSave} />
            <span className="text-xs">저장</span>
          </button>
        )}
      </div>
    </div>
  );
}

FeedItemFooter.propTypes = {
  item: shape({
    expand: shape({
      place: shape({
        title: string,
        category: string,
        address: string,
      }),
    }),
  }),
  isPlace: bool,
};

export default FeedItemFooter;
