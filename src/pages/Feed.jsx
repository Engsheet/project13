import { useIntersect } from "@h";
import FeedItem from "@c/Feed/FeedItem/FeedItem";
import Spinner from "@c/Spinner";
import NoResult from "@c/Feed/NoResult";
import FilterRegion from "@/components/Feed/FilterRegion";
import SwiperCategory from "@/components/SwiperCategory";
import { useFilterRegion } from "@/hooks";
import { useFilterCategory, useInfiniteList } from "@/hooks";
import ScrollToTop from "@/components/ScrollTop";
import MetaData from "@c/MetaData";

function Feed() {
  const { data: fetchData, isLoading, hasNextPage, fetchNextPage } = useInfiniteList("reviews");

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

  // 데이터 필터링
  const filterRegion = useFilterRegion(fetchData);
  const filterCategory = useFilterCategory(filterRegion);

  const result = filterCategory?.flatMap((el) => el.items) || null;

  if (isLoading) return <Spinner />;

  const metaData = {
    title: "Best Place - 피드",
    description: "식당 리뷰를 시간순으로 보여주기",
    keywords: ["맛집", "리뷰", "커뮤니티"],
    image: "/logo.svg",
  };

  return (
    <>
      <MetaData props={metaData} />
      <ScrollToTop />
      <h2 className="sr-only">피드 페이지</h2>

      <ul>
        <FilterRegion />
      </ul>

      <ul className="py-3 text-sm">
        <SwiperCategory />
      </ul>

      <ul className="flex flex-col gap-1 bg-gray-50">
        {result.length ? (
          result.map((item) => (
            <li key={item.id}>
              <FeedItem item={item} />
            </li>
          ))
        ) : (
          <NoResult
            title="검색한 조건과 일치하는 장소의 리뷰가 없어요."
            contents="회원님이 처음으로 리뷰를 작성해보는건 어떠세요?"
          />
        )}
      </ul>

      {/* 인피니트 스크롤 시 필요한 요소 */}
      <div ref={ref} className="h-[1px]"></div>
    </>
  );
}

export default Feed;
