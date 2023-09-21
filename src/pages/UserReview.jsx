import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { useFeedList, useIntersect } from "@/hooks";
import Spinner from "@/components/Spinner";
import { getPbImageURL } from "@/utils";
import Profile from "@/components/Profile";

function UserReview() {
  const { userId } = useParams();
  const { data, isLoading, hasNextPage, fetchNextPage } = useFeedList();
  const result = data?.flatMap((el) => el.items).filter((el) => el.writer === userId) || null;

  // 인피니트 스크롤
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (hasNextPage && !isLoading) {
        fetchNextPage();
      }
    },
    { threshold: 1 }
  );

  // 로딩 중
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner size={160} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-28">
      <Header />
      <div className="pb-4"></div>
      <Profile />
      <main className="mx-auto max-w-3xl p-3">
        <h2 className="sr-only">유저 리뷰 페이지</h2>
        <ul className="my-4 grid grid-cols-3 gap-1.5">
          {result?.map((item) => (
            <Link to={`/userReviewList/${userId}`} key={item.id}>
              <li>
                <figure className="relative">
                  <img
                    src={getPbImageURL(item, item.photos[0])}
                    alt={`${item.expand.writer.nickname}님의 ${item.expand.place.title} 리뷰`}
                    className="h-[280px] w-full rounded-lg object-cover"
                  />
                  <figcaption className="absolute bottom-0 flex w-full flex-col rounded-bl-lg rounded-tr-lg  bg-black bg-opacity-50 p-2 text-white">
                    <span
                      className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-light"
                      title={item.expand.place.address}
                    >
                      {item.expand.place.address}
                    </span>
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap" title={item.expand.place.title}>
                      {item.expand.place.title}
                    </span>
                  </figcaption>
                </figure>
              </li>
            </Link>
          ))}
        </ul>
      </main>
      <div ref={ref} className="h-[1px]"></div>
      <Footer isUser={true} />
    </div>
  );
}

export default UserReview;
