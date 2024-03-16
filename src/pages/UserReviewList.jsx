import ScrollTopButton from "@/components/Button/ScrollTopButton";
import FeedItem from "@/components/Feed/FeedItem/FeedItem";
import MetaData from "@c/MetaData";
import Spinner from "@/components/Spinner";
import UserReviewHeader from "@/components/UserReviewList/UserReviewHeader";
import { useInfiniteList, useIntersect } from "@/hooks";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

function UserReviewList() {
  const { userId } = useParams();
  const index = useLocation().state;
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteList("reviews", {
    filter: `writer.id='${userId}'`,
  });
  const result = data?.flatMap((el) => el.items);

  // 스크롤 이동
  useEffect(() => {
    const location = result && document.getElementById(index).offsetTop;
    window.scrollTo({ top: location - 100 });
  }, [index, result]);

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
    title: `Best Place - ${result[0].expand.writer.nickname}의 리뷰 리스트`,
    description: `${result[0].expand.writer.nickname}가 작성한 리뷰 리스트`,
    keywords: [`${result[0].expand.writer.nickname}`, `리뷰`, `맛집후기`],
    image: `${data[0].items[0].photos}`,
  };

  return (
    <div className="relative min-h-screen pb-28">
      <MetaData props={metaData} />
      <Header />
      {result && <UserReviewHeader item={result[0]} />}

      <main className="mx-auto max-w-3xl p-3">
        <h2 className="sr-only">유저 리뷰리스트 페이지</h2>
        <ul className="flex flex-col gap-1 bg-gray-50">
          {result?.map((item) => (
            <li key={item.id} id={item.id}>
              <FeedItem item={item} hiddenHeader={true} isPlace={true} />
            </li>
          ))}
        </ul>
        <div ref={ref} className="h-[1px]"></div>
      </main>
      <Footer />

      <div className="fixed bottom-4 right-4 z-10 flex flex-col gap-3 text-white">
        <ScrollTopButton />
      </div>
    </div>
  );
}

export default UserReviewList;
