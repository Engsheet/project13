import { pb } from "@/api/pocketbase";
import { useFetchList } from "@/hooks/useFetchList";
import { getPbImageURL } from "@/utils";
import { shape, string } from "prop-types";
import { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function UserReviewHeader({ item }) {
  const { userId } = useParams();
  const myId = pb.authStore.model.id;
  const [isFollow, setIsFollow] = useState(false);
  const { data, refetch } = useFetchList("follow", { expand: "owner" });

  useEffect(() => {
    const myFollowings = data?.filter((el) => el.expand.owner.id === myId)[0].followings;
    myFollowings?.includes(userId) ? setIsFollow(true) : setIsFollow(false);
  }, [data, myId, userId]);

  const handleFollow = async () => {
    let followings;
    let followers;
    const myRecordId = data?.filter((el) => el.expand.owner.id === myId)[0].id;
    const myFollowings = data?.filter((el) => el.expand.owner.id === myId)[0].followings;
    const writerRecordId = data?.filter((el) => el.expand.owner.id === userId)[0].id;
    const writerFollowers = data?.filter((el) => el.expand.owner.id === userId)[0].followers;

    if (isFollow) {
      followings = myFollowings.filter((el) => el !== userId);
      followers = writerFollowers.filter((el) => el !== myId);
      setIsFollow(false);
    } else {
      followings = [...myFollowings, userId];
      followers = [...writerFollowers, myId];
      setIsFollow(true);
    }

    try {
      await pb.collection("follow").update(myRecordId, {
        followings,
      });
      await pb.collection("follow").update(writerRecordId, {
        followers,
      });
    } catch (error) {
      console.error(error);
    }

    refetch();
  };

  return (
    <header className="sticky top-[-4px] z-10 bg-gray-50 py-4 shadow-[0_6px_6px_-2px_rgba(0,0,0,0.1)]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-3">
        <Link to={myId === userId ? "/my-review" : `/user-review/${userId}`}>
          <dl className="flex items-center gap-1">
            <dt className="sr-only">작성자 프로필</dt>
            <dd className="mr-1 h-7 w-7 rounded-full bg-gray-300">
              {item.expand.writer.avatar ? (
                <img
                  src={getPbImageURL(item.expand.writer, item.expand.writer.avatar)}
                  alt="작성자 프로필"
                  className="h-full w-full rounded-full object-cover text-xs"
                />
              ) : (
                <IoPersonCircleSharp className="h-full w-full text-gray-100" />
              )}
            </dd>
            <dt className="sr-only">작성자</dt>
            {myId === userId ? (
              <dd className="font-bold">
                <span className="text-base font-semibold">MY 플레이스</span>
              </dd>
            ) : (
              <dd className="font-bold">
                {item.expand.writer.nickname}
                <span className="text-base font-semibold"> 님의 플레이스</span>
              </dd>
            )}
          </dl>
        </Link>
        {myId === userId ? (
          <div></div>
        ) : isFollow ? (
          <button className="h-8 rounded-md bg-gray-100 px-3 text-sm text-gray-500" onClick={handleFollow}>
            팔로우 취소
          </button>
        ) : (
          <button className="h-8 rounded-md bg-secondary px-3 text-sm text-white" onClick={handleFollow}>
            팔로우
          </button>
        )}
      </div>
    </header>
  );
}

UserReviewHeader.propTypes = {
  item: shape({
    expand: shape({
      writer: shape({
        id: string,
        avatar: string,
        nickname: string,
      }),
    }),
  }),
};

export default UserReviewHeader;
