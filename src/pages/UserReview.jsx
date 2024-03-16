import Footer from "@/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { useInfiniteList, useIntersect } from "@/hooks";
import Spinner from "@/components/Spinner";
import { getPbImageURL } from "@/utils";
import FeedItemHeader from "@/components/Feed/FeedItem/FeedItemHeader";
import Header from "@/layout/Header";
import ScrollTopButton from "@/components/Button/ScrollTopButton";
import NoResult from "@/components/Feed/NoResult";
import MetaData from "@c/MetaData";

function UserReview() {
  const { userId } = useParams();
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteList("reviews", {
    filter: `writer.id='${userId}'`,
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
    title: `Best Place - ${result[0].expand.writer.nickname}의 리뷰`,
    description: `${result[0].expand.writer.nickname}가 작성한 리뷰 타일`,
    keywords: [`${result[0].expand.writer.nickname}`, `리뷰`, `맛집후기`],
    image: `${data[0].items[0].photos}`,
  };
  
  return result.length !== 0 ? (
    <div className="relative min-h-screen pb-28">
      <MetaData props={metaData} />
      <Header />

      <header className="bg-gray-50 py-4 shadow-[0_6px_6px_-2px_rgba(0,0,0,0.1)]">
        <FeedItemHeader item={result[0]} isUser={true} />
      </header>

      <main className="mx-auto max-w-3xl p-3">
        <h2 className="sr-only">유저 리뷰 페이지</h2>
        <ul className="my-4 grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {result?.map((item) => (
            <Link to={`/user-review-list/${userId}`} state={item.id} key={item.id}>
              <li>
                <figure className="relative">
                  <img
                    src={getPbImageURL(item, item.photos[0])}
                    alt={`${item.expand.writer.nickname}님의 ${item.expand.place.title} 리뷰`}
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
      </main>

      <div ref={ref} className="h-[1px]"></div>
      <Footer isUser={true} />

      <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-3 text-white">
        <ScrollTopButton />
      </div>
    </div>
  ) : (
    <NoResult title={"이 회원님이 작성한 리뷰가 없어요."} contents={""} />
  );
}

export default UserReview;
