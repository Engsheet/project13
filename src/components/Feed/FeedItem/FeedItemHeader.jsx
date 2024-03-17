import { pb } from "@/api/pocketbase";
import { useFetchList } from "@/hooks/useFetchList";
import { useFollowCountStore } from "@/store/follow";
import debounce from "@/utils/debounce";
import { getPbImageURL } from "@u";
import { bool, shape, string } from "prop-types";
import { useState, useEffect } from "react";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function FeedItemHeader({ item, isUser }) {
  const myId = pb.authStore.model.id;
  const [isFollow, setIsFollow] = useState(false);
  const [isHoverUnfollowBtn, setIsHoverFollowBtn] = useState(false);
  const { setFollowCount } = useFollowCountStore();
  const { data, refetch } = useFetchList("follow", { expand: "owner" });
  const { data: reviewData } = useFetchList("reviews", { filter: `writer='${item.writer}'` });
  const { data: followData, refetch: refetchWriter } = useFetchList("follow", { filter: `owner='${item.writer}'` });

  useEffect(() => {
    const myFollowings = data?.filter((el) => el.expand.owner.id === myId)[0].followings;
    const myFollowers = data?.filter((el) => el.expand.owner.id === myId)[0].followers;

    setFollowCount(myFollowings?.length, myFollowers?.length);
    myFollowings?.includes(item.expand.writer.id) ? setIsFollow(true) : setIsFollow(false);
  }, [data, myId, setFollowCount, item]);

  const handleFollow = async (e) => {
    let followings;
    let followers;
    const myRecordId = data?.filter((el) => el.expand.owner.id === myId)[0].id;
    const myFollowings = data?.filter((el) => el.expand.owner.id === myId)[0].followings;
    const writerRecordId = data?.filter((el) => el.expand.owner.id === e.target.id)[0].id;
    const writerFollowers = data?.filter((el) => el.expand.owner.id === e.target.id)[0].followers;

    if (isFollow) {
      followings = myFollowings.filter((el) => el !== item.expand.writer.id);
      followers = writerFollowers.filter((el) => el !== myId);
      setIsFollow(false);
    } else {
      followings = [...myFollowings, item.expand.writer.id];
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
    refetchWriter();
  };

  return (
    <div className={`${!isUser || "mx-auto max-w-3xl p-3"} flex items-center justify-between`}>
      <Link
        to={myId === item.expand.writer.id ? "my-review" : `/user-review/${item.expand.writer.id}`}
        className="group"
      >
        <dl className="grid items-center gap-x-1">
          <dt className="sr-only">작성자 프로필</dt>
          <dd
            className={`${
              isUser ? "h-16 w-16" : "h-12 w-12"
            } col-start-1 row-start-1 row-end-3 mr-1 rounded-full bg-white p-0.5 shadow-[0_1px_6px_rgba(0,0,0,0.1)] group-hover:bg-secondary group-focus:bg-secondary`}
          >
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
          <dd className={`${isUser ? "-mb-4 h-fit text-lg" : ""} col-start-2 col-end-6 font-bold`}>
            {item.expand.writer.nickname}
          </dd>
          <dt className={`${isUser ? "h-fit text-sm" : "text-xs font-semibold"} col-start-2 row-start-2`}>리뷰</dt>
          <dd className={`${isUser ? "h-fit text-sm" : "text-xs font-semibold"} col-start-3 row-start-2 text-primary`}>
            {reviewData && reviewData?.length}
          </dd>
          <dt className={`${isUser ? "h-fit text-sm" : "text-xs font-semibold"} col-start-4 row-start-2`}>팔로워</dt>
          <dd className={`${isUser ? "h-fit text-sm" : "text-xs font-semibold"} col-start-5 row-start-2 text-primary`}>
            {followData && followData[0].followers.length}
          </dd>
        </dl>
      </Link>
      {myId === item.expand.writer.id ? (
        <div aria-label="내가 쓴 리뷰" className="text-sm text-gray-500">
          내가 쓴 리뷰
        </div>
      ) : isFollow ? (
        <button
          className="h-8 rounded-md bg-secondary px-3 text-sm font-bold text-white hover:bg-gray-500 focus:bg-gray-500"
          id={item.expand.writer.id}
          onClick={debounce((e) => handleFollow(e), 500)}
          onMouseOver={() => setIsHoverFollowBtn(true)}
          onMouseOut={() => setIsHoverFollowBtn(false)}
        >
          {!isHoverUnfollowBtn ? "팔로잉" : "언팔로우"}
        </button>
      ) : (
        <button
          className="h-8 rounded-md border border-secondary px-3 text-sm font-bold text-secondary hover:bg-secondary hover:text-white focus:bg-secondary focus:text-white"
          id={item.expand.writer.id}
          onClick={debounce((e) => handleFollow(e), 500)}
        >
          팔로우
        </button>
      )}
    </div>
  );
}

FeedItemHeader.propTypes = {
  item: shape({
    expand: shape({
      writer: shape({
        id: string,
        avatar: string,
        nickname: string,
      }),
    }),
  }),
  isUser: bool,
};

export default FeedItemHeader;
