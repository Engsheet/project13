import { Link } from "react-router-dom";
import { useInfiniteList, useIntersect } from "@/hooks";
import { getPbImageURL } from "@/utils";
import { pb } from "@/api/pocketbase";
import ScrollToTop from "@/components/ScrollTop";
import Spinner from "@/components/Spinner";
import NoResult from "@/components/Feed/NoResult";
import MetaData from "@c/MetaData";

function MyReview() {
  const myId = pb.authStore.model.id;
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteList("reviews", {
    filter: `writer.id='${myId}'`,
  });

  const result = data?.flatMap((el) => el.items);

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

  if (isLoading) return <Spinner />;
  const metaData = {
    title: "Best Place - 리뷰",
    description: "맛집 방문 후기",
    keywords: ["맛집", "리뷰", "기록"],
    image: "/logo.svg",
  };

  return result.length !== 0 ? (
    <>
      <MetaData props={metaData} />
      <ScrollToTop />
      <h2 className="sr-only">나의 리뷰 페이지</h2>
      <ul className="my-4 mb-[194px] grid grid-cols-2 gap-1.5 sm:mb-[174px] sm:grid-cols-3">
        {result?.map((item) => (
          <Link to={`/user-review-list/${myId}`} state={item.id} key={item.id}>
            <li>
              <figure className="relative">
                <img
                  src={getPbImageURL(item, item.photos[0])}
                  alt={`나의 ${item.expand.place.title} 리뷰`}
                  className="aspect-square min-h-[180px] w-full rounded-lg object-cover"
                />
                <figcaption className="absolute bottom-0 flex w-full flex-col rounded-b-lg bg-black bg-opacity-50 p-2 text-white">
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
      <div ref={ref} className="h-[1px]"></div>
    </>
  ) : (
    <NoResult title={"회원님이 작성한 리뷰가 없어요."} contents={"방문한 장소의 리뷰를 추가해보세요!"} />
  );
}

export default MyReview;
