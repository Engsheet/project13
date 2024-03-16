import { pb } from "@/api/pocketbase";
import { useFetchList } from "@/hooks/useFetchList";
import { useFollowCountStore } from "@/store/follow";
import { getPbImageURL } from "@/utils";
import { BsPencilFill } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Profile() {
  const userInfo = pb.authStore.model;
  const followCount = useFollowCountStore((state) => state.followCount);
  const { data: reviewData } = useFetchList("reviews", { filter: `writer='${userInfo.id}'` });
  const { data: followData } = useFetchList("follow", { filter: `owner='${userInfo.id}'` });
  const myFollow = followData && followData[0];

  return (
    <div className="mx-auto flex max-w-3xl justify-start px-3 py-3 pt-5">
      <div className="mx-auto flex flex-col items-center sm:mx-[12%]">
        <dl className="relative flex items-center justify-center gap-x-6 gap-y-2">
          <div>
            <dt className="sr-only">내 프로필 사진</dt>
            <dd className="h-20 w-20 rounded-full bg-white p-0.5 shadow-[0_1px_6px_rgba(0,0,0,0.1)] hover:bg-secondary sm:h-24 sm:w-24">
              <Link to={"/update-user-data"}>
                {userInfo.avatar ? (
                  <img
                    src={getPbImageURL(userInfo, userInfo.avatar)}
                    alt="유저 프로필 사진"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <IoPersonCircleSharp className="h-full w-full text-gray-100" />
                )}
              </Link>
            </dd>
          </div>

          <div className="flex flex-col gap-1">
            <dt className="sr-only">내 닉네임</dt>
            <dd className="w-fit pb-2">
              <Link to={"/update-user-data"} className="group mx-4 flex items-center gap-1 text-2xl font-bold">
                <span>{userInfo.nickname}</span>
                <BsPencilFill
                  aria-label="프로필 수정"
                  title="프로필 수정"
                  className="mx-0.5 text-base text-primary group-hover:text-black group-focus:text-black"
                />
              </Link>
            </dd>
            <dt className="sr-only">나의 활동</dt>
            <dd>
              <div className="flex">
                <Link to={"/my-review"} className="group">
                  <div className="flex flex-col items-center border-r border-primary px-4 text-sm hover:font-bold group-focus:font-bold">
                    <span>리뷰</span>
                    <span className="font-semibold">{reviewData && reviewData?.length}</span>
                  </div>
                </Link>

                <Link to={"/follow"} className="group">
                  <div className="flex flex-col items-center border-r border-primary px-4 text-sm hover:font-bold group-focus:font-bold">
                    <span>팔로잉</span>
                    <span className="font-semibold">{followCount.following || myFollow?.followings.length}</span>
                  </div>
                </Link>

                <Link to={"/follow"} className="group">
                  <div className="flex flex-col items-center px-4 text-sm hover:font-bold group-focus:font-bold">
                    <span>팔로워</span>
                    <span className="font-semibold">{followCount.follower || myFollow?.followers.length}</span>
                  </div>
                </Link>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default Profile;
